import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';
import ToolBar from '../components/ToolBar';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {getCart} from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import Loading from '../components/Loading';

import {
  getAllCategory,
  CategoryImage,
  ProductImage,
} from '../axios/ServerRequest';
class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
      category: [],
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    let cart = await getCart();
    this.fetchCategory();
    this.setState({
      cartCount: Cart.getTotalCartCount(cart),
    });
  };

  fetchCategory = () => {
    this.refs.loading.show();

    getAllCategory()
      .then(response => {
        console.log(response.data.categories);
        this.setState({category: response.data.categories});
        this.refs.loading.close();
      })
      .catch(error => {
        console.log(error);
        this.refs.loading.close();
      });
  };

  renderCategoryItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.props.navigation.navigate('ProductView', {
            screen: 'Products',
            params: {item: item},
          });
        }}>
        <View style={styles.categoryItem}>
          <Image
            source={{
              uri: `${CategoryImage + item.cateimg}`,
            }}
            style={{height: 45, width: 45}}
          />
          <Text style={styles.title}>{item.categry}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <AppStatusBar
          backgroundColor={Color.colorPrimary}
          barStyle="light-content"
        />
        <ToolBar
          title="Category"
          icon="menu"
          onPress={() => navigation.openDrawer()}>
          <BadgeIcon
            icon="shopping-cart"
            count={this.state.cartCount}
            onPress={() => {
              navigation.navigate('MyCart');
            }}
          />
        </ToolBar>

        <FlatList
          data={this.state.category}
          renderItem={({item, index}) => this.renderCategoryItem(item, index)}
          keyExtractor={item => item.id}
        />
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
    padding: 20,
  },
  categoryItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: Color.white,
    borderRadius: 15,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 16,
  },
});
export default CategoryScreen;
