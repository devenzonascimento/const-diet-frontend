import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IGetPaginatedFoodListService } from '@/services/http/food/food-service'
import { QueryKeys } from '@/types/query-keys'

type UseMyFoodsModelProps = {
  getPaginatedFoodListService: IGetPaginatedFoodListService
}

export function useMyFoodsModel({
  getPaginatedFoodListService,
}: UseMyFoodsModelProps) {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')

  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [QueryKeys.FoodList],
      queryFn: async ({ pageParam }) => {
        const response = await getPaginatedFoodListService({
          page: pageParam,
          pageSize: 10,
        })

        return response
      },
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        if (lastPage.currentPage + 1 > lastPage.totalPages) {
          return undefined
        }

        return lastPage.currentPage + 1
      },
      staleTime: 15 * 60 * 1000,
    })

  const handlePagination = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }

  const foods = data?.pages.flatMap(page => page.items) || []

  const filteredFoods = foods?.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNavigateToDetailsPage = (foodId: number) =>
    navigate(`/detalhes-do-alimento/${foodId}`)

  return {
    foods: filteredFoods || [],
    isFoodsLoading: isPending,
    handlePagination,
    hasNextPage,
    searchTerm,
    setSearchTerm,
    handleNavigateToDetailsPage,
  }
}
