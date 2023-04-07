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

import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BadgeIcon from '../components/BadgeIcon';
import BannerSlider from '../components/BannerSlider';
import {
  getProductByCategory,
  getProductBySubCategory,
  getProductList,
} from '../axios/ServerRequest';
import {getUserDetails, getCart, setCart} from '../utils/LocalStorage';
import ProductRow from '../components/ProductItem/ProductRow';
import Cart from '../utils/Cart';
import Loading from '../components/Loading';
import EmptyProduct from '../assets/images/emptyproduct.png';
import DummyImage from '../assets/images/image.png';

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      subcategoryData: [],
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
    // this.fetchProductsList(this.props.route.params.item.category);
    let cart = await getCart();

    console.log('Category===================>', this.props.route.params.item);

    this.setState({
      cartList: cart,
      cartCount: Cart.getTotalCartCount(cart),
      category: this.props.route.params.item.category,
      subcategoryData: this.props.route.params.item.subCategory,
    });

    if (
      this.props.route.params.item.subCategory &&
      this.props.route.params.item.subCategory.length > 0
    ) {
      this.fetchProductBySubCategory(
        this.props.route.params.item.subCategory[0].id,
      );
    } else {
      this.fetchProductByCategory(this.props.route.params.item.id);
    }
  };

  fetchProductBySubCategory = async id => {
    this.refs.loading.show();
    await getProductBySubCategory(id)
      .then(res => {
        console.log(res.data);
        this.setState({products: res.data.products});
        this.refs.loading.close();
      })
      .catch(err => {
        console.log(err);
        this.refs.loading.close();
      });
  };
  fetchProductByCategory = async id => {
    this.refs.loading.show();
    await getProductByCategory(id)
      .then(res => {
        console.log(res.data);
        this.setState({products: res.data.products});
        this.refs.loading.close();
      })
      .catch(err => {
        console.log(err);
        this.refs.loading.close();
      });
  };

  // fetchProductsList = category => {
  //   this.refs.loading.show();

  //   getProductList(category)
  //     .then(response => {
  //       console.log(response.data.products);
  //       this.setState({products: response.data.products});
  //       this.refs.loading.close();
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.refs.loading.close();
  //     });
  // };

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

  renderSubcategoryItem(item) {
    return (
      <TouchableOpacity
        style={{marginTop: 10}}
        onPress={() => {
          this.fetchProductBySubCategory(item.id);
        }}>
        <View style={styles.card}>
          <Image style={{height: 40, width: 40}} source={DummyImage} />
          <Text style={{fontSize: 10}} numberOfLines={2} ellipsizeMode="tail">
            {item.sub_category_title}
          </Text>
        </View>
      </TouchableOpacity>
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
        <View style={{marginBottom: 100}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                width: 90,
                backgroundColor: '#f2f2f2',
                height: Dimension.window.height,
                padding: 2,
                alignItems: 'center',
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.subcategoryData}
                renderItem={({item, index}) =>
                  this.renderSubcategoryItem(item, index)
                }
                keyExtractor={item => item.id}
                extraData={this.state}
              />
            </View>
            <View style={{flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.products}
                renderItem={({item, index}) =>
                  this.renderProductItem(item, index)
                }
                keyExtractor={item => item.id}
                extraData={this.state}
              />
            </View>
          </View>

          {/* <FlatList
            showsVerticalScrollIndicator={false}
            key={'flatlist1'}
            data={this.state.products}
            renderItem={({item, index}) => this.renderProductItem(item, index)}
            keyExtractor={item => item.id}
            extraData={this.state}
          /> */}
          {/* {this.state.products.length == 0 ? (
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
          ) : null} */}
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
  card: {
    width: 70,
    height: 70,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsScreen;
