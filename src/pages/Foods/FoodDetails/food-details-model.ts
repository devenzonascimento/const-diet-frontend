import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IGetFoodByIdService,
  IDeleteFoodService,
} from '@/services/http/food/food-service'
import { QueryKeys } from '@/types/query-keys'
import { Food } from '@/types/food-types'

type UseFoodDetailsModelProps = {
  getFoodByIdService: IGetFoodByIdService
  deleteFoodService: IDeleteFoodService
}

export function useFoodDetailsModel({
  getFoodByIdService,
  deleteFoodService,
}: UseFoodDetailsModelProps) {
  const { foodId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: food, isPending: isFoodLoading } = useQuery({
    queryKey: [QueryKeys.Food, foodId],
    queryFn: () => getFoodByIdService(Number(foodId)),
  })

  const { mutateAsync: deleteFoodFn, isPending: isDeleteLoading } = useMutation(
    {
      mutationFn: deleteFoodService,
      onSuccess: () => {
        queryClient.removeQueries({
          exact: true,
          queryKey: [QueryKeys.Food, foodId],
        })

        queryClient.setQueryData([QueryKeys.FoodList], (foods: Food[]) => {
          return foods?.filter(food => food.id !== Number(foodId)) || []
        })

        navigate('/meus-alimentos')
      },
    },
  )

  const handleBackToFoodListPage = () => {
    navigate('/meus-alimentos')
  }

  const handleNavigateToEditPage = () => {
    navigate(`/editar-alimento/${foodId}`)
  }

  const handleDeleteFood = () => {
    deleteFoodFn(Number(foodId))
  }

  return {
    food,
    isFoodLoading,
    handleBackToFoodListPage,
    handleNavigateToEditPage,
    handleDeleteFood,
    isDeleteLoading,
  }
}
