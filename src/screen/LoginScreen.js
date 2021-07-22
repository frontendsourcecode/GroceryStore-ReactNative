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
  StatusBar,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';

import Logo from '../components/Logo';
import Card from '../components/Card';
import UserInput from '../components/UserInput';
import LoadingButton from '../components/LoadingButton';
import {checkInternetConnection, userLogin} from '../axios/ServerRequest';
import Validator from '../utils/Validator/Validator';
import {DEFAULT_RULE, PHONE_RULE, PASSWORD_RULE} from '../utils/Validator/rule';
import Toast from 'react-native-simple-toast';
import {setUserDetails} from '../utils/LocalStorage';
import firebase from "react-native-firebase";
const defaultHandler = global.ErrorUtils.getGlobalHandler()
const crashlytics = firebase.crashlytics()
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mobile: '',
      password: '',
      mobileError: false,
      mobileErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
    };
  }

  componentDidMount = () => {
    checkInternetConnection();
    // firebase.crashlytics().enableCrashlyticsCollection();
    // firebase.crashlytics().log('Testing crash');
    // firebase.crashlytics.crash();
    //crashlytics.crash();
  };

  onChangeMobile(text) {
    this.resetState();
    this.setState({
      mobile: text.replace(/[^0-9]/g, ''),
    });
  }

  login = () => {
    const {
      mobile,
      password,
      mobileError,
      passwordError,
      mobileErrorMessage,
      passwordErrorMessage,
    } = this.state;

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
    this.setState({loading: true});
    userLogin(mobile, password)
      .then(response => {
        let data = response.data;
        console.log(response.data);
        if (data.code === 200) {
          this.showToast(data.status);
          setUserDetails(response.data.userData);
          this.props.navigation.replace('HomeScreen');
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
      mobileErrorMessage: '',
      mobileError: false,
      passwordErrorMessage: '',
      passwordError: false,
    });
  };

  showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          barStyle="light-content"
          backgroundColor={Color.colorPrimary}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.innerContainer}>
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={styles.scrollview}
              onContentSizeChange={this.onContentSizeChange}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <View>
                <View style={styles.loginLinkContainer}>
                  <Text style={styles.activeLinkText}>SignIn</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Register');
                    }}>
                    <Text style={styles.linkText}>{Strings.signup_text}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>{Strings.login_text1}</Text>

                  <Text style={styles.tagline}>{Strings.login_text2}</Text>
                </View>
                <Logo />
                <Card style={{margin: 30, padding: 20}}>
                  <UserInput
                    keyboardType="numeric"
                    placeholder={Strings.mobileHint}
                    error={this.state.mobileError}
                    value={this.state.mobile}
                    errorMessage={this.state.mobileErrorMessage}
                    maxLength={10}
                    onChangeText={mobile => this.onChangeMobile(mobile)}
                  />
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
                  <View
                    style={[
                      styles.loginLinkContainer,
                      {marginTop: 20, justifyContent: 'space-between'},
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.replace('ForgetPassword');
                      }}>
                      <Text style={[styles.linkText, {fontSize: 12}]}>
                        {Strings.forgetPassword}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                      <LoadingButton
                        title={Strings.signin}
                        loading={this.state.loading}
                        onPress={() => {
                          this.login();
                        }}
                      />
                    </View>
                  </View>
                </Card>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bottomImage}>
          <Image source={require('../assets/images/thumb1.png')} />
        </View>
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
  scrollView: {
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    zIndex: 99999999,
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
    marginTop: 30,
    marginBottom: 30,
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
    textAlign: 'right',
  },
  activeLinkText: {
    flex: 1,
    color: Color.colorPrimaryDark,
    padding: 10,
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
    textAlign: 'left',
  },
  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 80,
    zIndex: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {},
});
export default LoginScreen;
