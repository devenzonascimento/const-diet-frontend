import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { IGetPaginatedMealListService } from '@/services/http/meal-service'
import { QueryKeys } from '@/types/query-keys'
import { RouteTypes } from '@/types/routes-types'

type UseMyMealsModelProps = {
  getPaginatedMealListService: IGetPaginatedMealListService
}

export function useMyMealsModel({
  getPaginatedMealListService,
}: UseMyMealsModelProps) {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')

  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [QueryKeys.MealList],
      queryFn: async ({ pageParam }) => {
        const response = await getPaginatedMealListService({
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

  const meals = data?.pages.flatMap(page => page.items) || []

  const filteredMeals = meals?.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleNavigateToDetailsPage = (mealId: number) =>
    navigate(`${RouteTypes.MealDetailsPage}/${mealId}`)

  return {
    meals: filteredMeals || [],
    isMealsLoading: isPending,
    handlePagination,
    hasNextPage,
    searchTerm,
    setSearchTerm,
    handleNavigateToDetailsPage,
  }
}
