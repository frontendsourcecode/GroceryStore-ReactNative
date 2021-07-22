import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Color, Fonts, Strings, Dimension} from '../../theme';
import {ProductImage} from '../../axios/ServerRequest';
import Icon from 'react-native-feather1s';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      count: this.props.count ? this.props.count : 0,
      cart: null,
    };
  }

  setCart = (item, id, value, price) => {
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * value,
    };
    this.setState(
      {
        cart: cart,
      },
      () => {
        this.props.addToCart(this.state.cart);
      },
    );
  };

  onItemClicked = item => {
    this.props.navi;
  };

  render() {
    const {item, count, navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View style={styles.innerContainer}>
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
              <Image
                style={styles.productImage}
                source={{
                  uri: `${ProductImage + item.image}`,
                }}
              />
              <Text style={styles.title}>{item.name}</Text>

              <Text style={styles.option}>
                {item.attribute + ' - ' + item.currency + ' ' + item.price}
              </Text>
            </TouchableOpacity>
          </View>
          {count > 0 ? (
            <View style={styles.quantity}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.plusBtn}
                onPress={() => {
                  this.setState({
                    count: this.state.count - 1,
                  });
                  this.setCart(item, item.id, this.state.count - 1, item.price);
                }}>
                <Icon name="minus" size={20} color={Color.red} />
              </TouchableOpacity>
              <Text style={styles.counter}>{count}</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.plusBtn}
                onPress={() => {
                  this.setState({
                    count: this.state.count + 1,
                  });
                  this.setCart(item, item.id, this.state.count + 1, item.price);
                }}>
                <Icon name="plus" size={18} color={Color.colorPrimary} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.addToCart}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setState({count: this.state.count + 1});
                  this.setCart(item, item.id, this.state.count + 1, item.price);
                }}>
                <Text style={styles.addToCartText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.box2}>
          <TouchableOpacity activeOpacity={1} style={styles.favoriteContainer}>
            <Icon name="heart" size={24} color={Color.colorPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ProductItem.propTypes = {
  addToCart: PropTypes.func,
  item: PropTypes.object,
  count: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: 220,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.black,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 35,
  },
  counter: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
    color: Color.black,
    textAlign: 'center',
    width: 30,
  },
  option: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.red,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  productImage: {
    height: 100,
    width: 100,
    resizeMode:'cover'
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Color.white,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    color: Color.white,
  },
  box2: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 30,
    height: 30,
  },
  plusBtn: {
    padding: 10,
  },
});
export default ProductItem;
