import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Color, Fonts, Strings, Dimension} from '../../theme';
import {ProductImage} from '../../axios/ServerRequest';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {item, count, subTotal} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={{width: 70, marginLeft: 10, flex: 0.3}}>
            <Image
              style={styles.productImage}
              source={{
                uri: `${ProductImage + item.image}`,
              }}
            />
          </View>
          <View style={{flex: 0.7}}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.option}>
              {item.attribute + ' - ' + item.currency + ' ' + item.price}
            </Text>
            <Text style={styles.title}>
              {count}X{item.currency + ' ' + item.price}=
              {item.currency + ' ' + subTotal}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    height: 130,
    flex: 1,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  box1: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.gray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 10,

    height: 40,
    width: Dimension.window.width - 150,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.red,
    marginLeft: 10,
    marginRight: 10,
  },
  productImage: {
    height: 70,
    width: 70,
  },
});
