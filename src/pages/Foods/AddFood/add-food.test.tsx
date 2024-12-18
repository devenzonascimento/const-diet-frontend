import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderView } from '@/tests/render-view'
import { useAddFoodModel } from './add-food-model'
import { AddFoodView } from './add-food-view'
import { ICreateFoodService } from '@/services/http/food/food-service'

const mockCreateFoodService = vi.fn<ICreateFoodService>(async food => food)

function MakeSut() {
  const props = useAddFoodModel({ createFoodService: mockCreateFoodService })

  return <AddFoodView {...props} />
}

describe('<AddFoodPage />', () => {
  beforeEach(() => {
    mockCreateFoodService.mockClear()
  })

  it('should call service with correct params when form is submitted with valid data', async () => {
    const screen = renderView(<MakeSut />)

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

    expect(mockCreateFoodService).toHaveBeenCalledWith({
      id: 0,
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
    const screen = renderView(<MakeSut />)

    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    const formSubmit = screen.getByTestId('food-form')
    await waitFor(() => formSubmit)

    const errorMessages = screen.getAllByTestId('error-message')
    expect(errorMessages).toHaveLength(1)
  })

  it('should call the service only once per submission', async () => {
    const screen = renderView(<MakeSut />)

    const nameInput = screen.getByTestId('name-input')
    fireEvent.input(nameInput, { target: { value: 'Mamão' } })

    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    const formSubmit = screen.getByTestId('food-form')
    await waitFor(() => formSubmit)

    expect(mockCreateFoodService).toHaveBeenCalledTimes(1)
  })
})
