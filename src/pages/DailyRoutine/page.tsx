import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { dailyRoutineService } from '@/services/http/daily-routine/daily-routine-service'

import { sortTimes } from '@/functions/sort-times'

import { Header } from '@/components/header'
import { ProgressBar } from '@/components/progress-bar'
import { List } from '@/components/list'
import { DailyMealItem } from './components/daily-meal-item'

import { DailyMealComplete, DailyRoutineComplete } from '@/types/types'
import React from 'react'

export const DailyRoutinePage = () => {
  const [filter, setFilter] = useState<'active' | 'completed'>('active')

  const queryClient = useQueryClient()

  const { data: dailyRoutine } = useQuery({
    queryKey: ['dailyRoutine'],
    queryFn: dailyRoutineService.getDailyRoutine,
    refetchOnMount: false,
    refetchInterval: 60 * 1000,
  })

  const dailyRoutineMutation = useMutation({
    mutationKey: ['dailyRoutine'],
    mutationFn: dailyRoutineService.setMealStatus,
  })

  const handleToggleMealStatus = (meal: DailyMealComplete) => {
    const status = meal.status === 'PENDING' ? 'COMPLETED' : 'PENDING'

    const updateDailyRoutineCacheData = (item: DailyMealComplete) => {
      if (item.id === meal.id && item.time === meal.time) {
        return { ...meal, status }
      }

      return item
    }

    queryClient.setQueryData(
      ['dailyRoutine'],
      (dailyRoutine: DailyRoutineComplete) => {
        return {
          ...dailyRoutine,
          meals: dailyRoutine.meals.map(updateDailyRoutineCacheData),
        }
      },
    )

    if (!dailyRoutine) {
      return
    }

    dailyRoutineMutation.mutateAsync({
      dailyRoutineId: dailyRoutine.id,
      mealStatus: {
        mealId: meal.id,
        time: meal.time,
        status,
      },
    })
  }

  const dailyMealsList = dailyRoutine?.meals?.sort?.(sortTimes) || []

  const filteredList = dailyMealsList.filter(dailyMeal => {
    if (filter === 'active') {
      return dailyMeal.status === 'PENDING'
    }

    return dailyMeal.status === 'COMPLETED'
  })

  return (
    <>
      <Header title="Plano de hoje" leftButtonNavigateTo="/" />
      <main className="w-full flex flex-col justify-between items-center gap-4 px-4 pb-6">
        <ProgressBar
          length={dailyMealsList.length || 0}
          completed={dailyMealsList.reduce((acc, { status }) => {
            return status === 'COMPLETED' ? acc + 1 : acc
          }, 0)}
        />
        <div className="w-full flex items-center font-semibold">
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={`${filter === 'active' ? 'text-white bg-sky-800' : 'bg-white text-sky-800'} flex-1 p-2 border border-sky-800 rounded-l-xl`}
          >
            Ativas
          </button>
          <hr className="border border-white" />
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`${filter === 'completed' ? 'text-white bg-sky-800' : 'bg-white text-sky-800'} flex-1 p-2 border border-sky-800 rounded-r-xl`}
          >
            Concluídas
          </button>
        </div>
        <List
          data={filteredList}
          renderItem={({ item }) => {
            return (
              <DailyMealItem
                key={item.id + item.time}
                meal={item}
                onClick={() => handleToggleMealStatus(item)}
              />
            )
          }}
        />
      </main>
    </>
  )
}
