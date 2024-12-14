import React from 'react'
import {
  deleteFoodService,
  getFoodListService,
} from '@/services/http/food/food-service'
import { useMyFoodsModel } from './my-foods-model'
import { MyFoodsView } from './my-foods-view'

export function MyFoodsPage() {
  const props = useMyFoodsModel({ getFoodListService, deleteFoodService })
  return <MyFoodsView {...props} />
}
