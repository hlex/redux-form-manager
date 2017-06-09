import { Component } from 'react'
import PropTypes from 'prop-types'
import _h from './helpers/index.js'
import validateRules from './validation'

const bindFormValidation = (options, mapStateToValidationPriority, afterFieldChange) => (WrappedComponent) => {
  class FormValidation extends Component {
    static contextTypes = {
      store: PropTypes.shape({})
    }
    state = {
      formValidation: []
    }
    componentWillMount = () => {
      const { getState, dispatch, subscribe } = this.context.store
      subscribe(() => this.propToComponent(getState, dispatch))
      this.propToComponent(getState, dispatch)
    }
    propToComponent = (getState, dispatch) => {
      let validationPriority = []
      if (mapStateToValidationPriority && typeof mapStateToValidationPriority === 'function') {
        validationPriority = mapStateToValidationPriority(getState())
      } else {
        console.warn('You did not send any function. then validation priority should assign []')
      }
      let actions = {}
      if (afterFieldChange && typeof afterFieldChange === 'function') {
        actions = afterFieldChange(dispatch, getState())
      } else {
        console.warn('You did not send any function. then actions should assign {}')
      }
      let formData = {}
      if (options.form) {
        formData = options.form(getState())
      } else {
        console.error('You did not send any function. then formData should assign {}')
      }
      const propsToState = {
        validationPriority,
        ...actions,
        formData,
        dispatch
      }
      this.setState(propsToState)
    };
    getFormValidation = () => {
      return this.state.formValidation
    }
    popFirstError = (formValidation) => {
      return formValidation[0]
    }
    popFirstErrorWithPriority = (formValidation, validationPriority) => {
      let _found
      for (const key of validationPriority) {
        _found = formValidation.filter((validation) => validation.key === key)[0]
        if (_found) break
      }
      if (_found) return _found
      return {}
    }
    getFirstError = () => {
      const { formValidation, validationPriority } = this.state
      if (_h.isEmpty(formValidation)) return {}
      if (_h.isEmpty(validationPriority)) return this.popFirstError(formValidation)
      return this.popFirstErrorWithPriority(formValidation, validationPriority)
    }
    dispatchValue = (value, key, error, actionType) => {
      const { dispatch } = this.context.store
      if (_h.isEmpty(options.actionType)) {
        console.error('actionType is empty. Please send it to using in dispatch')
        return
      }
      let constant = actionType || options.actionType
      dispatch({
        type: constant,
        value,
        key,
        error,
        actionType
      })
    }
    dispatchAfterUpdate = (value, key, error) => {
      if (!_h.isEmpty(this.state.actions[key])) this.state.actions[key](value, key, error)
    }
    getField = (key) => {
      return this.state.formData[key]
    }
    getFieldActionType = (key) => {
      return this.getField(key).actionType
    }
    getFieldRules = (key) => {
      return this.getField(key).rules || {}
    }
    validateField = (value, key) => {
      const rules = this.getFieldRules(key)
      const validated = validateRules(value, rules)
      return validated
    }
    // setValidation = (key, error) => {
    //   const { formValidation } = this.state
    //   if (_h.isEmpty(error)) {
    //     console.warn('empty error write code to delete member in array')
    //   } else if (!_h.includes(formValidation, [`${key}`])) {
    //     console.warn('new error but have to check key includes in array or not ?')
    //     this.setState({
    //       formValidation: [
    //         ...this.state.formValidation,
    //         {
    //           key: key,
    //           message: error
    //         }
    //       ]
    //     })
    //   } else {
    //     console.warn(`formValidation already had key ${key} that has error`)
    //   }
    // }
    onUpdateValidation = (key, error) => {
      console.log('onUpdateValidation', key, error)
      this.setValidation(key, error)
    }
    onUpdateValue = (value = '', key = '') => {
      if (_h.isEmpty(key) || key === null) {
        console.error('key is empty. It might be undefined "" or null')
        return
      }
      const actionType = this.getFieldActionType(key)
      const error = this.validateField(value, key)
      console.log('onUpdateValue:value', value)
      console.log('onUpdateValue:key', key)
      console.log('onUpdateValue:error', error)
      console.log('onUpdateValue:actionType', actionType)
      // this.onUpdateValidation(key, error)
      this.dispatchValue(value, key, error, actionType)
      // this.dispatchAfterUpdate(value, key, error)
    }
    renderInputField = (fieldData, renderUIInputField) => {
      console.log('before render formData', this.state.formData)
      if (renderUIInputField && typeof renderUIInputField === 'function') {
        return this.props.renderUIInputField(fieldData, this.onUpdateValue)
      }
      if (options.renderUIInputField && typeof options.renderUIInputField === 'function') {
        return options.renderUIInputField(fieldData, this.onUpdateValue)
      }
      console.error('Cannot render input field please define function renderUIInputField to return React Component')
      return 'Unable to render UIInputField'
    }
    render = () => {
      const firstError = this.getFirstError()
      console.log('bindFormValidation', this.state, this.props)
      return (
        <WrappedComponent
          {...this.props}
          formData={this.state.formData}
          renderInputField={this.renderInputField}
          firstError={firstError}
          getFirstError={this.getFirstError}
        />
      )
    }
  }
  return FormValidation
}

export default bindFormValidation
