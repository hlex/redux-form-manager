import { combineReducers } from 'redux'
import todo from './todo'
import customer from './customer'

export default combineReducers({
  todo,
  customer
})
