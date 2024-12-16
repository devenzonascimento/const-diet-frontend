import React from 'react'
import { useMyFoodsModel } from './my-foods-model'
import { getPaginatedFoodListService } from '@/services/http/food/food-service'
import { MyFoodsView } from './my-foods-view'

export function MyFoodsPage() {
  const props = useMyFoodsModel({ getPaginatedFoodListService })

  return <MyFoodsView {...props} />
}
