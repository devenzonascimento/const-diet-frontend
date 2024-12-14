import {
  IDeleteFoodService,
  IGetFoodListService,
} from '@/services/http/food/food-service'
import { Food } from '@/types/food-types'
import { QueryKeys } from '@/types/query-keys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type UseMyFoodsModelProps = {
  getFoodListService: IGetFoodListService
  deleteFoodService: IDeleteFoodService
}

export function useMyFoodsModel({
  getFoodListService,
  deleteFoodService,
}: UseMyFoodsModelProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: foodsList } = useQuery({
    queryKey: [QueryKeys.FoodList],
    queryFn: getFoodListService,
  })

  const filteredFoods = foodsList?.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteFoodFn } = useMutation({
    mutationFn: deleteFoodService,
    onSuccess(_, foodId) {
      queryClient.setQueryData([QueryKeys.FoodList], (data: Food[]) =>
        data.filter(food => food.id !== foodId),
      )
    },
  })

  const handleDeleteFood = (foodId: number) => deleteFoodFn(foodId)

  const handleNavigateToEditPage = (foodId: number) =>
    navigate(`/detalhes-do-alimento/${foodId}`)

  return {
    foods: filteredFoods || [],
    searchTerm,
    setSearchTerm,

    handleNavigateToEditPage,
    handleDeleteFood,
  }
}
