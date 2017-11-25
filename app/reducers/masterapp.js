const initialState = {
  customerFormError: '',
  productFormError: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DEMO/CUSTOMER_FORM/ERROR':
      return {
        ...state,
        customerFormError: action.formError
      }
    case 'DEMO/PRODUCT_FORM/ERROR':
      return {
        ...state,
        productFormError: action.formError
      }
    default:
      return state
  }
}
