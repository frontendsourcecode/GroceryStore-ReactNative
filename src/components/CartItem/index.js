import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Color, Fonts, Strings, Dimension} from '../../theme';
import {ProductImage} from '../../axios/ServerRequest';
import Icon from 'react-native-feather1s';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import AppStatusBar from '../../components/AppStatusBar';
import ToolBar from '../../components/ToolBar';
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      count: this.props.count ? this.props.count : 0,
      cart: null,
      totalPrice: 0,
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

  render() {
    const {item, count} = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.box2}>
            <View>
              <Image
                style={styles.productImage}
                source={{
                  uri: `${ProductImage + item.image}`,
                }}
              />
            </View>
            <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.attribute}>
                {' '}
                {item.attribute + ' - ' + item.currency + ' ' + item.price}
              </Text>
              <View style={styles.quantitContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      count: this.state.count - 1,
                    });
                    this.setCart(
                      item,
                      item.id,
                      this.state.count - 1,
                      item.price,
                    );
                  }}>
                  <Icon name="minus" size={20} color={Color.red} />
                </TouchableOpacity>
                <Text style={styles.quantityCount}>
                  {count +
                    '*' +
                    item.price +
                    ' = ' +
                    item.currency +
                    ' ' +
                    count * item.price}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      count: this.state.count + 1,
                    });
                    this.setCart(
                      item,
                      item.id,
                      this.state.count + 1,
                      item.price,
                    );
                  }}>
                  <Icon name="plus" size={20} color={Color.colorPrimary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.deleteBtn}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  count: 0,
                });
                this.setCart(item, item.id, 0, item.price);
              }}>
              <Icon name="trash-2" size={20} color={Color.red} />
            </TouchableOpacity>
          </View>
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
  mainContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    width: '100%',
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
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
    color: Color.titleColor,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 10,
  },
  quantityCount: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.black,
    marginLeft: 10,
    marginRight: 10,
  },
  attribute: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 14,
    color: Color.colorPrimary,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
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
    height: 70,
    width: 70,
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
  quantitContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
  },

  addToCartText: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    color: Color.white,
  },
  box2: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusBtn: {
    padding: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 999,
  },
});
export default ProductItem;
