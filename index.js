import React, {
  Component,
  PropTypes,
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  PickerIOS,
  Dimensions,
} from 'react-native';

const PickerItemIOS = PickerIOS.Item;

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#F5FCFF',
  },

  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  bottomPicker: {
    width: SCREEN_WIDTH,
  },
});

const propTypes = {
  buttonColor: PropTypes.string,
  options: PropTypes.array.isRequired,
  labels: PropTypes.array,
  confirmText : PropTypes.string,
  cancelText : PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
};

class SimplePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      selectedOption: this.props.options[0],
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillReceiveProps(props) {
    // If options are changing, and our current selected option is not part of
    // the new options, update it.
    if(
      props.options
      && props.options.length > 0
      && props.options.indexOf(this.state.selectedOption) == -1
    ) {
      const previousOption = this.state.selectedOption;
      this.setState({
        selectedOption : props.options[0]
      }, () => {
        // Options array changed and the previously selected option is not present anymore.
        // Should call onSubmit function to tell parent to handle the change too.
        if(previousOption) {
          this.onPressSubmit();
        }
      });
    }
  }

  onPressCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  onPressSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedOption);
    }

    this.setState({
      modalVisible: false,
    });
  }

  onValueChange(option) {
    this.setState({
      selectedOption: option,
    });
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }

  renderItem(option, index) {
    const label = (this.props.labels) ? this.props.labels[index] : option;
    return (
      <PickerItemIOS
        key={option}
        value={option}
        label={label}
      />
    );
  }

  render() {
    const { buttonColor } = this.state;
    const itemStyle = this.props.itemStyle || {};
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalVisible}
      >
        <View style={styles.basicContainer}>
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={{ color: buttonColor }}>
                  {this.props.cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={{ color: buttonColor }}>
                  {this.props.confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainBox}>
              <PickerIOS
                ref={'picker'}
                style={styles.bottomPicker}
                selectedValue={this.state.selectedOption}
                onValueChange={(option) => this.onValueChange(option)}
                itemStyle={itemStyle}
              >
                {this.props.options.map((option, index) => this.renderItem(option, index))}
              </PickerIOS>
            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

SimplePicker.propTypes = propTypes;

module.exports = SimplePicker;
