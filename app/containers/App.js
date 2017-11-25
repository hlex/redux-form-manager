
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

// State
function mapStateToProps(state) {
  let appError = ''
  if (state.masterapp.customerFormError !== '') {
    appError = state.masterapp.customerFormError
  } else if (state.masterapp.productFormError !== '') {
    appError = state.masterapp.productFormError
  }
  return {
    appError
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
class App extends Component {
  render() {
    const { appError } = this.props
    return (
      <div>
        <Helmet title='React Redux boilerplate' />
        <header className='main-header'>
          <nav>
            <ul className='navigation'>
              <li><Link to='/'>Redux Form Manager</Link></li>
              <li><Link to='/style-guide'>Style Guide</Link></li>
            </ul>
          </nav>
        </header>
        <div className='_center'>
          <br />
          <h1>Redux Form Manager</h1>
        </div>
        <div style={{ padding: '25px' }} className='_center'><h2 style={{ color: 'red' }}>App Error: {appError}</h2></div>
        {this.props.children}
      </div>
    )
  }
}

export default App
