import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, BackHandler} from 'react-native';
import thankyou from '../assets/images/thankyou.png';
import {Color, Fonts, Strings, Dimension} from '../theme';
import AppStatusBar from '../components/AppStatusBar';
import {CommonActions} from '@react-navigation/native';

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
    setTimeout(() => {
      this.resetBack();
    }, 2000);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  backAction = () => {
    this.props.navigation.replace('HomeScreen');
  };

  resetBack = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'HomeScreen'}],
      }),
    );
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.transparent}
          barStyle="light-content"
        />
        <View style={{padding: 20}}>
          <Image style={styles.imgStyle} source={thankyou} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  imgStyle: {
    height: Dimension.window.height,
    width: Dimension.window.width,
  },
});
export default ThankYou;
