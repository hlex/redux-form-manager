import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { bindFormValidation, getErrorMessage } from '../../../src/index'
import createForm from './createForm'
import InputField from 'react-input-forms'

// State
function mapStateToProps(state) {
  return {}
}

// Action
const actions = {
  // myActionName: Action.myActionName,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

// ====================================================== BindFormValidation
// Params ======================================================
const mapStateToValidationPriority = state => {
  return []
}

const afterFieldChange = (dispatch, state) => {
  return {
    firstname: (value, key) => {
      dispatch({
        type: 'FORM/CHANGE/PRODUCT',
        key: 'lastname',
        value: value
      })
    },
    gender: (value, key) => {
      dispatch({
        type: 'FORM/CHANGE/PRODUCT',
        key: 'drink',
        value:
          value === 'MALE'
            ? [{ label: 'Cola', value: true }]
            : [{ label: 'Water', value: true }]
      })
    }
  }
}

const options = {
  actionType: 'FORM/CHANGE/PRODUCT',
  formData: (state, props) => {
    return createForm(state)
  },
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  },
  getFormError: (formError, dispatch, state) => {
    dispatch({
      type: 'DEMO/PRODUCT_FORM/ERROR',
      formError
    })
  }
}

@bindFormValidation(options, afterFieldChange, mapStateToValidationPriority)
@connect(mapStateToProps, mapDispatchToProps)
export default class ProductForm extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  }

  static defaultProps = {
    title: 'Form Name'
  }

  render() {
    const { title, formData, renderInputField, firstError } = this.props
    return (
      <div className='demo'>
        <div className='_center'>
          <h3>{title}</h3>
        </div>
        <div
          className='container'
          style={{
            padding: '15px 100px'
          }}
        >
          {!_.isEmpty(firstError) && (
            <div
              className='_center'
              style={{
                color: 'red'
              }}
            >
              {`error: ${firstError}`}
            </div>
          )}
          <br />
          <br />
          <div className='row'>
            <div className='D-6 _vcenter'>{renderInputField(formData.name)}</div>
            <div className='D-6 _vcenter'>{renderInputField(formData.code)}</div>
            <div className='D-6 _vcenter'>{renderInputField(formData.price)}</div>
            <div className='D-6 _vcenter'>{renderInputField(formData.size)}</div>
          </div>
        </div>
      </div>
    )
  }
}
