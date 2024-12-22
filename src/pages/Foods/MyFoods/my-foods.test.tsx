import React from 'react'
import { IGetPaginatedFoodListService } from '@/services/http/food/food-service'
import { useMyFoodsModel } from './my-foods-model'
import { UnitTypes } from '@/types/food-types'
import { MyFoodsView } from './my-foods-view'
import { renderView } from '@/tests/render-view'
import { act, fireEvent } from '@testing-library/react'

const generateFakeFood = (id: number, name: string) => ({
  id: id,
  name: name,
  unit: UnitTypes.Grams,
  calories: 0,
  macronutrients: {
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    fibers: 0,
    sodium: 0,
  },
})

const mockGetPaginatedFoodListService = vi.fn<IGetPaginatedFoodListService>(
  async () => ({
    itens: [
      generateFakeFood(1, 'A'),
      generateFakeFood(2, 'B'),
      generateFakeFood(3, 'C'),
      generateFakeFood(4, 'D'),
      generateFakeFood(5, 'E'),
    ],
    totalCount: 5,
    totalPages: 1,
    currentPage: 1,
  }),
)

function MakeSut() {
  const props = useMyFoodsModel({
    getPaginatedFoodListService: mockGetPaginatedFoodListService,
  })

  return <MyFoodsView {...props} />
}

const renderSut = () =>
  renderView(<MakeSut />, '/meus-alimentos', '/meus-alimentos')

describe('<MyFoodsPage />', () => {
  it('should navigate to FoodDetailsPage when food item clicked', async () => {
    const screen = renderSut()

    const foodItemElements = await screen.findAllByTestId('food-list-item')

    expect(foodItemElements).toHaveLength(5)

    const [firstFoodItemElement] = foodItemElements

    expect(firstFoodItemElement).toBeInTheDocument()

    act(() => {
      fireEvent.click(firstFoodItemElement)
    })

    const locationDisplay = await screen.findByTestId('location')
    expect(locationDisplay).toHaveTextContent('/detalhes-do-alimento/1')
  })

  it('should filter foods correctly', async () => {
    const screen = renderSut()

    const searchInputElement = await screen.findByTestId('search-input')

    expect(await screen.findAllByTestId('food-list-item')).toHaveLength(5)

    act(() => {
      fireEvent.input(searchInputElement, { target: { value: 'E' } })
    })

    expect(await screen.findAllByTestId('food-list-item')).toHaveLength(1)

    act(() => {
      fireEvent.input(searchInputElement, { target: { value: 'X' } })
    })

    expect(screen.queryAllByTestId('food-list-item') || []).toHaveLength(0)
  })
})
