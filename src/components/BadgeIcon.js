import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-feather1s';
import Color from '../theme/Color';

import {TouchableOpacity} from 'react-native-gesture-handler';
function BadgeIcon(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        display: 'flex',
        height: 45,
        width: 30,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <View style={styles.badgeContainer}>
        {props.icon ? (
          <Icon name={props.icon} size={24} color="#ffffff" />
        ) : null}
        {props.count && props.count > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{props.count}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: -10,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    width: 20,
    height: 20,
    textAlign: 'center',
    paddingTop: 2,
    fontSize: 10,
    color: Color.colorPrimary,
  },
  badgeText: {
    fontSize: 10,
  },
});

export default BadgeIcon;
