import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';
import ToolBar from '../components/ToolBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';

import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import {ProductImage} from '../axios/ServerRequest';
import {
  getProductItem,
  getCart,
  setCart,
  setProductItem,
} from '../utils/LocalStorage';
class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
      productItem: null,
      count: 0,
      cart: null,
      itemIndex: -1,
    };
  }
  async componentDidMount() {
    let cart = await getCart();
    let item = null;
    if (this.props.route.params !== undefined) {
      item = this.props.route.params.item;
    }

    let cartCount = Cart.getTotalCartCount(cart);
    let productIndex = Cart.isProductExist(cart, item);
    let count = Cart.getItemCount(cart, item);
    this.setState({
      productItem: item,
      cartCount: cartCount,
      itemIndex: productIndex,
      cart: cart,
      count: count,
    });
  }

  setToCart = (item, id, value, price) => {
    let cart = {
      count: value,
      id: id,
      item: item,
      subTotal: parseFloat(price) * value,
    };
    this.addToCart(cart);
  };

  addToCart = async params => {
    const {cart, itemIndex} = this.state;
    let cartListData = cart !== null ? cart : [];

    if (itemIndex === -1) {
      cartListData.push(params);
    } else {
      if (params.count > 0) {
        cartListData[itemIndex] = params;
      } else {
        let filterData = cartListData.filter(item => item.id !== params.id);
        cartListData = filterData;
      }
    }
    console.log(cartListData);
    let totalCount = Cart.getTotalCartCount(cartListData);
    this.setState({
      cartCount: totalCount,
      cart: cartListData,
    });
    setCart(cartListData);
    //this.resetData();
  };

  render() {
    const {navigation} = this.props;
    const {productItem, isProductExist, count} = this.state;
    console.log(this.state.cart);
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="ProductView"
          icon="arrow-left"
          onPress={() => navigation.goBack()}>
          <BadgeIcon
            icon="shopping-cart"
            count={this.state.cartCount}
            onPress={() => {
              navigation.navigate('MyCart');
            }}
          />
        </ToolBar>
        {productItem !== undefined && productItem !== null ? (
          <ScrollView style={styles.scrollView}>
            <View style={styles.imageContainer}>
              <View>
                <Image
                  style={styles.productImage}
                  source={{
                    uri: `${ProductImage + productItem.image}`,
                  }}
                />
              </View>

              <View style={styles.box2}>
                <TouchableOpacity style={styles.favoriteContainer}>
                  <Icon name="heart" size={20} color={Color.colorPrimary} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.option}>
                {productItem.attribute +
                  ' - ' +
                  productItem.currency +
                  ' ' +
                  productItem.price}
              </Text>
              <Text style={styles.title}>{productItem.name}</Text>
              <Text style={styles.description}>{productItem.description}</Text>
              {count > 0 ? (
                <View style={styles.quantity}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.plusBtn}
                    onPress={() => {
                      this.setState({
                        count: count - 1,
                      });
                      this.setToCart(
                        productItem,
                        productItem.id,
                        count - 1,
                        productItem.price,
                      );
                    }}>
                    <Icon name="minus" size={20} color={Color.red} />
                  </TouchableOpacity>
                  <Text style={styles.counter}>{count}</Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.plusBtn}
                    onPress={() => {
                      this.setState({
                        count: count + 1,
                      });
                      this.setToCart(
                        productItem,
                        productItem.id,
                        count + 1,
                        productItem.price,
                      );
                    }}>
                    <Icon name="plus" size={18} color={Color.colorPrimary} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.addToCart}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.setState({
                        count: count + 1,
                      });
                      this.setToCart(
                        productItem,
                        productItem.id,
                        count + 1,
                        productItem.price,
                      );
                    }}>
                    <Text style={styles.addToCartText}>Add To Cart</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
  },
  imageContainer: {
    display: 'flex',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  productImage: {
    height: 200,
    width: 200,
  },
  box2: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 20,
    height: 20,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 16,
    color: Color.gray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    marginTop: 20,
  },
  description: {
    fontFamily: Fonts.primaryRegular,
    fontSize: 14,
    color: Color.gray,
    textAlign: 'center',
    marginTop: 20,
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
    fontSize: 16,
    color: Color.colorPrimary,
  },
  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    color: Color.white,
  },
  plusBtn: {
    padding: 10,
  },
  addToCart: {
    backgroundColor: Color.colorPrimary,
    color: Color.white,
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    marginTop: 20,
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
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 20,
  },
});

export default ProductView;
