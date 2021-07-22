import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';
import ToolBar from '../components/ToolBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import {getUserDetails, getCart, setCart} from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import Logo from '../components/Logo';
import OrderItem from '../components/ProductItem/OrderItem';
import {Picker} from '@react-native-community/picker';
import {orderPlace} from '../axios/ServerRequest';
import Loading from '../components/Loading';

class PlaceOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cartList: [],
      totalPrice: '',
      paymentMethod: 'Cash on Delivery',
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    let cart = await getCart();
    let userDetails = await getUserDetails();
    let totalPrice = cart.reduce((accum, item) => accum + item.subTotal, 0);

    this.setState({
      cartCount: Cart.getTotalCartCount(cart),
      cartList: cart,
      user: userDetails,
      totalPrice: totalPrice,
    });
  };

  onPlaceOrder = () => {
    this.refs.loading.show();
    const {user, cartList, totalPrice} = this.state;
    let orderitems = [];
    for (let i = 0; i < cartList.length; i++) {
      orderItem = {
        id: cartList[i].item.id,
        itemname: cartList[i].item.name,
        itemquantity: cartList[i].count,
        attribute: cartList[i].item.attribute,
        currency: cartList[i].item.currency,
        itemImage: cartList[i].item.image,
        itemprice: cartList[i].item.price,
        itemtotal: cartList[i].subTotal,
      };
      orderitems.push(orderItem);
    }

    let orderDetails = {
      token: user.token,
      fname: user.fname,
      lname: '',
      mobile: user.mobile,
      area: user.city,
      address: ` ${user.address},  ${user.city},  ${user.state}- ${user.zip}`,
      user_id: user.id,
      orderitems: orderitems,
    };
    console.log(orderDetails);

    orderPlace(orderDetails)
      .then(response => {
        let data = response.data;
        console.log(response);
        if (data.code === 200) {
          setCart(null);
          this.props.navigation.navigate('ThankYou');
          this.refs.loading.close();
        }
      })
      .catch(error => {
        console.log(error);
        this.refs.loading.close();
      });
  };

  renderCartItem(item) {
    return (
      <OrderItem item={item.item} count={item.count} subTotal={item.subTotal} />
    );
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="Place Order"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          <ScrollView style={{paddingBottom: 200}}>
            <FlatList
              key={'flatlist'}
              data={this.state.cartList}
              renderItem={({item, index}) => this.renderCartItem(item, index)}
              keyExtractor={item => item.id}
              extraData={this.state}
            />
            <View style={styles.amountContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>SubTotal : </Text>
                <Text style={styles.title}>{this.state.totalPrice}</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Shipping Charges : </Text>
                <Text style={styles.title}>0.0</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 2,
                  backgroundColor: '#eeeeee',
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  marginBottom: 10,
                }}>
                <Text style={styles.title}>Total Amount : </Text>
                <Text style={styles.title}>{this.state.totalPrice}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.box2}>
          <View style={styles.paymentContainer}>
            <View style={{width: '50%'}}>
              <View
                style={{backgroundColor: Color.white, color: Color.primary}}>
                <Picker
                  selectedValue={this.state.paymentMethod}
                  style={{height: 50, width: '100%'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({paymentMethod: itemValue})
                  }>
                  <Picker.Item
                    label="Cash on Delivery"
                    value="Cash on Delivery"
                  />
                  <Picker.Item label="Online payment" value="Online payment" />
                </Picker>
              </View>
            </View>
            <View style={{width: '50%'}}>
              <TouchableOpacity
                style={styles.checkout_container}
                onPress={() => this.onPlaceOrder()}>
                <Text style={styles.checkout}>
                  Pay - {this.state.totalPrice}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.backgroundColor,
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: Color.white,
    flexDirection: 'column',
    padding: 20,
    flexGrow: 1,
  },
  bottomImage: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 80,
    zIndex: 1,
    flex: 1,
    opacity: 0.5,
    justifyContent: 'flex-end',
  },
  userRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Color.graylight,
    margin: 10,
  },
  amountContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    backgroundColor: '#ffffff',
    marginBottom: 180,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.primaryRegular,
  },
  box2: {
    width: Dimension.window.width,
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: Color.colorPrimary,
    display: 'flex',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  paymentContainer: {
    flexDirection: 'row',
    flexDirection: 'row',
  },
  total_price: {
    height: 50,
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: Color.white,
    color: Color.colorPrimary,
  },
  checkout_container: {
    textAlign: 'center',
    height: 50,
    backgroundColor: Color.colorPrimary,
    color: Color.white,
  },
  checkout: {
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: Color.white,
  },
});

export default PlaceOrder;
