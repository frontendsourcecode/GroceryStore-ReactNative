import React, {Component} from 'react';
import {FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {Color, Dimension, Fonts} from '../theme';

import ToolBar from '../components/ToolBar';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-feather1s';
import BadgeIcon from '../components/BadgeIcon';
import BannerSlider from '../components/BannerSlider';
import Loading from '../components/Loading';
import {
    CategoryImage,
    getAllCategory,
    getNewProducts,
    getPopularProducts,
    ProductImage,
    searchProduct,
} from '../axios/ServerRequest';
import {getCart, getUserDetails, setCart} from '../utils/LocalStorage';
import ProductItem from '../components/ProductItem';
import Cart from '../utils/Cart';
import SearchBar from '../components/SearchBar';
import Offer1 from '../assets/images/offer1.jpg';
import Offer2 from '../assets/images/offer2.jpg';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            categoryData: [],
            popularProduct: [],
            newProduct: [],
            selected: false,
            cartCount: 0,
            cartList: [],
            showSearch: false,
            searchData: [],
            searchText: '',
        };
    }

    async componentDidMount() {
        this.reRenderSomething = this.props.navigation.addListener('focus', () => {
            this.init();
        });
    }

    init = async () => {
        console.log(await getUserDetails());
        this.fetchCategory();
        this.fetchNewProducts();
        this.fetchPopularProducts();
        let cart = await getCart();
        this.setState({searchProduct: [], showSearch: false});
        this.setState({
            cartList: await getCart(),
            cartCount: Cart.getTotalCartCount(cart),
        });
    };

    fetchCategory = () => {
        this.refs.loading.show();
        getAllCategory()
            .then(response => {
                console.log(response.data.categories);
                this.setState({categoryData: response.data.categories});
                this.refs.loading.close();
            })
            .catch(error => {
                console.log(error);
                this.refs.loading.close();
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
    fetchPopularProducts = () => {
        this.refs.loading.show();
        getPopularProducts()
            .then(response => {
                console.log(response.data.products);
                this.setState({popularProduct: response.data.products});
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
        this.setState({newProduct: this.state.newProduct});
        this.setState({popularProduct: this.state.popularProduct});
    };

    navigateToScreen = item => {
        this.props.navigation.navigate('ProductView', {
            screen: 'ProductView',
            params: {item: item},
        });
    };

    onchangeSearchText(text) {
        searchProduct(text)
            .then(response => {
                this.setState({searchData: response.data.products});
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderProductItem(item) {
        let cart = Cart.getItemCount(this.state.cartList, item);
        return (
            <ProductItem
                item={item}
                addToCart={this.addToCart}
                count={cart}
                onPress={() => {
                    this.navigateToScreen(item);
                }}
            />
        );
    }

    renderSearchProductItem(item) {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={{display: 'flex', flexDirection: 'row'}}
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({searchProduct: [], showSearch: false});
                        this.navigateToScreen(item);
                    }}>
                    <View style={{width: 50, height: 50}}>
                        <Image
                            source={{
                                uri: `${ProductImage + item.image}`,
                            }}
                            style={{height: 35, width: 35}}
                        />
                    </View>
                    <Text style={{fontSize: 16}}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.mainContainer}>
                    <AppStatusBar backgroundColor="#44C062" barStyle="light-content"/>
                    <ToolBar
                        title="Home"
                        icon="menu"
                        onPress={() => navigation.openDrawer()}>
                        <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={() => {
                                this.setState({showSearch: true});
                            }}>
                            <Icon name="search" size={24} color="#ffffff"/>
                        </TouchableOpacity>

                        <BadgeIcon
                            icon="shopping-cart"
                            count={this.state.cartCount}
                            onPress={() => {
                                navigation.navigate('MyCart');
                            }}
                        />
                    </ToolBar>

                    <ScrollView style={styles.scrollView}>
                        <View>
                            <BannerSlider/>
                            <View style={styles.categoryMainContainer}>
                                <View style={styles.categoryHeaderContainer}>
                                    <Text style={styles.title}>All Categories</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('Category');
                                        }}>
                                        <Text style={styles.subtitle}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}>
                                    {this.state.categoryData &&
                                    this.state.categoryData.slice(0, 7).map((item, index) => {
                                        return (
                                            <View
                                                style={styles.categoryDetailsContainer}
                                                key={index}>
                                                <TouchableOpacity
                                                    activeOpacity={1}
                                                    onPress={() => {
                                                        this.props.navigation.navigate('ProductView', {
                                                            screen: 'Products',
                                                            params: {item: item},
                                                        });
                                                    }}>
                                                    <View style={styles.categoryContainer}>
                                                        <Image
                                                            source={{
                                                                uri: `${CategoryImage + item.cateimg}`,
                                                            }}
                                                            style={{
                                                                height: 65,
                                                                width: 65,
                                                                resizeMode: 'cover',
                                                                borderRadius: 10,
                                                            }}
                                                        />
                                                    </View>
                                                    <Text style={styles.catTitle}>{item.categry}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                            <View style={{marginLeft: 20, marginTop: 20}}>
                                <Text style={styles.title}>New Products</Text>
                            </View>
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flatlist'}
                                data={this.state.newProduct}
                                renderItem={({item, index}) =>
                                    this.renderProductItem(item, index)
                                }
                                keyExtractor={item => item.id}
                                extraData={this.state}
                            />

                            <ScrollView
                                horizontal={true}>
                                <View
                                    style={{display: 'flex', flexDirection: 'row', padding: 10}}>

                                    <Image source={Offer1} style={{
                                        width: Dimension.window.width - 70,
                                        resizeMode: 'contain',
                                        borderRadius: 10,
                                    }}/>
                                    <Image source={Offer2} style={{
                                        width: Dimension.window.width - 70,
                                        resizeMode: 'contain',
                                        marginLeft: 20,
                                        borderRadius: 10,
                                    }}/>

                                </View>
                            </ScrollView>


                            <View style={{marginLeft: 20, marginTop: 20}}>
                                <Text style={styles.title}>Popular Products</Text>
                            </View>
                            <FlatList
                                style={{marginLeft: 10}}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                key={'flatlist1'}
                                data={this.state.popularProduct}
                                renderItem={({item, index}) =>
                                    this.renderProductItem(item, index)
                                }
                                keyExtractor={item => item.id}
                                extraData={this.state}
                            />
                        </View>
                    </ScrollView>
                </View>
                {this.state.showSearch ? (
                    <View style={styles.searchContainer}>
                        <SearchBar
                            onChangeText={text => this.onchangeSearchText(text)}
                            onClose={() => {
                                this.setState({showSearch: false, searchData: []});
                            }}
                            data={this.state.searchData}
                        />

                        <FlatList
                            key={'flatlist3'}
                            data={this.state.searchData}
                            renderItem={({item, index}) =>
                                this.renderSearchProductItem(item, index)
                            }
                            keyExtractor={item => item.id}
                            extraData={this.props}
                        />
                    </View>
                ) : null}

                <Loading ref="loading" indicatorColor={Color.colorPrimary}/>
            </View>
        );
    }
}

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

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
    categoryMainContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 20,
        flexDirection: 'column',
    },
    categoryHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    categoryContainer: {
        height: 75,
        width: 75,
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    categoryDetailsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },

    title: {
        fontFamily: Fonts.primarySemiBold,
        color: Color.black,
        fontSize: 14,
        marginLeft: 10,
    },
    subtitle: {
        fontFamily: Fonts.primarySemiBold,
        color: Color.gray,
        fontSize: 12,
        marginLeft: 10,
    },
    catTitle: {
        fontFamily: Fonts.primaryRegular,
        color: Color.black,
        fontSize: 12,
        width: 80,
        height: 35,
        textAlign: 'center',
        marginLeft: 10,
    },
    searchContainer: {
        marginTop: BAR_HEIGHT,
        width: '100%',
        backgroundColor: '#ffffff',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    itemContainer: {
        marginTop: 10,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});

export default HomeScreen;
