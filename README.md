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
This project uses library React, Redux, React-Redux and ES2015 syntax, so make sure that you are capable with it.
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
$ yarn add redux-form-manager --save
```

## Basic Usage: Just copy paste
Create new js file and then copy following codes
```js
import React, { Component } from 'react'
import InputField, { bindFormValidation } from 'redux-form-manager'

const createForm = (state) => {
  return {
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
    lastname: {
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
Boom! you got a form with field that could be validated, your page also.
Look at your console that

## Advanced Usage: Reveal Key Features
There are many features we have provided
- Building your own custom UI.
- Validating each field by priority.
- Doing after update function when any field dispatch.
- Customizing action type of each field.
- Creating custom validation rules.
- Using Nested field data such as array of object.
- Handling dynamic field properties.
- Dispatch firstError to outside container.

### Just copy paste again, Let's see in action.
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
        { renderInputField(formData.firstname) }
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
You can find more feature's examples in [DOC.MD](<https://github.com/hlex/redux-form-manager/blob/master/DOC.md>)

## Documentation
Read more [DOC.MD](<https://github.com/hlex/redux-form-manager/blob/master/DOC.md>)

## Contributions
### Looking for.

## Contributing
### just clone and pull request.

#### Please open any issues, I will solve it as fast as possible.
#### Contact me mondit.thum@gmail.com
Thank you for your support !
