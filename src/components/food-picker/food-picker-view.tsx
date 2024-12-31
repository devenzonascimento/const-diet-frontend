import React from 'react'
import { useFoodPickerModel } from './food-picker-model'
import { AppleIcon, CirclePlusIcon, XIcon } from 'lucide-react'
import { SearchInput } from '@/components/search-input'
import { MyFoodsListLoading } from '@/pages/Foods/MyFoods/components/list-loading'
import { FlatList } from '@/components/flat-list'
import { Link } from 'react-router-dom'
import { FoodItem } from '@/pages/Foods/MyFoods/components/food-item'
import { Spinner } from '@/components/spinner'
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'
import { MealFood } from '@/types/meal-types'

export type FoodPickerProps = {
  onSelect: (food: MealFood) => void
  onClose: () => void
}

export function FoodPickerView({
  foods,
  isFoodsLoading,
  hasNextPage,
  handlePagination,
  searchTerm,
  setSearchTerm,
  selectedFood,
  handleSelectFood,
  quantity,
  quantityFieldError,
  setQuantity,
  isSubmitButtonDisabled,
  handleSubmit,
  isFoodSelected,
  onClose,
}: ReturnType<typeof useFoodPickerModel>) {
  return (
    <>
      <div
        className="size-full fixed inset-0 bg-black/90"
        onClick={onClose}
        onKeyDown={onClose}
      />

      <div className="fixed bottom-0 w-full h-9/10 flex flex-col items-center gap-4 p-4 bg-zinc-900 rounded-t-4xl">
        <header className="w-full flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-100">
            Selecionar alimento
          </h1>

          <button type="button" onClick={onClose} data-testid="close-button">
            <XIcon className="size-6 text-white shrink-0" />
          </button>
        </header>

        <div className="h-full w-full flex flex-col gap-4 overflow-hidden">
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
                  isActive={isFoodSelected(food.id)}
                  onClick={() => handleSelectFood(food)}
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
              <AppleIcon className="stroke-1 size-24 text-white fill-zinc-900" />

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
        </div>

        {selectedFood && (
          <form
            className="mt-auto w-full flex flex-col gap-3 border-t border-zinc-300 pt-1"
            onSubmit={e => {
              e.preventDefault()

              handleSubmit()
            }}
          >
            <Input
              autoFocus
              id="quantity-input"
              type="number"
              label="Quantidade"
              required
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              errorMessage={quantityFieldError}
              data-testid="quantity-input"
            />

            <Button
              type="submit"
              disabled={isSubmitButtonDisabled}
              className="w-full text-white bg-violet-600 hover:bg-violet-500"
              data-testid="submit-button"
            >
              Adicionar alimento
            </Button>
          </form>
        )}
      </div>
    </>
  )
}
