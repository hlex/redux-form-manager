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
  defaultActionType: 'FORM/CHANGE/CUSTOMER',
  formData: state => createForm(state),
  renderUIInputField: (fieldData, updateValue) => {
    return <InputField {...fieldData} onChange={updateValue} />
  }
}
@bindFormValidation(core)
```
### defaultActionType
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
  defaultActionType: 'FORM/CHANGE/CUSTOMER',
  formData: state => createForm(state),
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
| type      | String
| label    | String
| value | String, Object
| placeholder | String
| disabled |    Boolean
| hidden | Boolean
| rules | Array of Object

we can define fieldData as follow.
```js
const firstname = {
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
```

## <a id="feature-custom-ui"></a>Custom UI
Building your own custom UI.

## <a id="feature-validation-priority"></a>mapStateToValidationPriority
Validating each field by priority.

## <a id="feature-after-update"></a>afterFieldChange
Doing after update function when any field dispatch.

## <a id="feature-customize-action"></a>actionType
Customizing action type of each field.

## <a id="feature-custom-validation"></a>Custom Validation Rules
Creating custom validation rules.

## <a id="feature-nested-field"></a>Nested Field Data
Using Nested field data such as array of object.

## <a id="feature-dynamic-field-props"></a>Dynamic Field Data properties
Handling dynamic field properties.

## <a id="feature-dispatch-firsterror"></a>Dispatch firsterror
Dispatch firstError to outside container.

## <a id="feature-other-dispatch"></a>Other Dispatchs
Using other event to dispatch.
