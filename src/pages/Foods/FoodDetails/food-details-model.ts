import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useImageUpload } from '@/hooks/use-image-upload'
import {
  IGetFoodByIdService,
  IUploadFoodImageService,
  IDeleteFoodService,
} from '@/services/http/food/food-service'
import { QueryKeys } from '@/types/query-keys'
import { Food } from '@/types/food-types'

type PaginationData<T> = {
  pageParams: number[]
  pages: {
    itens: T[]
    currentPage: number
    totalCount: number
    totalPages: number
  }[]
}

type UseFoodDetailsModelProps = {
  getFoodByIdService: IGetFoodByIdService
  uploadFoodImageService: IUploadFoodImageService
  deleteFoodService: IDeleteFoodService
}

export function useFoodDetailsModel({
  getFoodByIdService,
  uploadFoodImageService,
  deleteFoodService,
}: UseFoodDetailsModelProps) {
  const { foodId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: food, isPending: isFoodLoading } = useQuery({
    queryKey: [QueryKeys.Food, Number(foodId)],
    queryFn: () => getFoodByIdService(Number(foodId)),
    staleTime: 15 * 60 * 1000,
  })

  const { mutateAsync: uploadFoodImageMutation } = useMutation({
    mutationFn: uploadFoodImageService,
    onSuccess: (imageUrl, variables) => {
      if (!imageUrl) {
        return
      }

      queryClient.setQueryData(
        [QueryKeys.Food, variables.foodId],
        (oldFood: Food) => {
          return {
            ...oldFood,
            imageUrl,
          }
        },
      )

      // Atualiza o alimento na listagem de alimentos do cache que será exibido na pagina Meus Alimentos
      queryClient.setQueryData(
        [QueryKeys.FoodList],
        (paginationData: PaginationData<Food>) => {
          return {
            ...paginationData,
            pages: paginationData.pages.map(page => ({
              ...page,
              itens: page.itens.map(food =>
                food.id === variables.foodId ? { ...food, imageUrl } : food,
              ),
            })),
          }
        },
      )
    },
  })

  const { imageUploadTrigger } = useImageUpload({
    onUpload: imageFile => {
      if (!food) {
        return
      }

      uploadFoodImageMutation({ foodId: food.id, imageFile })
    },
    maxFileSizeMB: 2,
    onError: error => {
      console.error('Erro:', error)
    },
  })

  const { mutateAsync: deleteFoodMutation, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteFoodService,
      onSuccess: () => {
        queryClient.removeQueries({
          exact: true,
          queryKey: [QueryKeys.Food, foodId],
        })

        // Atualiza o alimento na listagem de alimentos do cache que será exibido na pagina Meus Alimentos
        queryClient.setQueryData(
          [QueryKeys.FoodList],
          (paginationData: PaginationData<Food>) => {
            return {
              ...paginationData,
              pages: paginationData.pages.map(page => ({
                ...page,
                itens: page.itens.filter(food => food.id !== Number(foodId)),
              })),
            }
          },
        )

        navigate('/meus-alimentos')
      },
    })

  const handleBackToFoodListPage = () => {
    navigate('/meus-alimentos')
  }

  const handleNavigateToEditPage = () => {
    navigate(`/editar-alimento/${foodId}`)
  }

  const handleDeleteFood = () => {
    deleteFoodMutation(Number(foodId))
  }

  return {
    food,
    isFoodLoading,
    imageUploadTrigger,
    handleBackToFoodListPage,
    handleNavigateToEditPage,
    handleDeleteFood,
    isDeleteLoading,
  }
}
