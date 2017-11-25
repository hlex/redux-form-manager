import { combineReducers } from 'redux'
import customer from './customer'
import masterapp from './masterapp'
import product from './product'

export default combineReducers({
  masterapp,
  customer,
  product
})
