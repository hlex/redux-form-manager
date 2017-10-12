# Redux Form Manager
A Form control built with and for React with Redux. Initially built for use in Redux Project
> Validatation in form is easy to go...

### If you liked, gimme a star, Thanks.

## Special Thanks to 'GA-MO'
[![alt text][logo]](https://github.com/GA-MO)

[logo]: https://avatars2.githubusercontent.com/u/18608702?v=4&s=400 "GA-MO"


### This Component Repository created by [*React Component Boilerplate*](<https://github.com/GA-MO/react-component-npm-package-boilerplate/>)
React Component boilerplate for creating new React Compoment and everything you need to get started.

I recommend you to use it if you wanna create some awesome component for this world !

## Prerequisite
This project uses library React-Redux-Gamo-boilerplate, React, Redux, React-Redux and ES2015 syntax, so make sure that you are capable with it.
- React-Redux-Gamo-boilerplate https://github.com/GA-MO/react-redux-gamo-boilerplate
- ES2015 https://babeljs.io/learn-es2015/
- React https://facebook.github.io/react/
- Redux http://redux.js.org/
- React-Redux https://github.com/reactjs/react-redux
## Fast date with Demo & Examples
Live demo: <https://hlex.github.io/redux-form-manager/demo>

The live demo is still running redux-form-manager v2.5.0

### Welcome to clone or fork and give me some pull request.

you can run this repository in your local machine by this command
```
$ npm run dev
```
it will serve at `localhost:9000`

## Getting Started
```
$ npm install redux-form-manager --save
```
or if you prefer yarn..
```
$ yarn add redux-form-manager
```

## Basic Usage: Just copy paste
Create new js file and then copy following codes
```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
    firstname: {
      name: 'firstname,
      type: 'input',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your firstname.'
      },
    },
    lastname: {
      name: 'lastname,
      type: 'input',
      label: 'Lastname',
      value: '',
      placeholder: 'write down your lastname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your lastname.'
      },
    }
  }
}

const core = {
  defaultActionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core)
export default class Form extends Component {
  render() {
    const { formData, renderInputField, firstError } = this.props
    return (
      <div>
        <h1>Form</h1>
        {
          renderInputField(formData.firstname)
        }
        {
          renderInputField(formData.lastname)
        }
        <h4>error: {firstError}</h4>
      </div>
    )
  }
}
```
Boom! you got a form with field that could be validated, your page also.
Look at your console that

## Advanced Usage: Reveal Key Features
There are many features we have provided
- [Building your own custom UI.](#feature-custom-ui)
- [Validating each field by priority.](#feature-validation-priority)
- [Doing after update function when any field dispatch.](#feature-after-update)
- [Customizing action type of each field.](#feature-customize-action)
- [Creating custom validation rules.](#feature-custom-validation)
- [Using Nested field data such as array of object.](#feature-nested-field)
- [Handling dynamic field properties.](#feature-dynamic-field-props)
- [Dispatch firstError to outside container.](#feature-dispatch-firsterror)
- [Using other event to dispatch.](#feature-other-dispatch)

# Documentation
## Table of Contents
- ### Get Started
  - [Concept](#concept)
  - [Setup](#setup)
  - [Core](#core)
  - [Working Example](#working-example)
- ### Form Data & Field Data Properties
  - [Form Data](#form-data)
  - [Field Data](#field-data)
- ### Features
  - [Building your own custom UI.](#feature-custom-ui)
  - [Validating each field by priority.](#feature-validation-priority)
  - [Doing after update function when any field dispatch.](#feature-after-update)
  - [Customizing action type of each field.](#feature-customize-action)
  - [Creating custom validation rules.](#feature-custom-validation)
  - [Using Nested field data such as array of object.](#feature-nested-field)
  - [Handling dynamic field properties.](#feature-dynamic-field-props)
  - [Dispatch firstError to outside container.](#feature-dispatch-firsterror)
  - [Using other event to dispatch.](#feature-other-dispatch)



## <a id="concept"></a>Concept
Coming soon.

## <a id="setup"></a>Setup
install npm packages
```
$ npm install redux-form-manager --save
```
or if you prefer yarn..
```
$ yarn add redux-form-manager --save
```

import library at the start of your js file
```js
import InputField, { bindFormValidation } from 'redux-form-manager'
```
### InputField
InputField is a component that can morph to other inputs by defining props 'type' such as text, select, checkbox, radio etc.

### bindFormValidation()
bindFormValidation is a higher order function that return function which grant component to have form manager modules which are 'formData', 'renderInputField()', 'firstError'


## <a id="core"></a>Core
core is an object to assign variables to bindFormValidation()
### all of these keys are required. (Please copy them)

```js
const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}
@bindFormValidation(core)
```
### actionType (defaultActionType in action)
As you know, redux's store has dispatch function which it is a process that fire action to reducer contains actionType and any variables.
defaultActionType is a default actionType of store.dispatch when you didn't send fieldData's actionType (we'll talk about this later).


## <a id="working-example"></a>Working Example
Create new js file and then copy following codes
```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
    firstname: {
      type: 'input',
      name: 'firstname',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: [
        required: 'Please fill in your firstname.'
      ],
    },
    lastname: {
      type: 'input',
      name: 'lastname',
      label: 'Lastname',
      value: '',
      placeholder: 'write down your lastname',
      disabled: false,
      hidden: false,
      rules: [
        required: 'Please fill in your lastname.'
      ],
    }
  }
}

const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core)
export default class Form extends Component {
  render() {
    const { formData, renderInputField, firstError } = this.props
    return (
      <div>
        <h1>Form</h1>
        {
          renderInputField(formData.firstname)
        }
        {
          renderInputField(formData.lastname)
        }
        <h4>error: {firstError}</h4>
      </div>
    )
  }
}
```

## <a id="form-data"></a>Form Data
### The common variable of this package is 'formData'
formData is a metadata of the form which it's type is Object. you can describe properties of your form in this variable. In any formData, it contains many fieldDatas.

### Example
```
const formData = {
  firstname: {
    name: 'firstname',
    type: 'input',
    label: 'Firstname',
    value: '',
    placeholder: 'write down your firstname',
    disabled: false,
    hidden: false,
    rules: [
      required: 'Please fill in your firstname.'
    ],
  },
}
```

## <a id="field-data"></a>Field Data
### Another variable of this package, 'fieldData'
fieldData is an Object that define properties of the field. For example, firstname field would have properties like this
### Field Data Schema
| Property        |     Type
| ------------- |:-------------:
| name | String
| type      | String
| label    | String
| value | String, Object
| placeholder | String
| disabled |    Boolean
| hidden | Boolean
| rules | Object

we can define fieldData as follow.
```js
const firstname = {
  name: 'firstname',
  type: 'input',
  label: 'Firstname',
  value: '',
  placeholder: 'write down your firstname',
  disabled: false,
  hidden: false,
  rules: {
    required: 'Please fill in your firstname.'
  },
},
```

## <a id="feature-custom-ui"></a>Custom UI
### Just copy paste again, Let's see in action.
Building your own custom UI, we are going to use 2nd parameter of renderInputField.

```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
    firstname: {
      name: 'firstname',
      type: 'input',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your firstname.'
      },
    },
    lastname: {
      name: 'lastname',
      type: 'input',
      label: 'Lastname',
      value: '',
      placeholder: 'write down your lastname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your lastname.'
      },
    }
  }
}

const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core)
export default class Form extends Component {

  renderMyInputComponent = (fieldData, updateValue) => {
    return (
      <MyInputComponent
        {...fieldData}
        onUpdateValue={(value) => updateValue(fieldData.key, value)}
      />
    )
  }

  render() {
    const { formData, renderInputField, firstError } = this.props
    return (
      <div>
        <h1>Form</h1>
        { renderInputField(formData.firstname, this.renderMyInputComponent) }
        { renderInputField(formData.lastname) }
        <h4>error: {firstError}</h4>
      </div>
    )
  }
}

class MyInputComponent extends Component {

  handleChange = (e) => {
    const { onUpdateValue } = this.props
    onUpdateValue(e.target.value)
  }

  render() {
    return (
      const {
        label,
        value,
        disable,
        placeholder,
        hidden,
        errorMessage,
      } = this.props
      <div className={`box-form-input ${hidden && 'hidden'}`}>
        <label>{label}</label>
        <input
          type='text',
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
        <div className='error-message'>{errorMessage}</div>
      </div>
    )
  }
}
```

## <a id="feature-validation-priority"></a>mapStateToValidationPriority
Validating each field by priority.

```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
    firstname: {
      name: 'firstname',
      type: 'input',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your firstname.'
      },
    },
    lastname: {
      name: 'lastname',
      type: 'input',
      label: 'Lastname',
      value: '',
      placeholder: 'write down your lastname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your lastname.'
      },
    }
  }
}

const mapStateToValidationPriority = state => {
  return ['lastname', 'firstname']
}

const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core, null, mapStateToValidationPriority)
```

## <a id="feature-after-update"></a>afterFieldChange
Doing after update function when any field dispatch.

```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
    firstname: {
      name: 'firstname',
      type: 'input',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your firstname.'
      },
    },
    lastname: {
      name: 'lastname',
      type: 'input',
      label: 'Lastname',
      value: '',
      placeholder: 'write down your lastname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your lastname.'
      },
    }
  }
}

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
  }
}

const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core, afterFieldChange, mapStateToValidationPriority)
```

## <a id="feature-customize-action"></a>actionType
Customizing action type of each field.

```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
    firstname: {
      actionType: 'MY_ACTION_FIRSTNAME',
      name: 'firstname',
      type: 'input',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your firstname.'
      },
    },
    lastname: {
      actionType: 'MY_ACTION_LASTNAME',
      name: 'lastname',
      type: 'input',
      label: 'Lastname',
      value: '',
      placeholder: 'write down your lastname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your lastname.'
      },
    }
  }
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
  }
}

const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core, afterFieldChange)
```

## <a id="feature-custom-validation"></a>Custom Validation Rules
Creating custom validation rules.

```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
    firstname: {
      name: 'firstname',
      type: 'input',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your firstname.'
        customValidate: [
          {
            message: 'ชื่อต้องขึ้นต้นด้วยตัวเลข',
            valid: value => {
              return /^\d/.test(value)
            }
          }
        ]
      },
    },
    lastname: {
      name: 'lastname',
      type: 'input',
      label: 'Lastname',
      value: '',
      placeholder: 'write down your lastname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your lastname.'
      },
    }
  }
}

const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core)
```

## <a id="feature-nested-field"></a>Nested Field Data
Using Nested field data such as array of object.

## <a id="feature-dynamic-field-props"></a>Dynamic Field Data properties
Handling dynamic field properties.

## <a id="feature-dispatch-firsterror"></a>Dispatch firsterror
Dispatch firstError to outside container.

## <a id="feature-other-dispatch"></a>Other Dispatchs
Using other event to dispatch.

## Contribution
### just clone and pull request.

#### Please open any issues, I will solve it as fast as possible.
#### Contact me mondit.thum@gmail.com
Thank you for your support !
