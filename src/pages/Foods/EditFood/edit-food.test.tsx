import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderView } from '@/tests/render-view'
import { useEditFoodModel } from './edit-food-model'
import { EditFoodView } from './edit-food-view'
import {
  IGetFoodByIdService,
  IUpdateFoodService,
} from '@/services/http/food/food-service'
import { Food, UnitTypes } from '@/types/food-types'
import { delay } from '@/tests/delay'

const fakeFood: Food = {
  id: 1,
  name: 'Banana',
  unit: UnitTypes.Grams,
  calories: 100,
  macronutrients: {
    carbohydrates: 50,
    proteins: 25,
    fats: 10,
    fibers: 5,
    sodium: 1,
  },
}

const mockGetFoodByIdService = vi.fn<IGetFoodByIdService>(async () => fakeFood)

const mockUpdateFoodService = vi.fn<IUpdateFoodService>(async () => fakeFood)

const renderSut = () =>
  renderView(
    <MakeSut />,
    '/editar-alimento/:foodId',
    `/editar-alimento/${fakeFood.id}`,
  )

function MakeSut() {
  const props = useEditFoodModel({
    getFoodByIdService: mockGetFoodByIdService,
    updateFoodService: mockUpdateFoodService,
  })

  return <EditFoodView {...props} />
}

describe('<EditFoodPage />', () => {
  beforeEach(() => {
    mockUpdateFoodService.mockClear()
  })

  it('should load the data of food to be edited correctly', async () => {
    const screen = renderSut()

    await delay(50)

    expect(screen.getByTestId('name-input')).toHaveValue(fakeFood.name)
    expect(screen.getByTestId('quantity-input')).toHaveValue(100)
    expect(screen.getByTestId('calories-input')).toHaveValue(
      fakeFood.calories,
    )
    expect(screen.getByTestId('carbohydrates-input')).toHaveValue(
      fakeFood.macronutrients.carbohydrates,
    )
    expect(screen.getByTestId('proteins-input')).toHaveValue(
      fakeFood.macronutrients.proteins,
    )
    expect(screen.getByTestId('fats-input')).toHaveValue(
      fakeFood.macronutrients.fats,
    )
    expect(screen.getByTestId('fibers-input')).toHaveValue(
      fakeFood.macronutrients.fibers,
    )
    expect(screen.getByTestId('sodium-input')).toHaveValue(
      fakeFood.macronutrients.sodium,
    )
    expect(screen.getByTestId('unit-select-input')).toHaveValue(
      fakeFood.unit,
    )
  })

  it('should call service with correct params when form is submitted with valid data', async () => {
    const screen = renderSut()

    await delay(50)

    const nameInput = screen.getByTestId('name-input')
    const quantityInput = screen.getByTestId('quantity-input')
    const caloriesInput = screen.getByTestId('calories-input')
    const carbohydratesInput = screen.getByTestId('carbohydrates-input')
    const proteinsInput = screen.getByTestId('proteins-input')
    const fatsInput = screen.getByTestId('fats-input')
    const fibersInput = screen.getByTestId('fibers-input')
    const sodiumInput = screen.getByTestId('sodium-input')
    const unitSelectInput = screen.getByTestId('unit-select-input')

    fireEvent.input(nameInput, { target: { value: 'Mamão' } })
    fireEvent.change(unitSelectInput, { target: { value: 'GRAMS' } })
    fireEvent.input(quantityInput, { target: { value: '200' } })
    fireEvent.input(caloriesInput, { target: { value: '200' } })
    fireEvent.input(carbohydratesInput, { target: { value: '100' } })
    fireEvent.input(proteinsInput, { target: { value: '20' } })
    fireEvent.input(fatsInput, { target: { value: '10' } })
    fireEvent.input(fibersInput, { target: { value: '15' } })
    fireEvent.input(sodiumInput, { target: { value: '1000' } })

    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    const formSubmit = screen.getByTestId('food-form')
    await waitFor(() => formSubmit)

    const errorMessages = screen.queryAllByTestId('error-message')
    expect(errorMessages).toHaveLength(0)

    expect(mockUpdateFoodService).toHaveBeenCalledWith({
      id: fakeFood.id,
      name: 'Mamão',
      unit: 'GRAMS',
      calories: 100,
      macronutrients: {
        carbohydrates: 50,
        proteins: 10,
        fats: 5,
        fibers: 7.5,
        sodium: 500,
      },
    })
  })

  it('should show an error message if form submission fails', async () => {
    const screen = renderSut()

    await delay(1)

    const nameInput = screen.getByTestId('name-input')
    fireEvent.input(nameInput, { target: { value: '' } })

    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    const formSubmit = screen.getByTestId('food-form')
    await waitFor(() => formSubmit)

    const errorMessages = screen.getAllByTestId('error-message')
    expect(errorMessages).toHaveLength(1)
  })

  it('should call the service only once per submission', async () => {
    const screen = renderSut()

    await delay(50)

    const nameInput = screen.getByTestId('name-input')
    fireEvent.input(nameInput, { target: { value: 'Mamão' } })

    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    const formSubmit = screen.getByTestId('food-form')
    await waitFor(() => formSubmit)

    expect(mockUpdateFoodService).toHaveBeenCalledTimes(1)
  })
})
