import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {bindFormValidation} from '../../../src/index'
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
const mapStateToValidationPriority = (state) => {
  return ['food', 'drink', 'lastname', 'firstname', 'motherName', 'fatherName', 'age', 'gender']
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
        value: value === 'MALE'
          ? [{ label: 'Cola', value: true }]
          : [{ label: 'Water', value: true }]
      })
    }
  }
}

const options = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    console.log('fieldData', fieldData)
    return <InputField {...fieldData} onChange={updateValue} />
    // return (
    //   <div>
    //     <em>{fieldData.errorMessage || ''}</em>
    //     <input value={fieldData.value} onChange={(e) => updateValue(e.target.value, fieldData.key)} />
    //   </div>
    // )
  }
}

@bindFormValidation(options, mapStateToValidationPriority, afterFieldChange)
@connect(mapStateToProps, mapDispatchToProps)
export default class Demo extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };
  render() {
    console.log('Demo', this.props)
    // console.log('typeof string 5555', typeof '5555') console.log('typeof interger
    // 5', typeof 5) console.log('typeof object {}', typeof {}) console.log('typeof
    // array []', typeof []) console.log('typeof float 4.2', typeof 4.2)
    // console.log('typeof float 4.223', typeof 4.223) console.log('typeof array of
    // object [{}]', typeof [{}]) const x = () => console.log('!')
    // console.log('typeof function x', typeof x)
    // console.log('=======================') console.log('Demo', this.props)
    // console.log('constructor string 5555', '5555'.constructor) //
    // console.log('constructor interger 5', 5.constructor) console.log('constructor
    // object {}', {}.constructor) console.log('constructor array []',
    // [].constructor) console.log('constructor float 4.2', 4.2.constructor)
    // console.log('constructor float 4.223', 4.223.constructor)
    // console.log('constructor array of object [{}]', [{}].constructor) const y =
    // () => console.log('!') console.log('constructor function y', y.constructor)
    const { formData, renderInputField, firstError } = this.props
    return (
      <div className='demo'>
        <div className='_center'>
          <br/>
          <h1>Hello, I am Demo</h1>
        </div>
        <div className='container' style={{
          padding: '15px 100px'
        }}>
          {
            !_.isEmpty(firstError) &&
            <div className='_center' style={{
              color: 'red'
            }}>
              {`error: ${firstError}`}
            </div>
          }
          <br />
          <br />
          <div className='row'>
            <div className='D-6'>
              {renderInputField(formData.firstname)}
            </div>
            <div className='D-6'>
              {renderInputField(formData.lastname)}
            </div>
            <div className='D-6'>
              {renderInputField(formData.fatherName)}
            </div>
            <div className='D-6'>
              {renderInputField(formData.motherName)}
            </div>
            <div className='D-6 _vcenter'>
              {renderInputField(formData.age)}
            </div>
            <div className='D-6 _vcenter'>
              {renderInputField(formData.gender)}
            </div>
          </div>
          <div className='row'>
            <div className='D-6'>
              {renderInputField(formData.food)}
            </div>
            <div className='D-6'>
              {renderInputField(formData.drink)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
