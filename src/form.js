import { Component, PropTypes } from 'react'
import validateRules from './validation'

const isFunction = (func) => func && typeof func === 'function'
const getErrorMessage = (value, rules) => validateRules(value, rules)
const getFirstError = (formData, priority) => {
  if (priority) {
    for (const key of priority) {
      const errorMessage = getErrorMessage(formData[key].value, formData[key].rules)
      if (errorMessage) return errorMessage
    }
  }
  for (const key in formData) {
    const errorMessage = getErrorMessage(formData[key].value, formData[key].rules)
    if (errorMessage) return errorMessage
  }
  return ''
}

const bindFormValidation = (options, afterFieldChange, mapStateToValidationPriority) => (WrappedComponent) => {
  const { actionType = undefined, formData } = options

  return class FormValidation extends Component {
    static contextTypes = {
      store: PropTypes.shape({})
    }

    state = {
      formData: {}
    }

    componentWillMount = () => {
      const { getState, subscribe } = this.context.store
      subscribe(() => this.setState({ formData: formData(getState()) }))
      this.setState({ formData: formData(getState()) })
    }

    onUpdateValue = (value, key) => {
      const { dispatch, getState } = this.context.store
      if (!formData(getState())[key]) {
        console.error('Field key is not defined. Please create in reducer')
        return
      }
      const fieldActionType = formData(getState())[key].actionType || ''
      if (actionType || fieldActionType) {
        dispatch({
          type: fieldActionType || actionType,
          key,
          value
        })
        if (isFunction(afterFieldChange) && isFunction(afterFieldChange(dispatch, getState())[key])) {
          afterFieldChange(dispatch, getState())[key](value, key)
        }
      } else {
        console.error('actionType is empty. Please send it to using in dispatch')
      }
    }

    renderInputField = (fieldData, renderUIInputField) => {
      const { value, rules } = fieldData
      const errorMessage = getErrorMessage(value, rules)
      fieldData.errorMessage = errorMessage
      if (isFunction(renderUIInputField)) return renderUIInputField(fieldData, this.onUpdateValue)
      if (isFunction(options.renderUIInputField)) return options.renderUIInputField(fieldData, this.onUpdateValue)
      console.error('Cannot render input field please define function renderUIInputField to return React Component')
      return 'Unable to render UIInputField'
    }

    validatePriority = () => {
      const { getState } = this.context.store
      if (isFunction(mapStateToValidationPriority)) return mapStateToValidationPriority(getState())
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
