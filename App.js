import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import ForgotPasswordScreen from './src/screen/ForgotPasswordScreen';
import OTPScreen from './src/screen/OTPScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import CategoryScreen from './src/screen/CategoryScreen';
import OffersScreen from './src/screen/OffersScreen';
import NewProductScreen from './src/screen/NewProductScreen';
import PopularProductScreen from './src/screen/PopularProductScreen';
import ProductsScreen from './src/screen/ProductsScreen';
import AddressScreen from './src/screen/AddressScreen';
import ProductView from './src/screen/ProductView';
import PlaceOrder from './src/screen/PlaceOrder';
import ThankYou from './src/screen/ThankYou';
import MyCartScreen from './src/screen/MyCartScreen';
import MyOrder from './src/screen/MyOrderScreen';
import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';


const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const ProductStack = createStackNavigator();
const Drawer = createDrawerNavigator();

global.currentScreenIndex = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createDrawer = () => (
    <Drawer.Navigator
      initialRouteName="Home"
      contentOptions={(activeTintColor = 'red')}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="Offers" component={OffersScreen} />
      <Drawer.Screen name="NewProducts" component={NewProductScreen} />
      <Drawer.Screen name="PopularProducts" component={PopularProductScreen} />
      <Drawer.Screen name="MyCart" component={MyCartScreen} />
      <Drawer.Screen name="MyOrder" component={MyOrder} />
    </Drawer.Navigator>
  );

  MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </MainStack.Navigator>
  );
  ProductStackScreen = () => (
    <ProductStack.Navigator
      initialRouteName="ProductView"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <ProductStack.Screen name="ProductView" component={ProductView} />
      <ProductStack.Screen name="Products" component={ProductsScreen} />
      <ProductStack.Screen name="Address" component={AddressScreen} />
      <ProductStack.Screen name="PlaceOrder" component={PlaceOrder} />
      <ProductStack.Screen name="ThankYou" component={ThankYou} />
    </ProductStack.Navigator>
  );

  RootStackScreen = () => (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <RootStack.Screen name="Main" component={this.MainStackScreen} />
      <RootStack.Screen
        name="ProductView"
        component={this.ProductStackScreen}
      />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="OTP" component={OTPScreen} />
      <RootStack.Screen
        name="ForgetPassword"
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen name="HomeScreen" children={this.createDrawer} />
    </RootStack.Navigator>
  );

    async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners();

    }

    // componentWillUnmount() {
    //   this.notificationListener;
    //   this.notificationOpenedListener;
    // }

    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    getToken = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        // let fcmToken = await getFcmKey;
        console.log('1', fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();

            if (fcmToken) {
                // user has a device token
                console.log('fcmToken:', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
                //setFcmKey('fcmToken');
            }
        }
        console.log('fcmToken:', fcmToken);
    };

    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    }

    async createNotificationListeners() {
        /*
         * Triggered when a particular notification has been received in foreground
         * */
        this.notificationListener = firebase
            .notifications()
            .onNotification(notification => {
                const {title, body} = notification;
                console.log('onNotification:');

                const localNotification = new firebase.notifications.Notification({
                    // sound: 'sampleaudio',
                    show_in_foreground: true,
                })
                    // .setSound('sampleaudio.wav')
                    .setNotificationId(notification.notificationId)
                    .setTitle(notification.title)
                    .setBody(notification.body)
                    .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
                    .android.setSmallIcon('@mipmap/ic_launcher_round') // create this icon in Android Studio
                    .android.setColor('#000000') // you can set a color here
                    .android.setPriority(firebase.notifications.Android.Priority.High);

                firebase
                    .notifications()
                    .displayNotification(localNotification)
                    .catch(err => console.error(err));
            });

        const channel = new firebase.notifications.Android.Channel(
            'fcm_FirebaseNotifiction_default_channel',
            'Demo app name',
            firebase.notifications.Android.Importance.High,
        ).setDescription('Demo app description');
        // .setSound('sampleaudio.wav');
        firebase.notifications().android.createChannel(channel);

        /*
         * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
         * */
        this.notificationOpenedListener = firebase
            .notifications()
            .onNotificationOpened(notificationOpen => {
                const {title, body} = notificationOpen.notification;
                console.log('onNotificationOpened:');
                // Alert.alert(title, body);
            });

        /*
         * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
         * */
        const notificationOpen = await firebase
            .notifications()
            .getInitialNotification();
        if (notificationOpen) {
            const {title, body} = notificationOpen.notification;
            console.log('getInitialNotification:');
            // Alert.alert(title, body);
        }
        /*
         * Triggered for data only payload in foreground
         * */
        this.messageListener = firebase.messaging().onMessage(message => {
            //process data message
            console.log('JSON.stringify:', JSON.stringify(message));
        });
    }
  render() {
    return <NavigationContainer>{this.RootStackScreen()}</NavigationContainer>;
  }
}

export default App;
