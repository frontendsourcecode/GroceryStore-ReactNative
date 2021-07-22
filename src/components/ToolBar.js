import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles/styles.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';

function ToolBar(props) {
  return (
    <View style={styles.toolBar}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {props.icon ? (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.toggle}
            onPress={props.onPress}>
            <Icon name={props.icon} size={24} color="#ffffff" />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.toolbarTitle}>{props.title}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: 10,
        }}>
        {props.children}
      </View>
    </View>
  );
}

ToolBar.propTypes = {};

export default ToolBar;
