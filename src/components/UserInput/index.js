import React, {useState} from 'react';
import {View, Platform, StyleSheet, TextInput, Text} from 'react-native';
import Color from '../../theme/Color';
import Font from '../../theme/Fonts';
import Dimension from '../../theme/Dimension';

function UserInput(props) {
  const [hasFocus, sethasFocus] = useState(false);
  const onFocus = () => {
    sethasFocus(true);
  };

  const onBlur = () => {
    sethasFocus(false);
  };
  return (
    <View style={[styles.textInputContainer, props.containerStyle]}>
      <TextInput
        style={styles.textInput}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        returnKeyType={props.returnKeyType}
        placeholderTextColor={props.placeholderTextColor}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        editable={props.editable}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <View
        style={[
          hasFocus ? styles.focusedTextInput : styles.borderText,
          props.style,
          props.error ? styles.errorTextInput : null,
        ]}
      />

      {props.errorMessage ? (
        <Text style={styles.error}>{props.errorMessage}</Text>
      ) : null}
    </View>
  );
}

UserInput.propTypes = {};
UserInput.defaultProps = {};

const styles = StyleSheet.create({
  textInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
  textInput: {
    fontSize: 16,
    color: Color.textColor,
    fontFamily: Font.primaryRegular,
  },
  borderText: {
    borderBottomColor: Color.borderColor,
    borderBottomWidth: 1,
  },
  focusedTextInput: {
    fontSize: 14,
    color: Color.gray,
    borderBottomColor: Color.colorPrimary,
    borderBottomWidth: 1,
  },

  errorTextInput: {
    fontSize: 14,
    color: Color.gray,
    borderBottomColor: Color.red,
    borderBottomWidth: 1,
  },

  error: {
    fontSize: 10,
    color: Color.red,
  },
});

export default UserInput;
