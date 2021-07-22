import React from 'react';
import {View, StyleSheet} from 'react-native';

export default (Indicators = props => {
  const activeColor = props.activeColor;
  const inactiveColor = props.inactiveColor;
  const dotsCount = props.count;
  const activeDot = props.activeDot;
  const containerStyle = props.containerStyle;

  const createDots = () => {
    let dot = [];
    for (let i = 1; i <= dotsCount; i++) {
      dot.push(
        <View
          key={i}
          style={[
            styles.dot,
            {backgroundColor: activeDot === i ? activeColor : inactiveColor},
          ]}
        />,
      );
    }
    return dot;
  };

  return (
    <View style={[styles.dotContainer, containerStyle]}>
      {createDots().map((dot, i) => (
        <React.Fragment key={i}>{dot}</React.Fragment>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  dotContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 100,
  },
});
