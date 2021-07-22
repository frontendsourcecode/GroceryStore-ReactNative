import React, {Component} from 'react';
import {View, Button, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Color from '../../theme/Color';
import Font from '../../theme/Fonts';
import {TouchableOpacity} from 'react-native-gesture-handler';

function LoadingButton(props) {
  return (
    <View>
      {props.loading ? (
        <View
          style={[
            styles.buttonStyle,
            {
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 7,
              paddingBottom: 7,
            },
            props.style,
          ]}>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={props.onPress}
          style={[styles.buttonStyle, props.style]}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    color: Color.white,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: Color.colorPrimary,
  },
  buttonText: {
    color: Color.white,
    fontFamily: Font.primaryRegular,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoadingButton;
