
import React, { Component } from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

class App extends Component {
  render() {
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
        {this.props.children}
      </div>
    )
  }
}

export default App
