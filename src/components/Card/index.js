import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

function Card(props) {
  return (
    <View style={[styles.cardContainer, props.style]}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 20,
    padding: 10,
    margin: 10,
    zIndex: 999999999,
  },
});

export default Card;
