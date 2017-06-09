import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { bindFormValidation } from '../../../src/index'
import createForm from './createForm'
import InputField from 'react-input-forms'


// State
function mapStateToProps(state) {
  return {
  }
}

// Action
const actions = {
  // myActionName: Action.myActionName,
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

// ======================================================
// BindFormValidation Params
// ======================================================
const mapStateToValidationPriority = (state) => {
  return []
}

const afterFieldChange = (dispatch, state) => {
  return {
    firstname: (value, key, error) => {
      dispatch()
    },
    lastname: (value, key, error) => {
      dispatch()
    }
  }
}

const options = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  form: (state) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
    // return <InputField {...fieldData} onChange={() => console.log('!')} />
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
    // console.log('typeof string 5555', typeof '5555')
    // console.log('typeof interger 5', typeof 5)
    // console.log('typeof object {}', typeof {})
    // console.log('typeof array []', typeof [])
    // console.log('typeof float 4.2', typeof 4.2)
    // console.log('typeof float 4.223', typeof 4.223)
    // console.log('typeof array of object [{}]', typeof [{}])
    // const x = () => console.log('!')
    // console.log('typeof function x', typeof x)
    // console.log('=======================')
    // console.log('Demo', this.props)
    // console.log('constructor string 5555', '5555'.constructor)
    // // console.log('constructor interger 5', 5.constructor)
    // console.log('constructor object {}', {}.constructor)
    // console.log('constructor array []', [].constructor)
    // console.log('constructor float 4.2', 4.2.constructor)
    // console.log('constructor float 4.223', 4.223.constructor)
    // console.log('constructor array of object [{}]', [{}].constructor)
    // const y = () => console.log('!')
    // console.log('constructor function y', y.constructor)
    const { formData, renderInputField } = this.props
    return (
      <div className='_center'>
        <br />
        <h1>Hello, I am Demo</h1>
        <div className="row">
          <div className="D-6">
            {renderInputField(formData.firstname)}
          </div>
        </div>
      </div>
    )
  }
}
