import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';
import ToolBar from '../components/ToolBar';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {getUserDetails} from '../utils/LocalStorage';
import UserInput from '../components/UserInput';
import LoadingButton from '../components/LoadingButton';
import {DEFAULT_RULE, EMAIL_RULE} from '../utils/Validator/rule';
import {updateUser} from '../axios/ServerRequest';
import {getToken, setUserDetails} from '../utils/LocalStorage';
import Validator from '../utils/Validator/Validator';

class AddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: '',
      phone: '',
      id: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      emailError: '',
      addressError: '',
      cityError: '',
      stateError: '',
      zipError: '',
      token: '',
      loading: false,
    };
  }
  async componentDidMount() {
    let user = await getUserDetails();
    this.setState({
      user: user,
      id: user.id,
      phone: user.mobile,
      name: user.fname,
      email: user.email,
      address: user.address,
      city: user.city,
      state: user.state,
      zip: user.zip,
      token: user.token,
    });
  }

  updateAddress = () => {
    const {
      user,
      email,
      address,
      state,
      city,
      zip,
      token,
      emailError,
      addressError,
      stateError,
      cityError,
      zipError,
    } = this.state;

    if (!Validator(email, DEFAULT_RULE)) {
      this.setState({
        emailError: true,
      });
      return;
    }

    if (!Validator(email, EMAIL_RULE)) {
      this.setState({
        emailError: true,
      });
      return;
    }

    if (!Validator(address, DEFAULT_RULE)) {
      this.setState({
        addressError: true,
      });
      return;
    }
    if (!Validator(state, DEFAULT_RULE)) {
      this.setState({
        stateError: true,
      });
      return;
    }
    if (!Validator(city, DEFAULT_RULE)) {
      this.setState({
        cityError: true,
      });
      return;
    }
    if (!Validator(zip, DEFAULT_RULE)) {
      this.setState({
        zipError: true,
      });
      return;
    }

    this.setState({loading: true});
    user.email = email;
    user.address = address;
    user.state = state;
    user.city = city;
    user.zip = zip;

    updateUser(user)
      .then(response => {
        let data = response.data;
        console.log(response);
        if (data.code === 200) {
          this.props.navigation.navigate('PlaceOrder');
          setUserDetails(user);
        }

        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };

  render() {
    const {navigation} = this.props;
    const {user} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Address"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          {user !== null ? (
            <ScrollView
              style={{padding: 20, paddingRight: 20}}
              contentContainerStyle={styles.scrollview}
              onContentSizeChange={this.onContentSizeChange}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'always'}>
              <UserInput
                placeholder={Strings.nameHint}
                value={this.state.name}
                errorMessage={this.state.nameErrorMessage}
                maxLength={50}
                editable={false}
              />
              <UserInput
                placeholder={Strings.mobileHint}
                value={this.state.phone}
                maxLength={50}
                editable={false}
                value={this.state.phone}
              />
              <UserInput
                placeholder={Strings.emailHint}
                value={this.state.email}
                error={this.state.emailError}
                onChangeText={email => {
                  this.setState({
                    email,
                  });
                }}
              />
              <UserInput
                placeholder={Strings.addressHint}
                errorMessage={this.state.addressError}
                value={this.state.address}
                error={this.state.addressError}
                onChangeText={address => {
                  this.setState({
                    address,
                  });
                }}
              />
              <UserInput
                placeholder={Strings.stateHint}
                errorMessage={this.state.stateError}
                value={this.state.state}
                error={this.state.stateError}
                onChangeText={state => {
                  this.setState({
                    state,
                  });
                }}
              />
              <UserInput
                placeholder={Strings.cityHint}
                errorMessage={this.state.cityError}
                value={this.state.city}
                error={this.state.cityError}
                onChangeText={city => {
                  this.setState({
                    city,
                  });
                }}
              />
              <UserInput
                placeholder={Strings.zipHint}
                errorMessage={this.state.zipError}
                value={this.state.zip}
                maxLength={6}
                error={this.state.zipError}
                onChangeText={zip => {
                  this.setState({
                    zip,
                  });
                }}
              />
              <View style={{marginTop: 20}}>
                <LoadingButton
                  title={Strings.save}
                  loading={this.state.loading}
                  onPress={() => {
                    this.updateAddress();
                  }}
                />
              </View>
            </ScrollView>
          ) : null}
        </View>
      </View>
    );
  }
}

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  box1: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: 18,
    color: Color.textColor,
  },
  title: {
    fontSize: 16,
    color: Color.black,
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },

  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
});
