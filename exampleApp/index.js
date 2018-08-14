/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SimplePicker from 'react-native-simple-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efecc9',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  paragraph: {
    textAlign: 'center',
    color: '#002f2f',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const options = ['Option1', 'Option2', 'Option3'];

// Labels is optional
const labels = ['Banana', 'Apple', 'Pear'];

class ExampleApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Current Option: {this.state.selectedOption}</Text>

        <Text
          style={{ color: '#006381', marginTop: 20 }}
          onPress={() => {
            this.refs.picker.show();
          }}
        >
            Click here to select your option
        </Text>

        <Text
          style={{ color: '#006381', marginTop: 20 }}
          onPress={() => {
            this.refs.picker2.show();
          }}
        >
            Click here to select your option with labels
        </Text>

        <SimplePicker
          ref={'picker'}
          options={options}
          onSubmit={(option) => {
            this.setState({
              selectedOption: option,
            });
          }}
        />

        <SimplePicker
          ref={'picker2'}
          options={options}
          labels={labels}
          itemStyle={{
            fontSize: 25,
            color: 'red',
            textAlign: 'left',
            fontWeight: 'bold',
          }}
          onSubmit={(option) => {
            this.setState({
              selectedOption: option,
            });
          }}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('exampleApp', () => ExampleApp);
