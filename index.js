import React, { Component } from 'react'; // eslint-disable-line

import PropTypes from 'prop-types';

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal,
	Dimensions,
	TouchableWithoutFeedback,
  Animated,
	SafeAreaView,
  Platform,
} from 'react-native'; // eslint-disable-line

import { Picker } from '@react-native-picker/picker';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = {
	overlayContainer: {
	  zIndex: -1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.3,
	},

	mainBox: {
		// Can be used by <SimplePicker styles={{ mainBox:{...} }}/>
	},

	modalContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0,
		backgroundColor: '#F5FCFF',
	},

	buttonView: {
		width: '100%',
		padding: 8,
		borderTopWidth: 0.5,
		borderTopColor: 'lightgrey',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},

	bottomPicker: {
		width: SCREEN_WIDTH,
	},
};

const propTypes = {
	buttonColor: PropTypes.string,
	buttonStyle: PropTypes.object,
	cancelText: PropTypes.string,
	cancelTextStyle: PropTypes.object,
	confirmText: PropTypes.string,
	confirmTextStyle: PropTypes.object,
	disableOverlay: PropTypes.bool,
	initialOptionIndex: PropTypes.number,
	itemStyle: PropTypes.object,
	labels: PropTypes.array,
	modalVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
	options: PropTypes.array.isRequired,
	styles: PropTypes.object,
};

const booleanIsSet = variable => variable || String(variable) === 'false';

class SimplePicker extends Component {
	constructor(props) {
		super(props);

		const selected = props.initialOptionIndex || 0;

		this.state = {
			modalVisible: props.modalVisible || false,
			selectedOption: props.options[selected],
      translateY: new Animated.Value(0),
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

	UNSAFE_componentWillReceiveProps(nextProps) {
		// If initial option index is changed we need to update the code.
		if (nextProps.initialOptionIndex !== this.props.initialOptionIndex) {
			this.setState({
				selectedOption: nextProps.options[nextProps.initialOptionIndex || 0],
			});
		}

		// If options are updated and our current selected option
		// is not part of the new options.
		if (
			nextProps.options
			&& nextProps.options.length > 0
			&& nextProps.options.indexOf(this.state.selectedOption) === -1
		) {
			const previousOption = this.state.selectedOption;
			this.setState({
				selectedOption: nextProps.options[nextProps.initialOptionIndex || 0],
			}, () => {
				// Options array changed and the previously selected option is not present anymore.
				// Should call onSubmit function to tell parent to handle the change too.
				if (previousOption) {
					this.onPressSubmit();
				}
			});
		}

		if (booleanIsSet(nextProps.modalVisible)) {
			this.setState({
				modalVisible: nextProps.modalVisible,
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
    Animated.timing(
      this.state.translateY,
      { toValue: Platform.OS === 'ios' ? -250 : -85, useNativeDriver: true }
    ).start();
	}

	hide() {
    Animated.timing(
      this.state.translateY,
      { toValue: 0, useNativeDriver: true }
    ).start(() => this.setState({ modalVisible: false }));
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
		const { modalVisible, selectedOption, translateY } = this.state;
		const {
			options,
			buttonStyle,
			itemStyle,
			cancelText,
			cancelTextStyle,
			confirmText,
			confirmTextStyle,
			disableOverlay,
		} = this.props;

    const transformStyle = {
      transform: [{ translateY }]
    };

    return (
       <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.onPressCancel}
          supportedOrientations={['portrait', 'landscape']}
        >
          {!disableOverlay &&
          <TouchableWithoutFeedback onPress={this.onOverlayDismiss}>
            <View style={this.styles.overlayContainer}/>
          </TouchableWithoutFeedback>
          }
			<SafeAreaView>
          <Animated.View style={[this.styles.modalContainer, transformStyle]}>
            <View style={this.styles.buttonView}>
              <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={[buttonStyle, cancelTextStyle]}>
                  {cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={[buttonStyle, confirmTextStyle]}>
                  {confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={this.styles.mainBox}>
              <Picker
                style={this.styles.bottomPicker}
                selectedValue={selectedOption}
                onValueChange={this.onValueChange}
                itemStyle={itemStyle}
              >
                {options.map((option, index) => this.renderItem(option, index))}
              </Picker>
            </View>
          </Animated.View>
		</SafeAreaView>
        </Modal>
    );
	}
}

SimplePicker.defaultProps = {
	styles: {},
};

SimplePicker.propTypes = propTypes;

module.exports = SimplePicker;
