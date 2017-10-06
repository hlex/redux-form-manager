import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { bindFormValidation } from '../../../src/index'
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
  }
}

@bindFormValidation(options, afterFieldChange, mapStateToValidationPriority)
@connect(mapStateToProps, mapDispatchToProps)
export default class Demo extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  }
  render() {
    const { formData, renderInputField, firstError } = this.props
    return (
      <div className='demo'>
        <div className='_center'>
          <br />
          <h1>Redux Form Manager</h1>
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
            <div className='D-6'>{renderInputField(formData.fatherName)}</div>
            <div className='D-6'>{renderInputField(formData.motherName)}</div>
            <div className='D-6 _vcenter'>{renderInputField(formData.age)}</div>
            <div className='D-6 _vcenter'>
              {renderInputField(formData.gender)}
            </div>
          </div>
          <div className='row'>
            <div className='D-6'>{renderInputField(formData.food)}</div>
            <div className='D-6'>{renderInputField(formData.drink)}</div>
          </div>
          <div className='row'>
            <div className='D-6'>
              {renderInputField(formData.products[0].name)}
            </div>
            <div className='D-6'>
              {renderInputField(formData.products[0].code)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
