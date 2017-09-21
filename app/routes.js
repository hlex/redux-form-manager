import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, Demo } from './containers'
import StyleGuide from './containers/styleGuide/index'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Demo} />
    <Route path='/style-guide' component={StyleGuide} />
  </Route>
)

export default routes
