
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CustomerForm from '../CustomerForm'
import ProductForm from '../ProductForm'

// State
function mapStateToProps(state) {
  return {
    ...state.masterapp
  }
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

@connect(mapStateToProps, mapDispatchToProps)
class Demo extends Component {
  render() {
    return (
      <div>
        <CustomerForm title={'Customer Form'} />
        <br />
        <ProductForm title={'Product Form'} />
      </div>
    )
  }
}

export default Demo
