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
import BadgeIcon from '../components/BadgeIcon';
import BannerSlider from '../components/BannerSlider';
import {getNewProducts} from '../axios/ServerRequest';
import {getUserDetails, getCart, setCart} from '../utils/LocalStorage';
import ProductRow from '../components/ProductItem/ProductRow';
import Cart from '../utils/Cart';
import Loading from '../components/Loading';

class NewProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      popularProduct: [],
      newProduct: [],
      selected: false,
      cartCount: 0,
      cartList: [],
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    this.fetchNewProducts();
    let cart = await getCart();

    this.setState({
      cartList: await getCart(),
      cartCount: Cart.getTotalCartCount(cart),
    });
  };

  fetchNewProducts = () => {
    this.refs.loading.show();

    getNewProducts()
      .then(response => {
        console.log(response.data.products);
        this.setState({newProduct: response.data.products});
        this.refs.loading.close();
      })
      .catch(error => {
        console.log(error);
        this.refs.loading.close();
      });
  };

  addToCart = async params => {
    let cart = await getCart();
    let cartListData = cart !== null ? cart : [];
    let itemIndex = Cart.isProductExist(cartListData, params);
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
      cartList: cartListData,
      selected: !this.state.selected,
    });
    setCart(cartListData);
    //this.resetData();
  };
  resetData = () => {
    this.setState({popularProduct: this.state.popularProduct});
  };

  navigateToScreen = item => {
    this.props.navigation.navigate('ProductView', {
      screen: 'ProductView',
      params: {item: item},
    });
  };

  renderProductItem(item) {
    let cart = Cart.getItemCount(this.state.cartList, item);
    return (
      <ProductRow
        item={item}
        addToCart={this.addToCart}
        count={cart}
        onPress={() => {
          this.navigateToScreen(item);
        }}
      />
    );
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.mainContainer}>
        <AppStatusBar backgroundColor="#44C062" barStyle="light-content" />
        <ToolBar
          title="Popular Product"
          icon="menu"
          onPress={() => navigation.openDrawer()}>
          <TouchableOpacity style={{marginRight: 10}}>
            <Icon name="search" size={24} color="#ffffff" />
          </TouchableOpacity>

          <BadgeIcon
            icon="shopping-cart"
            count={this.state.cartCount}
            onPress={() => {
              navigation.navigate('MyCart');
            }}
          />
        </ToolBar>
        <View style={{paddingLeft: 10, paddingRight: 10, marginBottom: 100}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            key={'flatlist1'}
            data={this.state.newProduct}
            renderItem={({item, index}) => this.renderProductItem(item, index)}
            keyExtractor={item => item.id}
            extraData={this.state}
          />
        </View>
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
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
    backgroundColor: Color.white,
    flexDirection: 'column',
  },
});

export default NewProductScreen;
