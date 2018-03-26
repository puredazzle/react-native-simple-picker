# React Native Simple Picker

A simple picker for React Native.

[![Latest Version](https://img.shields.io/npm/v/react-native-simple-picker.svg)](https://www.npmjs.com/package/react-native-simple-picker)
[![Total Downloads](https://img.shields.io/npm/dt/react-native-simple-picker.svg)](https://www.npmjs.com/package/react-native-simple-picker)
[![License](https://img.shields.io/npm/l/react-native-simple-picker.svg)](LICENSE)

[<img src="https://cloud.githubusercontent.com/assets/499192/14314055/79b56344-fbf5-11e5-9813-66a2d2a040c7.gif" width="350">](https://cloud.githubusercontent.com/assets/499192/14314055/79b56344-fbf5-11e5-9813-66a2d2a040c7.gif)

## Install

```
$ npm install react-native-simple-picker --save
```

## iOS and Android

From version 2.0 React Native Simple Picker now supports both Android and iOS.

## Example

You will find an example in the `/exampleApp` folder.

## Properties

| Prop  | Default  | Type | Description | Required |
| :------------ |:---------------:| :---------------:| :-----| :-----|
| buttonStyle | - | `Object` | Style Close/Continue Buttons | `false` |
| headerStyle | - | `Object` | Style for the header bar | `false` |
| options | - | `Array` | Options that will be passed to the picker | `true`
| initialOptionIndex | - | `Number` | Initial selected option based on it's index | `false`
| labels | - | `Array` | Labels for the options passed to the picker | `false`
| confirmText | Confirm | `String` | Confirm button text | `false`
| cancelText | Cancel | `String` | Cancel button text | `false`
| itemStyle | - | `Object` | Picker style prop. Use this to customize the picker colors, etc | `false`
| disableOverlay | - | `bool` | When set to false it will dismiss the picker when the outside region is pressed | `false`

## Events 

| Prop  | Params  | Description |
| :------------ |:---------------:| :---------------:|
| onSubmit | - |  Use this to trigger any action on your parent component when an option is selected
## License

This package is licensed under [The MIT License (MIT)](LICENSE).
