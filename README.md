# Redux Form Manager
A Form control built with and for React with Redux. Initially built for use in Redux Project
> Validatation in form is easy to go...

### If you liked, gimme a star, Thanks.

## Release Issues
### Latest version is `v2.13.0`
* `v2.13.0`
  - Fixed bugs Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the FormValidation component. (thanks for [KIRAN H](https://github.com/KIRAN-H))
* `v2.12.0`
  - When `errorMessage` is not empty, afterFieldChange won't trigger. (thanks for [KIRAN H](https://github.com/KIRAN-H))
  - `errorMessage` is assigned to '' (empty String) when value is valid. (#issue2 closed thanks for [GA-MO](https://github.com/GA-MO))
* `v2.10.0`
  - Update React to version 15.6.0
  - Using PropTypes from 'prop-types'
* `v2.9.0`
  - Add feature `props in formData` formData: (state, props) => {}



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

The live demo is still running redux-form-manager `v13.0.0`

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

## WARNING !
### Basically, we are using loganfsmyth/babel-plugin-transform-decorators-legacy (@ symbol) in any tutorials so make sure that you have added it in your .babelrc
Read more about [loganfsmyth/babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)
### if you don't want to, let's using this format to activate instead.

### Stand Alone
```js
export default bindFormValidation(core, afterFieldChange, mapStateToValidationPriority)(YourContainer)
```

### With Connect (React-Redux)
```js
const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(YourContainer)
export default bindFormValidation(core, afterFieldChange, mapStateToValidationPriority)(
  connectedComponent
)
```

## Advanced Usage: Reveal Key Features
There are many features we have provided
- [Rendering User Interface with any React Components.](#feature-custom-ui)
- [Doing things after update function when any fields dispatched.](#feature-after-update)
- [Creating custom validation rules.](#feature-custom-validation)
- [Handling dynamic field properties.](#feature-dynamic-field-props)
- [Customizing action type of each field.](#feature-customize-action)
- [Validating each field by priority.](#feature-validation-priority)
- [Using Nested field data such as array of object.](#feature-nested-field)
- [Dispatch firstError to outside container.](#feature-dispatch-firsterror)
- [Using other event to dispatch.](#feature-other-dispatch)

## Basic Usage: Just copy paste
Create new js file and then copy following codes
```js
import React, { Component } from 'react'
import { bindFormValidation } from 'redux-form-manager'

class TextInputField extends Component {
  handleChange = (e) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }
  render = () => {
    const {
      label,
      value,
      disable,
      placeholder,
      hidden,
      errorMessage,
    } = this.props
    return (
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
    return <TextInputField {...fieldData} onChange={updateValue} />
  }
}

@bindFormValidation(core)
export default class Form extends Component {
  render() {
    const { formData, renderInputField, firstError } = this.props
    return (
      <div>
        <h1>Form</h1>
        {renderInputField(formData.firstname)}
        {renderInputField(formData.lastname)}
        <h4>error: {firstError}</h4>
      </div>
    )
  }
}
```
Boom! you got a form with field that could be validated, your page also.
Look at your console that

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
  - [Rendering User Interface with any React Components.](#feature-switch-ui)
  - [Customizing RenderInputField function.](#feature-custom-ui)
  - [Doing things after update function when any fields dispatched.](#feature-after-update)
  - [Creating custom validation rules.](#feature-custom-validation)
  - [Handling dynamic field properties.](#feature-dynamic-field-props)
  - [Customizing action type of each field.](#feature-customize-action)
  - [Validating each field by priority.](#feature-validation-priority)
  - [Using Nested field data such as array of object.](#feature-nested-field)
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
import { bindFormValidation } from 'redux-form-manager'
```
### InputField
InputField is a UI component that receive event from user. You can create any JSX UI as you want. You just reminded that binding function props with renderUIInputField updateValue.

```js
import React, { Component } from 'react'
class TextInputField extends Component {
  handleChange = (e) => {
    const { onUpdateValue } = this.props
    onUpdateValue(e.target.value)
  }
  render = () => {
    const {
      label,
      value,
      disable,
      placeholder,
      hidden,
      errorMessage,
    } = this.props
    return (
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

### Tips for InputField
You can create InputField Component that can morph to other inputs by defining props 'type' such as text, select, checkbox, radio etc.

```js
import React, { Component } from 'react'

import TextInput from 'your/component/path'
import SelectInput from 'your/component/path'

class InputField extends Component {
  render() {
    switch (type) {
      case 'text':
        return <TextInput {...this.props}></TextInput>
      case 'select':
        return <SelectInput {...this.props}></SelectInput>
      default:
        return <TextInput {...this.props}></TextInput>
    }
  }
}

export default InputField

```

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
    lastname: {
      name: 'lastname',
      type: 'input',
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
    switch (fieldData.type)
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
### Field Data Schema (Recommended)
| Property        |     Type
| ------------- |:-------------:
| name | String (*)
| value | String, Object (*)
| rules | Object (*)
| type      | String
| label    | String
| placeholder | String
| disabled |    Boolean
| hidden | Boolean

(*) is required

### You can add any keys as your Component need.

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

## <a id="feature-switch-ui"></a>Switch UI
In ordinary form, we know that there are many input types such as 'text', 'select', 'radio', 'checkbox' etc. In redux-form-manager we also provide you to config your input type.

### just switch (case) in renderUIInputField

```js
import React, { Component } from 'react'
import { bindFormValidation } from 'redux-form-manager'

import TextInput from 'your/component/path'
import SelectInput from 'your/component/path'

const createForm = (state) => {
  return {
    firstname: {
      name: 'firstname',
      type: 'text',
      label: 'Firstname',
      value: '',
      placeholder: 'write down your firstname',
      disabled: false,
      hidden: false,
      rules: {
        required: 'Please fill in your firstname.'
      },
    },
    age: {
      name: 'age',
      type: 'select',
      label: 'Age',
      value: '',
      placeholder: '',
      disabled: false,
      hidden: false,
      options: [
        {
          label: '15 years old',
          value: '15',
        },
        {
          label: '20 years old',
          value: '20',
        }
      ]
      rules: {
        required: 'Please select your age.'
      },
    }
  }
}

const core = {
  actionType: 'FORM/CHANGE/CUSTOMER',
  formData: (state, props) => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    switch (fieldData.type) {
      case 'text':
        return <TextInput {...fieldData} onChange={updateValue} />
      case 'select':
        return <SelectInput {...fieldData} onChange={updateValue} />
      default:
        return <InputField {...fieldData} onChange={updateValue} />
    }
  }
}

@bindFormValidation(core)
export default class Form extends Component {
  render() {
    const { formData, renderInputField, firstError } = this.props
    return (
      <div>
        <h1>Form</h1>
        { renderInputField(formData.firstname) }
        { renderInputField(formData.age) }
        <h4>error: {firstError}</h4>
      </div>
    )
  }
}
```

## <a id="feature-custom-ui"></a>Custom UI
Building your own custom UI, we are going to use 2nd parameter of renderInputField.

```js
import React, { Component } from 'react'
import { bindFormValidation } from 'redux-form-manager'

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

### Rules build-in list
```js
rules: {
  'required' or 'require', value is not empty string/object or null or undefined.
  'email'
  'thaiMobile'
  'thaiPhone'
  'thaiId'
  'thaiFullname'
  'isEqualLength'
  'maxLength'
  'minLength'
  'alphabet'
  'number'
  'correctBracket'
  'notStartWithSpacing'
  'notContainDoubleSpacing'
  'notEndWithSpacing'
  'notContainSpecialChar'
}
```

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
