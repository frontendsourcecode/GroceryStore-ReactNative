import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';
import Logo from '../components/Logo';
import Card from '../components/Card';
import UserInput from '../components/UserInput';
import LoadingButton from '../components/LoadingButton';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Validator from '../utils/Validator/Validator';
import {DEFAULT_RULE, PHONE_RULE} from '../utils/Validator/rule';
import {checkInternetConnection} from '../axios/ServerRequest';
import {NavigationActions} from 'react-navigation';

import DropdownAlert from 'react-native-dropdownalert';

class OTPScreen extends Component {
  pinInput = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showOTP: false,
      code: '',
      mobile: '',
      mobileError: false,
      mobileErrorMessage: '',
      otp: '',
      screenHeight: 0,
    };
  }

  componentDidMount = () => {
    checkInternetConnection();
  };

  onChangeMobile(text) {
    this.resetState();
    this.setState({
      mobile: text.replace(/[^0-9]/g, ''),
    });
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({screenHeight: contentHeight});
  };
  sendOTP = () => {
    const {mobile} = this.state;
    if (!Validator(mobile, DEFAULT_RULE)) {
      this.setState({
        mobileErrorMessage: Strings.mobileErrorMessage,
        mobileError: true,
      });
      return;
    }
    if (!Validator(mobile, PHONE_RULE)) {
      this.setState({
        mobileErrorMessage: Strings.mobileErrorMessage,
        mobileError: true,
      });
      return;
    }
    this.sendVerifyOTP();
  };

  sendVerifyOTP = () => {
    let OTP = Math.floor(1000 + Math.random() * 9000).toString();
    this.setState({code: OTP, showOTP: true});
    this.dropDownAlertRef.alertWithType(
      'success',
      '#GS55001',
      ` Please enter OTP  ${OTP} to verify user.`,
    );
  };

  verifyOTP = () => {
    if (this.state.otp === this.state.code) {
      this.dropDownAlertRef.alertWithType(
        'success',
        '#GS55001',
        Strings.passworResetSuccess,
      );
      this.props.navigation.replace('HomeScreen');
    } else {
      this.setState({otp: ''});
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        Strings.enterValidOTP,
      );
    }
  };

  resetState = () => {
    this.setState({
      mobileErrorMessage: '',
      mobileError: false,
    });
  };

  _checkCode = otp => {
    if (otp != '1234') {
      this.pinInput.current.shake().then(() => this.setState({code: ''}));
    }
  };
  render() {
    const {mobile} = this.state;
    const scrollEnabled = this.state.screenHeight > Dimension.window.height;
    return (
      <View style={{  backgroundColor:Color.white, flex:1 }}>
         <AppStatusBar
              backgroundColor={Color.white}
              barStyle="light-content"
            />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/images/mail_box_img.png')}
                style={styles.imageStyle}
              />
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.title}>{Strings.otpText}</Text>
              {this.state.showOTP ? (
                <Text
                  style={styles.subTitle}>{`Enter OTP send to ${mobile}`}</Text>
              ) : (
                <Text style={styles.subTitle}>{Strings.otpSendText}</Text>
              )}

              {this.state.showOTP ? (
                <View style={styles.inputStyle}>
                  <SmoothPinCodeInput
                    ref={this.pinInput}
                    cellStyle={{
                      borderWidth: 2,
                      borderRadius: 5,
                      borderColor: Color.lightgray,
                      backgroundColor: Color.white,
                    }}
                    cellStyleFocused={{
                      borderColor: Color.colorPrimary,
                    }}
                    value={this.state.otp}
                    onTextChange={otp => this.setState({otp})}
                    onBackspace={() => console.log('No more back.')}
                  />

                  <Text style={styles.subTitle}>{Strings.notReceiveOTP}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.sendVerifyOTP();
                    }}>
                    <Text
                      style={[
                        styles.subTitle,
                        {color: Color.colorPrimary, marginBottom: 10},
                      ]}>
                      {Strings.resendOTP}
                    </Text>
                  </TouchableOpacity>
                  <LoadingButton
                    title={Strings.verifyOTP}
                    loading={this.state.loading}
                    onPress={() => {
                      this.verifyOTP();
                    }}
                  />
                </View>
              ) : (
                <View style={styles.inputStyle}>
                  <UserInput
                    containerStyle={styles.containerStyle}
                    keyboardType="numeric"
                    placeholder={Strings.mobileHint}
                    error={this.state.mobileError}
                    value={this.state.mobile}
                    errorMessage={this.state.mobileErrorMessage}
                    maxLength={10}
                    onChangeText={mobile => this.onChangeMobile(mobile)}
                  />
                  <LoadingButton
                    title={Strings.generateOTP}
                    loading={this.state.loading}
                    onPress={() => {
                      this.sendOTP();
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <DropdownAlert
          ref={ref => (this.dropDownAlertRef = ref)}
          closeInterval={5000}
          inactiveStatusBarBackgroundColor={Color.colorPrimary}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    paddingLeft: '20%',
    paddingRight: '20%',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageStyle: {
    height: 250,
    width: 250,
    marginTop: '10%',
  },
  title: {
    fontSize: 25,
    fontFamily: Fonts.primaryBold,
    marginTop: 10,
    color: Color.textColor,
  },
  containerStyle: {
    marginTop: 30,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.primarySemiBold,
    marginTop: 10,
    color: Color.graylight,
    textAlign: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default OTPScreen;
