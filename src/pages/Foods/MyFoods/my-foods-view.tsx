import React from 'react'
import { useMyFoodsModel } from './my-foods-model'
import { Link } from 'react-router-dom'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
import { MyFoodsListLoading } from './components/list-loading'
import { FlatList } from '@/components/flat-list'
import { FoodItem } from './components/food-item'
import { Spinner } from '@/components/spinner'
import { AppleIcon, CirclePlusIcon } from 'lucide-react'

type MyFoodsViewProps = ReturnType<typeof useMyFoodsModel>

export function MyFoodsView({
  foods,
  isFoodsLoading,
  hasNextPage,
  handlePagination,
  searchTerm,
  setSearchTerm,
  handleNavigateToEditPage,
}: MyFoodsViewProps) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <Header
        title="Meus alimentos"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/novo-alimento"
      />
      <main className="flex-1 flex flex-col gap-8 p-4 overflow-hidden">
        <SearchInput
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          onClear={() => setSearchTerm('')}
        />

        {/* LOADING DA LISTAGEM DE ALIMENTOS */}
        {isFoodsLoading && foods.length === 0 && <MyFoodsListLoading />}

        {/* LISTAGEM DE ALIMENTOS */}
        {!isFoodsLoading && foods.length > 0 && (
          <FlatList
            data={foods}
            renderItem={food => (
              <FoodItem
                key={food.id}
                food={food}
                onClick={() => handleNavigateToEditPage(food.id)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            onPaginate={handlePagination}
            hasMore={hasNextPage}
            loader={<Spinner className="mx-auto" />}
            className="w-full flex flex-col gap-4 overflow-y-auto"
          />
        )}

        {/* LISTAGEM DE ALIMENTOS VAZIA */}
        {!isFoodsLoading && foods.length === 0 && (
          <div className="flex-1 flex flex-col gap-4 items-center justify-center">
            <AppleIcon className="stroke-1 -mt-25 size-24 text-white fill-zinc-900" />

            <h1 className="text-center text-xl font-semibold text-zinc-400">
              Nenhum alimento encontrado
            </h1>

            <Link
              to="/novo-alimento"
              className="p-2 w-full flex items-center gap-2 justify-center bg-transparent-500 text-white text-lg font-semibold rounded-lg"
            >
              <CirclePlusIcon />
              <span>Adicionar alimento</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
