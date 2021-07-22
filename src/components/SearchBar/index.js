import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import UserInput from '../../components/UserInput';
import {Color, Fonts, Strings, Dimension} from '../../theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import {CategoryImage} from '../../axios/ServerRequest';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <UserInput
            placeholder={Strings.searchHint}
            containerStyle={styles.containerStyle}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
          />
          <TouchableOpacity onPress={this.props.onClose}>
            <Icon name="x" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  containerStyle: {
    width: '93%',
    height: 45,
  },

  itemContainer: {
    marginTop: 10,
  },
});
