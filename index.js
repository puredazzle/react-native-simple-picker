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
  TouchableWithoutFeedback
} from 'react-native';

const PickerItemIOS = PickerIOS.Item;

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  overlayContainer: {
    flex: 1,
    width: SCREEN_WIDTH
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
  buttonStyle: PropTypes.object,
  options: PropTypes.array.isRequired,
  initialOptionIndex: PropTypes.number,
  labels: PropTypes.array,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  overlayClose: PropTypes.bool
};

class SimplePicker extends Component {
  constructor(props) {
    super(props);

    const selected = this.props.initialOptionIndex || 0;

    this.state = {
      modalVisible: false,
      selectedOption: this.props.options[selected],
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.overlayDismiss = this.overlayDismiss.bind(this);

    if ('buttonColor' in props) {
      console.warn('buttonColor as a prop is deprecated, please use buttonStyle instead.');
    }
  }

  componentWillReceiveProps(props) {
    // If options are changing, and our current selected option is not part of
    // the new options, update it.
    if (
      props.options
      && props.options.length > 0
      && props.options.indexOf(this.state.selectedOption) == -1
    ) {
      const previousOption = this.state.selectedOption;
      this.setState({
        selectedOption: props.options[0],
      }, () => {
        // Options array changed and the previously selected option is not present anymore.
        // Should call onSubmit function to tell parent to handle the change too.
        if (previousOption) {
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

  overlayDismiss(){
    if(this.props.overlayClose) {
      this.onPressCancel();
    }
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
    const { modalVisible, selectedOption } = this.state;
    const { options, buttonStyle, itemStyle, cancelText, confirmText } = this.props;

    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={modalVisible}
      >
        <View style={styles.basicContainer}>
          <View style={styles.overlayContainer}>
            <TouchableWithoutFeedback onPress={this.overlayDismiss}>
              <View style={styles.overlayContainer}></View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={buttonStyle}>
                  {cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={buttonStyle}>
                  {confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainBox}>
              <PickerIOS
                ref={'picker'}
                style={styles.bottomPicker}
                selectedValue={selectedOption}
                onValueChange={(option) => this.onValueChange(option)}
                itemStyle={itemStyle}
              >
                {options.map((option, index) => this.renderItem(option, index))}
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
