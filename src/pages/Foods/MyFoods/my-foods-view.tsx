import React from 'react'

import { FoodItem } from './components/food-item'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
import { useMyFoodsModel } from './my-foods-model'

type MyFoodsViewProps = ReturnType<typeof useMyFoodsModel>

export function MyFoodsView({
  foods,
  searchTerm,
  setSearchTerm,
  handleNavigateToEditPage,
}: MyFoodsViewProps) {
  return (
    <div className='flex-1 flex flex-col bg-zinc-900'>
      <Header 
        title="Meus alimentos"
        leftButtonNavigateTo="/"
        rightButtonNavigateTo="/novo-alimento"
      />
      <main className="w-full flex flex-col justify-center items-center gap-8 px-4 py-4">
        <SearchInput
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          onClear={() => setSearchTerm("")}
        />

        <div className=" w-full flex flex-col gap-4 overflow-y-auto">
          {foods.map(food => (
            <FoodItem
              key={food.id}
              food={food}
              onClick={() => handleNavigateToEditPage(food.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
