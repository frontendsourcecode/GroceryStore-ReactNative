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

import Logo from '../components/Logo';
import Card from '../components/Card';
import UserInput from '../components/UserInput';
import LoadingButton from '../components/LoadingButton';
import {StackActions, CommonActions} from '@react-navigation/native';
import {setUserDetails} from '../utils/LocalStorage';

import {checkInternetConnection, userRegister} from '../axios/ServerRequest';
import Validator from '../utils/Validator/Validator';
import {
  DEFAULT_RULE,
  NAME_RULE,
  PHONE_RULE,
  PASSWORD_RULE,
} from '../utils/Validator/rule';
import Toast from 'react-native-simple-toast';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mobile: '',
      password: '',
      mobileError: false,
      nameError: false,
      passwordError: false,
      nameErrorMessage: '',
      mobileErrorMessage: '',
      passwordErrorMessage: '',
    };
  }

  resetState = () => {
    this.setState({
      nameErrorMessage: '',
      nameError: false,
      mobileErrorMessage: '',
      mobileError: false,
      passwordErrorMessage: '',
      passwordError: false,
    });
  };
  componentDidMount = () => {
    checkInternetConnection();
  };

  onChangeMobile(text) {
    this.resetState();
    this.setState({
      mobile: text.replace(/[^0-9]/g, ''),
    });
  }

  register = () => {
    const {
      name,
      mobile,
      password,
      nameError,
      mobileError,
      passwordError,
      nameErrorMessage,
      mobileErrorMessage,
      passwordErrorMessage,
    } = this.state;

    if (!Validator(name, DEFAULT_RULE)) {
      this.setState({
        nameErrorMessage: Strings.nameErrorMessage,
        nameError: true,
      });
      return;
    }
    if (!Validator(name, NAME_RULE)) {
      this.setState({
        nameErrorMessage: Strings.nameErrorMessage,
        nameError: true,
      });
      return;
    }
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
    userRegister(name, mobile, password)
      .then(response => {
        let data = response.data;
        if (data.code === 201) {
          this.showToast(data.status);
          setUserDetails(response.data.userData);
          this.props.navigation.replace('OTP');
        } else {
          this.showToast(data.status);
        }

        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
      });
  };
  showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar barStyle="dark-content" backgroundColor={Color.colo} />

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.innerContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollview}
              onContentSizeChange={this.onContentSizeChange}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <View style={styles.container}>
                <View style={styles.loginLinkContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Login');
                    }}>
                    <Text style={styles.linkText}>{Strings.login_text}</Text>
                  </TouchableOpacity>
                  <Text style={styles.activeLinkText}>
                    {Strings.signup_text}
                  </Text>
                </View>
                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>{Strings.signup_text1}</Text>

                  <Text style={styles.tagline}>{Strings.signup_text2}</Text>
                </View>
                <Logo />
                <Card style={{margin: 30, padding: 20}}>
                  <UserInput
                    placeholder={Strings.nameHint}
                    error={this.state.nameError}
                    value={this.state.name}
                    errorMessage={this.state.nameErrorMessage}
                    maxLength={50}
                    onChangeText={name => {
                      this.setState({
                        name,
                      }),
                        this.resetState();
                    }}
                  />
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
                    <TouchableOpacity />
                    <View style={styles.buttonContainer}>
                      <LoadingButton
                        title={Strings.signup}
                        loading={this.state.loading}
                        onPress={() => {
                          this.register();
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
          <Image
            source={require('../assets/images/thumb3.png')}
            style={{width: 120, height: 120}}
          />
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
});

export default RegisterScreen;
