import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';

import Card from '../components/Card';
import UserInput from '../components/UserInput';
import LoadingButton from '../components/LoadingButton';
import Icon from 'react-native-feather1s';
import Logo from '../components/Logo';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Validator from '../utils/Validator/Validator';
import {
  checkInternetConnection,
  forgotPassword,
  resetPassword,
} from '../axios/ServerRequest';
import DropdownAlert from 'react-native-dropdownalert';
import {DEFAULT_RULE, PHONE_RULE, PASSWORD_RULE} from '../utils/Validator/rule';
import {setUserDetails} from '../utils/LocalStorage';
class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showPassword: false,
      code: '',
      mobile: '',
      mobileError: false,
      mobileErrorMessage: '',
      otp: '',
      password: '',
      conPassword: '',
      passwordError: false,
      passwordErrorMessage: '',
      conPasswordError: false,
      conPasswordErrorMessage: '',
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
    this.sendVerifyOTP(mobile);
  };

  sendVerifyOTP = mobile => {
    // let OTP = Math.floor(1000 + Math.random() * 9000).toString();
    // this.setState({code: OTP, showPassword: true});
    // this.dropDownAlertRef.alertWithType(
    //   'success',
    //   '#GS55001',
    //   ` Please enter OTP  ${OTP} to verify user.`,
    // );
    forgotPassword(mobile)
      .then(response => {
        let data = response.data;
        console.log(response.data);
        if (data.code === 200) {
          this.setState({showPassword: true});
        } else {
          this.showToast(data.status);
        }
        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
      });
  };

  verifyOTP = () => {
    if (this.state.otp === this.state.code) {
      this.dropDownAlertRef.alertWithType(
        'success',
        '#GS55001',
        Strings.successfullVerify,
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

  resetPassword = () => {
    const {
      otp,
      code,
      password,
      conPassword,
      passwordError,
      passwordErrorMessage,
      conPasswordError,
      conPasswordErrorMessage,
    } = this.state;
    this.resetState();
    if (this.state.otp == null || this.state.otp < 6) {
      this.setState({otp: ''});
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        Strings.enterValidOTP,
      );
      return;
    }
    if (!Validator(password, DEFAULT_RULE)) {
      this.setState({
        passwordErrorMessage: Strings.passwordErrorMessage,
        passwordError: true,
      });
      return;
    }
    if (!Validator(password, PASSWORD_RULE)) {
      this.setState({
        passwordErrorMessage: Strings.passwordErrorMessage,
        passwordError: true,
      });
      return;
    }
    if (!Validator(conPassword, DEFAULT_RULE)) {
      this.setState({
        conPasswordErrorMessage: Strings.passwordErrorMessage,
        conPasswordError: true,
      });
      return;
    }
    if (conPassword !== password) {
      this.setState({
        conPasswordErrorMessage: Strings.confirmPasswordErrorMessage,
        conPasswordError: true,
      });
      return;
    }
    // this.dropDownAlertRef.alertWithType(
    //   'success',
    //   'Success',
    //   Strings.passworResetSuccess,
    // );
    // this.props.navigation.replace('Login');

    resetPassword(this.state.otp, this.state.password)
      .then(response => {
        let data = response.data;
        console.log(response.data);
        if (data.code === 200) {
          this.props.navigation.replace('Login');
        } else {
          this.showToast(data.status);
        }
        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  resetState = () => {
    this.setState({
      passwordError: false,
      passwordErrorMessage: '',
      conPasswordError: false,
      conPasswordErrorMessage: '',
    });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > Dimension.window.height;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.innerContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollview}
              scrollEnabled={scrollEnabled}
              onContentSizeChange={this.onContentSizeChange}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <View style={styles.container}>
                <View style={styles.loginLinkContainer}>
                  <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => {
                      this.props.navigation.navigate('Login');
                    }}>
                    <Icon name="arrow-left" size={30} color={Color.gray} />
                  </TouchableOpacity>
                </View>
                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>{Strings.forgot_text1}</Text>

                  <Text style={styles.tagline}>{Strings.forgot_text2}</Text>
                </View>
                <Logo />
                <Card style={{margin: 20, padding: 20}}>
                  {this.state.showPassword ? (
                    <View>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 20,
                        }}>
                        <SmoothPinCodeInput
                          placeholder="⭑"
                          ref={this.pinInput}
                          cellStyle={{
                            borderBottomWidth: 2,
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
                      </View>

                      <UserInput
                        placeholder={Strings.passwordHint}
                        secureTextEntry={true}
                        error={this.state.passwordError}
                        value={this.state.password}
                        errorMessage={this.state.passwordErrorMessage}
                        maxLength={20}
                        onChangeText={password => {
                          this.setState({
                            password,
                          }),
                            this.resetState();
                        }}
                      />
                      <UserInput
                        placeholder={Strings.confPasswordHint}
                        secureTextEntry={true}
                        error={this.state.conPasswordError}
                        value={this.state.conPassword}
                        errorMessage={this.state.conPasswordErrorMessage}
                        maxLength={20}
                        onChangeText={conPassword => {
                          this.setState({
                            conPassword,
                          }),
                            this.resetState();
                        }}
                      />
                      <LoadingButton
                        style={{marginTop: 20}}
                        title={Strings.resetpassword}
                        loading={this.state.loading}
                        onPress={() => {
                          this.resetPassword();
                        }}
                      />

                      <Text style={styles.subTitle}>
                        {Strings.notReceiveOTP}
                      </Text>
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
                    </View>
                  ) : (
                    <View>
                      <UserInput
                        keyboardType="numeric"
                        placeholder={Strings.mobileHint}
                        error={this.state.mobileError}
                        value={this.state.mobile}
                        errorMessage={this.state.mobileErrorMessage}
                        maxLength={10}
                        onChangeText={mobile => this.onChangeMobile(mobile)}
                      />
                      <LoadingButton
                        style={{marginTop: 30}}
                        title={Strings.generateOTP}
                        loading={this.state.loading}
                        onPress={() => {
                          this.sendOTP();
                        }}
                      />
                    </View>
                  )}
                </Card>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bottomImage}>
          <Image
            source={require('../assets/images/thumb3.png')}
            style={{width: 120, height: 120}}
          />
        </View>
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
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    zIndex: 99999999,
    width: '100%',
  },
  loginLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
  },

  heading: {
    fontSize: 20,
    fontFamily: Fonts.primarySemiBold,
    color: Color.headingColor,
  },

  tagline: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: Color.taglineColor,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: Fonts.primaryRegular,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: Fonts.primaryBold,
  },
  linkText: {
    flex: 1,
    color: Color.textColor,
    padding: 10,
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  activeLinkText: {
    flex: 1,
    color: Color.colorPrimaryDark,
    padding: 10,
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    textAlign: 'right',
  },
  bottomImage: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {},
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

export default ForgotPasswordScreen;
