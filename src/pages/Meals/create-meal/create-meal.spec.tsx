import React from 'react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { act, fireEvent, waitFor } from '@testing-library/react'
import { renderView } from '@/tests/render-view'
import { ICreateMealService } from '@/services/http/meal-service'
import { MealFood } from '@/types/meal-types'
import { useCreateMealModel } from './create-meal-model'
import { CreateMealView } from './create-meal-view'
import { UnitTypes } from '@/types/food-types'

const fakeFoods = [
  {
    id: 1,
    name: 'Banana',
    unit: UnitTypes.Grams,
    calories: 0,
    macronutrients: {
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      fibers: 0,
      sodium: 0,
    },
  },
  {
    id: 2,
    name: 'Apple',
    unit: UnitTypes.Grams,
    calories: 0,
    macronutrients: {
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      fibers: 0,
      sodium: 0,
    },
  },
  {
    id: 3,
    name: 'Orange',
    unit: UnitTypes.Grams,
    calories: 0,
    macronutrients: {
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      fibers: 0,
      sodium: 0,
    },
  },
]

vi.mock('@/services/http/food/food-service', () => ({
  getPaginatedFoodListService: vi.fn(async () => ({
    items: fakeFoods,
    totalCount: 3,
    totalPages: 1,
    currentPage: 1,
  })),
}))

const mockCreateMealService = vi.fn<ICreateMealService>()

function MakeSut() {
  const props = useCreateMealModel({
    createMealService: mockCreateMealService,
  })

  return <CreateMealView {...props} />
}

const renderSut = () => renderView(<MakeSut />, '/create-meal', '/create-meal')

describe('<CreateMealPage />', () => {
  beforeEach(() => {
    mockCreateMealService.mockClear()
  })

  it('should render the page correctly', async () => {
    const screen = renderSut()

    expect(screen.getByTestId('name-input')).toBeInTheDocument()
    expect(screen.getByTestId('description-input')).toBeInTheDocument()
    expect(screen.getByTestId('add-food-button')).toBeInTheDocument()
  })

  it('should show validation errors when required fields are empty', async () => {
    const screen = renderSut()

    const submitButton = screen.getByTestId('submit-button')

    act(() => {
      fireEvent.click(submitButton)
    })

    expect(await screen.findAllByTestId('error-message')).toHaveLength(2)
  })

  it('should open the food picker modal when add food button is clicked', async () => {
    const screen = renderSut()

    const addFoodButton = screen.getByTestId('add-food-button')

    act(() => {
      fireEvent.click(addFoodButton)
    })

    expect(await screen.findByTestId('food-picker')).toBeInTheDocument()
  })

  it('should add a food to the list correctly', async () => {
    const screen = renderSut()

    const addFoodButton = screen.getByTestId('add-food-button')

    act(() => {
      fireEvent.click(addFoodButton)
    })

    const [firstFoodItemElement] =
      await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(firstFoodItemElement)
    })

    const quantityInput = await screen.findByTestId('quantity-input')

    act(() => {
      fireEvent.input(quantityInput, { target: { value: 100 } })
    })

    const [_, submitButton] = await screen.findAllByTestId('submit-button')

    act(() => {
      fireEvent.click(submitButton)
    })

    expect(await screen.findByText(/100g de Banana/)).toBeInTheDocument()
  })

  it('should update a duplicated food in the list correctly', async () => {
    const screen = renderSut()

    const addFoodButton = screen.getByTestId('add-food-button')

    act(() => {
      fireEvent.click(addFoodButton)
    })

    const [firstFoodItemElement] =
      await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(firstFoodItemElement)
    })

    const quantityInput = await screen.findByTestId('quantity-input')

    act(() => {
      fireEvent.input(quantityInput, { target: { value: 100 } })
    })

    const [_, submitButton] = await screen.findAllByTestId('submit-button')

    act(() => {
      fireEvent.click(submitButton)
    })

    expect(await screen.findByText(/100g de Banana/)).toBeInTheDocument()

    act(() => {
      fireEvent.click(addFoodButton)
    })

    const [firstFoodItemElement2] =
      await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(firstFoodItemElement2)
    })

    const quantityInput2 = await screen.findByTestId('quantity-input')

    act(() => {
      fireEvent.input(quantityInput2, { target: { value: 200 } })
    })

    const [_2, submitButton2] = await screen.findAllByTestId('submit-button')

    act(() => {
      fireEvent.click(submitButton2)
    })

    expect(await screen.findAllByText('200g de Banana')).toHaveLength(1)
    expect(
      (await screen.findAllByText('200g de Banana'))?.[0],
    ).toBeInTheDocument()
  })

  it('should remove a food from the list correctly', async () => {
    const screen = renderSut()

    const addFoodButton = screen.getByTestId('add-food-button')

    act(() => {
      fireEvent.click(addFoodButton)
    })

    const [firstFoodItemElement] =
      await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(firstFoodItemElement)
    })

    const quantityInput = await screen.findByTestId('quantity-input')

    act(() => {
      fireEvent.input(quantityInput, { target: { value: 100 } })
    })

    const [_, submitButton] = await screen.findAllByTestId('submit-button')

    act(() => {
      fireEvent.click(submitButton)
    })

    expect(await screen.findByText(/100g de Banana/)).toBeInTheDocument()

    const removeFoodButton = await screen.findByTestId('remove-food-button')

    act(() => {
      fireEvent.click(removeFoodButton)
    })

    expect(screen.queryByText(/100g de Banana/)).not.toBeInTheDocument()
  })

  it('should call createMealService with correct params when form is submitted', async () => {
    const screen = renderSut()

    const nameInput = screen.getByTestId('name-input')
    const descriptionInput = screen.getByTestId('description-input')

    act(() => {
      fireEvent.input(nameInput, { target: { value: 'My Meal' } })
      fireEvent.input(descriptionInput, { target: { value: 'Delicious meal' } })
    })

    const addFoodButton = screen.getByTestId('add-food-button')

    act(() => {
      fireEvent.click(addFoodButton)
    })

    const [firstFoodItemElement] =
      await screen.findAllByTestId('food-list-item')

    act(() => {
      fireEvent.click(firstFoodItemElement)
    })

    const quantityInput = await screen.findByTestId('quantity-input')

    act(() => {
      fireEvent.input(quantityInput, { target: { value: 100 } })
    })

    const [submitButton, submitButtonFoodPicker] =
      await screen.findAllByTestId('submit-button')

    act(() => {
      fireEvent.click(submitButtonFoodPicker)
    })

    act(() => {
      fireEvent.click(submitButton)
    })

    const formSubmit = screen.getByTestId('meal-form')
    await waitFor(() => formSubmit)

    expect(mockCreateMealService).toHaveBeenCalledWith({
      id: 0,
      name: 'My Meal',
      description: 'Delicious meal',
      foods: [{ ...fakeFoods[0], quantity: 100 }],
    })
  })

  it('should close the food picker modal when close action is triggered', async () => {
    const screen = renderSut()

    const addFoodButton = screen.getByTestId('add-food-button')

    act(() => {
      fireEvent.click(addFoodButton)
    })

    const closeButton = screen.getByTestId('close-button')

    act(() => {
      fireEvent.click(closeButton)
    })

    expect(screen.queryByTestId('food-picker')).not.toBeInTheDocument()
  })
})
