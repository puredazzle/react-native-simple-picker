import React, { Component } from 'react'; // eslint-disable-line

import PropTypes from 'prop-types';

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal,
	Picker,
	Dimensions,
	TouchableWithoutFeedback,
} from 'react-native'; // eslint-disable-line

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  overlayContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
  },

  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#F5FCFF',
  },

  header: {
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
  headerStyle: PropTypes.object,
  options: PropTypes.array.isRequired,
  initialOptionIndex: PropTypes.number,
  labels: PropTypes.array,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  disableOverlay: PropTypes.bool,
};

const booleanIsSet = variable => variable || String(variable) === 'false';

class SimplePicker extends Component {
	constructor(props) {
		super(props);

		const selected = props.initialOptionIndex || 0;

		this.state = {
			modalVisible: props.modalVisible || false,
			selectedOption: props.options[selected],
		};

		this.styles = StyleSheet.create({
			...styles,
			...props.styles,
		});

		this.onPressCancel = this.onPressCancel.bind(this);
		this.onPressSubmit = this.onPressSubmit.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.onOverlayDismiss = this.onOverlayDismiss.bind(this);
	}

	componentWillReceiveProps(props) {
		// If options are changing, and our current selected option is not part of
		// the new options, update it.
		if (
			props.options
			&& props.options.length > 0
			&& props.options.indexOf(this.state.selectedOption) === -1
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

		if (booleanIsSet(props.modalVisible)) {
			this.setState({
				modalVisible: props.modalVisible,
			});
		}
	}

	onPressCancel() {
		if (this.props.onCancel) {
			this.props.onCancel(this.state.selectedOption);
		}

		this.hide();
	}

	onPressSubmit() {
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state.selectedOption);
		}

		this.hide();
	}

	onOverlayDismiss() {
		if (this.props.onCancel) {
			this.props.onCancel(this.state.selectedOption);
		}

		this.hide();
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

	hide() {
		this.setState({
			modalVisible: false,
		});
	}

	renderItem(option, index) {
		const label = (this.props.labels) ? this.props.labels[index] : option;

		return (
			<Picker.Item
				key={option}
				value={option}
				label={label}
			/>
		);
	}

	render() {
		const { modalVisible, selectedOption } = this.state;
		const {
			options,
      buttonStyle,
      headerStyle,
			itemStyle,
			cancelText,
			confirmText,
			disableOverlay,
		} = this.props;

		return (
			<Modal
				animationType={'slide'}
				transparent
				visible={modalVisible}
			>
				<View style={this.styles.basicContainer}>
					{!disableOverlay &&
					<View style={this.styles.overlayContainer}>
						<TouchableWithoutFeedback onPress={this.onOverlayDismiss}>
							<View style={this.styles.overlayContainer}/>
						</TouchableWithoutFeedback>
					</View>
					}
          <View style={styles.modalContainer}>
            <View style={[styles.header, headerStyle]}>
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

SimplePicker.defaultProps = {
	styles: {},
};

SimplePicker.propTypes = propTypes;

module.exports = SimplePicker;
