import React from 'react'
import PropTypes from 'prop-types'
import validateRules from './validation'

const isFunction = func => func && typeof func === 'function'
const getErrorMessage = (value, rules) => validateRules(value, rules)
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

const bindFormValidation = (
  options,
  afterFieldChange = {},
  mapStateToValidationPriority = []
) => WrappedComponent => {
  const { actionType = undefined, formData } = options
  let _isMounted = false
  return class FormValidation extends React.Component {
    static contextTypes = {
      store: PropTypes.shape({})
    }

    state = {
      id: Date.now(),
      formData: {}
    }

    componentWillMount = () => {
      console.log('componentWillMount', this.state.id)
      const { getState, subscribe } = this.context.store
      subscribe(() => {
        if (_isMounted) {
          console.log('subscribe', this.state.id)
          this.setState({ formData: formData(getState(), this.props) })
        }
      })
      this.setState({
        formData: formData(getState(), this.props)
      })
    }

    componentDidMount = () => {
      console.log('componentDidMount', this.state.id)
      _isMounted = true
    }

    componentWillUnmount = () => {
      console.log('componentWillUnmount', this.state.id)
      _isMounted = false
    }

    onUpdateValue = (value, key) => {
      const { dispatch, getState } = this.context.store
      const fieldData = formData(getState(), this.props)[key]
      if (!fieldData) {
        console.error(
          `Cannot get fieldData in formData at key ${key}. Please recheck your fieldData key`
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
          const { rules } = fieldData
          const errorMessage = getErrorMessage(value, rules)
          errorMessage &&
            errorMessage !== '' &&
            afterFieldChange(dispatch, getState())[key](value, key)
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
