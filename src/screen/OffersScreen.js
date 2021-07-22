import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Fonts, Strings, Dimension} from '../theme';
import ToolBar from '../components/ToolBar';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {getCart} from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
class OffersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
      offer: [
        {
          id: 1,
          image:
            'https://images.financialexpress.com/2018/02/jio_cashback_offer.jpg',
        },
        {
          id: 2,
          image:
            'https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2018/11/01/58125-paytm-sale.jpg?itok=lJh9ZYIg',
        },
        {
          id: 3,
          image:
            'https://www.themobileindian.com/public/thumbs/news/2018/10/23967/paytm_425_735.jpg',
        },
        {id: 4, image: 'https://pbs.twimg.com/media/DMOxAQeUEAE9s5a.jpg'},
        {
          id: 5,
          image:
            'https://www.goindigo.in/content/dam/indigov2/6e-website/header/campaigns/2019/09/Federal-Bank-Cashback-offer-Responsive-landing-page-banner-new.jpg',
        },
      ],
    };
  }

  async componentDidMount() {
    this.init();
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }

  init = async () => {
    let cart = await getCart();

    this.setState({
      cartCount: Cart.getTotalCartCount(cart),
    });
  };

  renderOfferItem = (item, index) => {
    return (
      <View style={styles.offerItem}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.cover}
        />
      </View>
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
          title="Offer"
          icon="menu"
          onPress={() => navigation.openDrawer()}>
          <BadgeIcon icon="shopping-cart" count={this.state.cartCount} />
        </ToolBar>

        <FlatList
          data={this.state.offer}
          renderItem={({item, index}) => this.renderOfferItem(item, index)}
          keyExtractor={item => item.id}
        />
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

  offerItem: {
    display: 'flex',
    maxHeight: 200,
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
});
export default OffersScreen;
