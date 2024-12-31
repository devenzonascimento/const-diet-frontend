import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPaginatedFoodList } from '@/hooks/use-get-paginated-food-list'
import { IGetPaginatedFoodListService } from '@/services/http/food/food-service'

type UseMyFoodsModelProps = {
  getPaginatedFoodListService: IGetPaginatedFoodListService
}

export function useMyFoodsModel({
  getPaginatedFoodListService,
}: UseMyFoodsModelProps) {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')

  const { foods, isFoodsLoading, handlePagination, hasNextPage } =
    useGetPaginatedFoodList({ getPaginatedFoodListService })

  const filteredFoods = foods?.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNavigateToDetailsPage = (foodId: number) =>
    navigate(`/detalhes-do-alimento/${foodId}`)

  return {
    foods: filteredFoods || [],
    isFoodsLoading,
    handlePagination,
    hasNextPage,
    searchTerm,
    setSearchTerm,
    handleNavigateToDetailsPage,
  }
}
