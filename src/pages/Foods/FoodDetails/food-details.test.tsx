import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent } from '@testing-library/react'
import { renderView } from '@/tests/render-view'

import {
  IGetFoodByIdService,
  IUploadFoodImageService,
  IDeleteFoodService,
} from '@/services/http/food/food-service'
import { useFoodDetailsModel } from './food-details-model'
import { FoodDetailsView } from './food-details-view'
import { Food, UnitTypes } from '@/types/food-types'

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

const mockGetFoodByIdService = vi.fn<IGetFoodByIdService>(
  () => new Promise(response => response(fakeFood)),
)

const mockUploadFoodImageService = vi.fn<IUploadFoodImageService>(
  () => new Promise(response => response('#')),
)

const mockDeleteFoodService = vi.fn<IDeleteFoodService>()

function MakeSut() {
  const props = useFoodDetailsModel({
    getFoodByIdService: mockGetFoodByIdService,
    uploadFoodImageService: mockUploadFoodImageService,
    deleteFoodService: mockDeleteFoodService,
  })

  return <FoodDetailsView {...props} />
}

describe('<FoodDetailsPage />', () => {
  beforeEach(() => {
    mockGetFoodByIdService.mockClear()
    mockDeleteFoodService.mockClear()
  })

  it('should call "getFoodByIdService" with correct params', () => {
    const foodId = 1

    renderView(
      <MakeSut />,
      '/detalhes-do-alimento/:foodId',
      `/detalhes-do-alimento/${foodId}`,
    )

    expect(mockGetFoodByIdService).toHaveBeenCalledTimes(1)
    expect(mockGetFoodByIdService).toHaveBeenCalledWith(foodId)
  })

  it('should show food details correctly', async () => {
    const screen = renderView(
      <MakeSut />,
      '/detalhes-do-alimento/:foodId',
      '/detalhes-do-alimento/1',
    )

    expect(await screen.findByText(fakeFood.name)).toBeInTheDocument()
    expect(await screen.findByText(fakeFood.calories)).toBeInTheDocument()
    expect(
      await screen.findByText(`${fakeFood.macronutrients.carbohydrates}g`),
    ).toBeInTheDocument()
    expect(
      await screen.findByText(`${fakeFood.macronutrients.proteins}g`),
    ).toBeInTheDocument()
    expect(
      await screen.findByText(`${fakeFood.macronutrients.fats}g`),
    ).toBeInTheDocument()
    expect(
      await screen.findByText(`${fakeFood.macronutrients.fibers}g`),
    ).toBeInTheDocument()
    expect(
      await screen.findByText(`${fakeFood.macronutrients.sodium}g`),
    ).toBeInTheDocument()
  })

  it('should navigate to edit food page, when edit button is clicked', async () => {
    const screen = renderView(
      <MakeSut />,
      '/detalhes-do-alimento/:foodId',
      '/detalhes-do-alimento/1',
    )

    const optionsButton = await screen.findByTitle('Opções')
    expect(optionsButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(optionsButton)
    })

    const editButton = await screen.findByTitle('Editar alimento')
    expect(editButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(editButton)
    })

    await new Promise(response =>
      setTimeout(() => {
        response(null)
      }, 100),
    )

    const locationDisplay = await screen.findByTestId('location')
    expect(locationDisplay).toHaveTextContent('/editar-alimento/1')
  })

  it('should call "deleteFoodService" with correct params', async () => {
    const screen = renderView(
      <MakeSut />,
      '/detalhes-do-alimento/:foodId',
      '/detalhes-do-alimento/1',
    )

    const optionsButton = await screen.findByTitle('Opções')
    expect(optionsButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(optionsButton)
    })

    const deleteButton = await screen.findByTitle('Excluir alimento')
    expect(deleteButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(deleteButton)
    })

    await new Promise(response =>
      setTimeout(() => {
        response(null)
      }, 100),
    )

    expect(mockDeleteFoodService).toBeCalledTimes(1)
    expect(mockDeleteFoodService).toHaveBeenCalledWith(1)
  })
})
