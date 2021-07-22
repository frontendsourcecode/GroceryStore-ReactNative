import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Button,
} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';

import ToolBar from '../components/ToolBar';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import BadgeIcon from '../components/BadgeIcon';
import BannerSlider from '../components/BannerSlider';
import {getProductList} from '../axios/ServerRequest';
import {getUserDetails, getCart, setCart} from '../utils/LocalStorage';
import ProductRow from '../components/ProductItem/ProductRow';
import Cart from '../utils/Cart';
import Loading from '../components/Loading';
import EmptyProduct from '../assets/images/emptyproduct.png';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      products: [],
      selected: false,
      cartCount: 0,
      cartList: [],
      category: '',
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    this.fetchProductsList(this.props.route.params.item.categry);
    let cart = await getCart();

    this.setState({
      cartList: await getCart(),
      cartCount: Cart.getTotalCartCount(cart),
      category: this.props.route.params.item.categry,
    });
  };

  fetchProductsList = category => {
    this.refs.loading.show();

    getProductList(category)
      .then(response => {
        console.log(response.data.products);
        this.setState({products: response.data.products});
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
    this.props.navigation.navigate('ProductView', {item: item});
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
          title={this.state.category}
          icon="arrow-left"
          onPress={() => navigation.goBack()}>
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
            data={this.state.products}
            renderItem={({item, index}) => this.renderProductItem(item, index)}
            keyExtractor={item => item.id}
            extraData={this.state}
          />
          {this.state.products.length == 0 ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View style={styles.imgContainerStyle}>
                <Image style={styles.imageStyle} source={EmptyProduct} />
              </View>
              <Text style={styles.title}>Empty Product</Text>
            </View>
          ) : null}
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
  imgContainerStyle: {
    height: 250,
    width: 250,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    resizeMode: 'center',
  },
  title: {
    color: Color.gray,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 20,
    marginBottom: 10,
  },
});

export default ProductsScreen;
