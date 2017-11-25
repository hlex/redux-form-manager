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
        type: 'FORM/CHANGE/CUSTOMER',
        key: 'lastname',
        value: value
      })
    },
    gender: (value, key) => {
      dispatch({
        type: 'FORM/CHANGE/CUSTOMER',
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
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => {
    return createForm(state)
  },
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  },
  getFormError: (formError, dispatch, state) => {
    dispatch({
      type: 'DEMO/CUSTOMER_FORM/ERROR',
      formError
    })
  }
}

@bindFormValidation(options, afterFieldChange, mapStateToValidationPriority)
@connect(mapStateToProps, mapDispatchToProps)
export default class Demo extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  }

  static defaultProps = {
    title: 'Form Name'
  }

  render() {
    const { title, formData, renderInputField, firstError } = this.props

    const errorMessage = getErrorMessage('', formData.firstname.rules)
    console.log('errorMessage', errorMessage)

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
            <div className='D-6'>{renderInputField(formData.firstname)}</div>
            <div className='D-6'>{renderInputField(formData.lastname)}</div>
            {
              formData.firstname.value !== '' &&
              <div>
                <div className='D-6'>{renderInputField(formData.fatherName)}</div>
                <div className='D-6'>{renderInputField(formData.motherName)}</div>
              </div>
            }
            <div className='D-6 _vcenter'>{renderInputField(formData.age)}</div>
            <div className='D-6 _vcenter'>
              {renderInputField(formData.gender)}
            </div>
          </div>
          <div className='row'>
            <div className='D-6'>{renderInputField(formData.food)}</div>
            <div className='D-6'>{renderInputField(formData.drink)}</div>
          </div>
        </div>
      </div>
    )
  }
}
