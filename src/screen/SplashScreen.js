import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Color from '../theme/Color';
import AppStatusBar from '../components/AppStatusBar';
import {getUserDetails} from '../utils/LocalStorage';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    const user = await getUserDetails();
    if (data !== null) {
      if (user !== null) {
        this.props.navigation.replace('HomeScreen');
      } else {
        this.props.navigation.replace('WelcomeScreen');
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar
          backgroundColor="rgba(0,0,0,0)"
          barStyle="dark-content"
          visibleStatusBar={false}
          translucent
        />
        <Image
          style={styles.logo}
          source={require('../assets/images/original-logo.png')}
        />
        <View style={styles.bottomImage}>
          <Image source={require('../assets/images/thumb1.png')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Color.white,
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },

  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 15,
    right: 80,
  },
});

export default SplashScreen;
