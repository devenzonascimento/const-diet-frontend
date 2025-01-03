import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useImageUpload } from '@/hooks/use-image-upload'
import {
  IDeleteMealService,
  IGetMealByIdService,
  IUploadMealImageService,
} from '@/services/http/meal-service'
import { generateMealFoodPresentation } from '@/functions/generateMealFoodList'
import { Meal } from '@/types/meal-types'
import { QueryKeys } from '@/types/query-keys'
import { RouteTypes } from '@/types/routes-types'

type UseMealDetailsModelProps = {
  getMealByIdService: IGetMealByIdService
  uploadMealImageService: IUploadMealImageService
  deleteMealService: IDeleteMealService
}

export function useMealDetailsModel({
  getMealByIdService,
  uploadMealImageService,
  deleteMealService,
}: UseMealDetailsModelProps) {
  const { mealId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: meal, isPending: isMealLoading } = useQuery({
    queryKey: [QueryKeys.Meal, Number(mealId)],
    queryFn: () => getMealByIdService(Number(mealId)),
    staleTime: 15 * 60 * 1000,
  })

  const mealFoodList =
    meal?.foods.map(food => {
      return {
        id: food.id,
        presentation: generateMealFoodPresentation(food),
      }
    }) ?? []

  const { mutateAsync: deleteMealMutation, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteMealService,
      onSuccess: () => {
        queryClient.removeQueries({
          exact: true,
          queryKey: [QueryKeys.Meal, mealId],
        })

        // Atualiza o alimento na listagem de alimentos do cache que será exibido na pagina Meus Alimentos
        queryClient.setQueryData(
          [QueryKeys.MealList],
          (paginationData: ApiPaginationResponse<Meal>) => {
            return {
              ...paginationData,
              pages: paginationData.pages.map(page => ({
                ...page,
                items: page.items.filter(food => food.id !== Number(mealId)),
              })),
            }
          },
        )

        navigate(RouteTypes.MyMealsPage)
      },
    })

  const { imageUploadTrigger } = useImageUpload({
    onUpload: imageFile => {
      if (!meal) {
        return
      }

      uploadMealImageService({ mealId: meal.id, imageFile })
    },
    maxFileSizeMB: 2,
    onError: error => {
      console.error('Erro:', error)
    },
  })

  const handleBackToMealListPage = () => {
    navigate(RouteTypes.MyMealsPage)
  }

  const handleNavigateToUpdateMealPage = () => {
    navigate(`${RouteTypes.UpdateMealPage}/${mealId}`)
  }

  const handleDeleteMeal = () => {
    deleteMealMutation(Number(mealId))
  }

  return {
    meal,
    mealFoodList,
    isMealLoading,
    imageUploadTrigger,
    handleBackToMealListPage,
    handleNavigateToUpdateMealPage,
    handleDeleteMeal,
    isDeleteLoading,
  }
}
