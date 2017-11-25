import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import validateRules from './validation'

const isFunction = func => func && typeof func === 'function'
export const getErrorMessage = (value, rules) => validateRules(value, rules)
const getFirstError = (formData, priority) => {
  if (priority) {
    for (const key of priority) {
      const errorMessage = formData[key].hidden
        ? ''
        : getErrorMessage(formData[key].value, formData[key].rules)
      if (errorMessage) return errorMessage
    }
  }
  for (const key in formData) {
    const errorMessage = formData[key].hidden
      ? ''
      : getErrorMessage(formData[key].value, formData[key].rules)
    if (errorMessage) return errorMessage
  }
  return ''
}

const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  var keysA = Object.keys(objA)
  var keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = hasOwnProperty.bind(objB)
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }

  return true
}

const shallowCompare = (instance, nextProps, nextState) => {
  return (
    !shallowEqual(instance.state, nextState)
  )
}

const bindFormValidation = (
  options,
  afterFieldChange = {},
  mapStateToValidationPriority = []
) => WrappedComponent => {
  const { actionType = undefined, formData, getFormError = undefined } = options
  return class FormValidation extends PureComponent {
    static contextTypes = {
      store: PropTypes.shape({})
    }

    state = {
      id: Date.now(),
      formData: {},
      firstError: ''
    }

    shouldComponentUpdate = (nextProps, nextState) => {
      const { dispatch, getState } = this.context.store
      const currFormData = this.state.formData
      const nextFormData = nextState.formData
      const currFirstError = getFirstError(currFormData)
      const nextFirstError = getFirstError(nextFormData)
      if ((currFirstError !== nextFirstError) && isFunction(getFormError)) getFormError(getFirstError(nextFormData), dispatch, getState())
      return shallowCompare(this, nextProps, nextState)
    }

    componentWillMount = () => {
      const { getState, dispatch, subscribe } = this.context.store
      this.unsubscribe = subscribe(() => {
        this.setState({ formData: formData(getState(), this.props), firstError: getFirstError(this.state.formData, this.validatePriority()) })
      })
      this.setState({
        formData: formData(getState(), this.props)
      })
      getFormError(getFirstError(formData(getState(), this.props)), dispatch, getState())
    }

    componentWillUnmount = () => {
      this.unsubscribe()
    }

    onUpdateValue = (value, key) => {
      const { dispatch, getState } = this.context.store
      const fieldData = _.get(formData(getState(), this.props), key)
      if (!fieldData) {
        console.error(
          `Cannot get fieldData in formData at key '${
            key
          }'. Please recheck your formData`
        )
        return
      }
      const fieldActionType = fieldData.actionType || ''
      if (actionType || fieldActionType) {
        dispatch({
          type: fieldActionType || actionType,
          key,
          value
        })
        if (
          isFunction(afterFieldChange) &&
          isFunction(afterFieldChange(dispatch, getState())[key])
        ) {
          if (fieldData.afterUpdateWhenValid || false) {
            const { rules } = fieldData
            const errorMessage = getErrorMessage(value, rules)
            if (errorMessage === '') { afterFieldChange(dispatch, getState())[key](value, key) }
          } else {
            afterFieldChange(dispatch, getState())[key](value, key)
          }
        }
      } else {
        console.error(
          'actionType is empty. Please send it to using in dispatch'
        )
      }
    }

    renderInputField = (fieldData, renderUIInputField) => {
      const { value, rules } = fieldData
      const errorMessage = getErrorMessage(value, rules)
      fieldData.errorMessage = errorMessage
      if (isFunction(renderUIInputField)) {
        return renderUIInputField(fieldData, this.onUpdateValue)
      }
      if (isFunction(options.renderUIInputField)) {
        return options.renderUIInputField(fieldData, this.onUpdateValue)
      }
      console.error(
        'Cannot render input field please define function renderUIInputField to return React Component'
      )
      return 'Unable to render UIInputField'
    }

    validatePriority = () => {
      const { getState } = this.context.store
      if (isFunction(mapStateToValidationPriority)) {
        return mapStateToValidationPriority(getState())
      }
      return false
    }

    render() {
      const { formData } = this.state
      return (
        <WrappedComponent
          {...this.props}
          formData={formData}
          renderInputField={this.renderInputField}
          firstError={getFirstError(formData, this.validatePriority())}
        />
      )
    }
  }
}

export default bindFormValidation
