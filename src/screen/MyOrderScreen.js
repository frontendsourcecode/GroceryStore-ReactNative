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
import {getUserDetails} from '../utils/LocalStorage';
import BadgeIcon from '../components/BadgeIcon';
import Cart from '../utils/Cart';
import Logo from '../components/Logo';
import OrderItem from '../components/ProductItem/OrderItem';
import {Picker} from '@react-native-community/picker';
import {getOrderDetails} from '../axios/ServerRequest';
import Loading from '../components/Loading';
class MyOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      orderList: [],
    };
  }

  async componentDidMount() {
    this.reRenderSomething = this.props.navigation.addListener('focus', () => {
      this.init();
    });
  }
  init = async () => {
    let userDetails = await getUserDetails();
    this.setState({
      user: userDetails,
    });

    this.getOrders();
  };

  getOrders = () => {
    const {user} = this.state;
    this.refs.loading.show();

    getOrderDetails(user.token, user.id)
      .then(response => {
        console.log(response);
        let data = response.data;
        if (data.code === 200) {
          this.setState({orderList: data.orders});
        }
        this.refs.loading.close();
      })
      .catch(error => {
        console.log(error);
        this.refs.loading.close();
      });
  };

  renderOrderItem(item) {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        <View style={styles.orderItemContainer}>
          <Text style={styles.title}>#{item.id}</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.title}>Order Date : </Text>
            <Text style={styles.subTitle}>{item.date}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.title}>Totla Amount : </Text>
            <Text style={styles.subTitle}>{item.total}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.title}>Order Status : </Text>
            <Text style={[styles.subTitle, {color: Color.colorPrimaryDark}]}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <AppStatusBar
            backgroundColor={Color.colorPrimary}
            barStyle="light-content"
          />
          <ToolBar
            title="My Orders"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          <FlatList
            key={'flatlist'}
            data={this.state.orderList}
            renderItem={({item, index}) => this.renderOrderItem(item, index)}
            keyExtractor={item => item.id}
            extraData={this.state}
          />
        </View>
        <Loading ref="loading" indicatorColor={Color.colorPrimary} />
      </View>
    );
  }
}

export default MyOrderScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.backgroundColor,
  },
  box1: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  orderItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Fonts.primaryRegular,
    color: Color.gray,
  },
});
