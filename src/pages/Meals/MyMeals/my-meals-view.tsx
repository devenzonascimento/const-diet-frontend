import React from 'react'
import { useMyMealsModel } from './my-meals-model'
import { Link } from 'react-router-dom'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
import { FlatList } from '@/components/flat-list'
import { MealItem } from './_components/meal-item'
import { Spinner } from '@/components/spinner'
import { SoupIcon, CirclePlusIcon } from 'lucide-react'
import { MyMealsListLoading } from './_components/list-loading'
import { RouteTypes } from '@/types/routes-types'

export function MyMealsView({
  meals,
  isMealsLoading,
  hasNextPage,
  handlePagination,
  searchTerm,
  setSearchTerm,
  handleNavigateToDetailsPage,
}: ReturnType<typeof useMyMealsModel>) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header
        title="Minhas Refeições"
        leftButtonNavigateTo={RouteTypes.HomePage}
        rightButtonNavigateTo={RouteTypes.CreateMealPage}
      />
      <main className="flex-1 flex flex-col gap-8 p-4 overflow-hidden">
        <SearchInput
          placeholder="Buscar refeição..."
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          onClear={() => setSearchTerm('')}
        />

        {/* LOADING DA LISTAGEM DE REFEIÇÕES */}
        {isMealsLoading && meals.length === 0 && <MyMealsListLoading />}

        {/* LISTAGEM DE REFEIÇÕES */}
        {!isMealsLoading && meals.length > 0 && (
          <FlatList
            data={meals}
            renderItem={meal => (
              <MealItem
                meal={meal}
                onClick={() => handleNavigateToDetailsPage(meal.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            onPaginate={handlePagination}
            hasMore={hasNextPage}
            loader={<Spinner className="mx-auto" />}
            className="w-full flex flex-col gap-4 overflow-y-auto"
          />
        )}

        {/* LISTAGEM DE REFEIÇÕES VAZIA */}
        {!isMealsLoading && meals.length === 0 && (
          <div className="flex-1 flex flex-col gap-4 items-center justify-center">
            <SoupIcon className="stroke-1 -mt-25 size-24 text-white fill-zinc-900" />

            <h1 className="text-center text-xl font-semibold text-zinc-400">
              Nenhum refeição encontrado
            </h1>

            <Link
              to={RouteTypes.CreateMealPage}
              className="p-2 w-full flex items-center gap-2 justify-center bg-transparent-500 text-white text-lg font-semibold rounded-lg"
            >
              <CirclePlusIcon />
              <span>Adicionar refeição</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
