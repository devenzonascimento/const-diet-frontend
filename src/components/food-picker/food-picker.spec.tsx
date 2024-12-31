import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent } from '@testing-library/react'
import { renderView } from '@/tests/render-view'
import { IGetPaginatedFoodListService } from '@/services/http/food/food-service'
import { Food, UnitTypes } from '@/types/food-types'
import { useFoodPickerModel } from './food-picker-model'
import { FoodPickerView } from './food-picker-view'

const generateFakeFood = (id: number, name: string): Food => ({
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
    items: [
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

const mockOnSelect = vi.fn()
const mockOnClose = vi.fn()

function MakeSut() {
  const props = useFoodPickerModel({
    getPaginatedFoodListService: mockGetPaginatedFoodListService,
    onSelect: mockOnSelect,
    onClose: mockOnClose,
  })

  return <FoodPickerView {...props} />
}

const renderSut = () => renderView(<MakeSut />, '/food-picker', '/food-picker')

describe('<FoodPicker />', () => {
  beforeEach(() => {
    mockGetPaginatedFoodListService.mockClear()
    mockOnSelect.mockClear()
    mockOnClose.mockClear()
  })

  it('should display the list of foods', async () => {
    const screen = renderSut()

    const foodItemElements = await screen.findAllByTestId('food-list-item')

    expect(foodItemElements).toHaveLength(5)
  })

  it('should call onSelect with correct params when a food item is clicked', async () => {
    const screen = renderSut()

    const foodItemElements = await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(foodItemElements[0])
    })

    const quantityInput = await screen.findByTestId('quantity-input')

    act(() => {
      fireEvent.input(quantityInput, { target: { value: 200 } })
    })

    const submitButton = await screen.findByTestId('submit-button')

    act(() => {
      fireEvent.click(submitButton)
    })

    expect(mockOnSelect).toHaveBeenCalledWith({
      ...generateFakeFood(1, 'A'),
      quantity: 200,
    })
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

  it('should call onClose when the close button is clicked', async () => {
    const screen = renderSut()

    const closeButton = await screen.findByTestId('close-button')

    act(() => {
      fireEvent.click(closeButton)
    })

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should validate the form and not accept null or zero values', async () => {
    const screen = renderSut()

    const foodItemElements = await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(foodItemElements[0])
    })

    const quantityInput = await screen.findByTestId('quantity-input')
    const submitButton = await screen.findByTestId('submit-button')

    act(() => {
      fireEvent.input(quantityInput, { target: { value: '' } })
    })

    expect(submitButton).toBeDisabled()

    act(() => {
      fireEvent.input(quantityInput, { target: { value: '0' } })
    })

    expect(submitButton).not.toBeDisabled()

    act(() => {
      fireEvent.click(submitButton)
    })

    const errorMessages = screen.getAllByTestId('error-message')
    expect(errorMessages).toHaveLength(1)
  })

  it('should render and unrender the form correctly when a food item is selected and deselected', async () => {
    const screen = renderSut()

    const foodItemElements = await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(foodItemElements[0])
    })

    expect(await screen.findByTestId('quantity-input')).toBeInTheDocument()
    expect(await screen.findByTestId('submit-button')).toBeInTheDocument()

    act(() => {
      fireEvent.click(foodItemElements[0])
    })

    expect(screen.queryByTestId('quantity-input')).not.toBeInTheDocument()
    expect(screen.queryByTestId('submit-button')).not.toBeInTheDocument()
  })
})
