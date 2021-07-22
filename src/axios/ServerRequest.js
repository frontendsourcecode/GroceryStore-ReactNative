import API, {BASE_URL} from './API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {getToken} from '../utils/LocalStorage';

export const CategoryImage = BASE_URL + 'assets/images/ProductImage/category/';
export const ProductImage = BASE_URL + 'assets/images/ProductImage/product/';

export const checkInternetConnection = () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === false) {
      Toast.showWithGravity(
        'No internet connection',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  });
};

export const userLogin = async (mobile, password) => {
  const body = {
    mobile: mobile,
    password: password,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/login',
    data: body,
  }).then(res => {
    return res;
  });
};

export const userRegister = async (name, mobile, password) => {
  const body = {
    fname: name,
    lname: '',
    mobile: mobile,
    password: password,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/register',
    data: body,
  }).then(res => {
    return res;
  });
};
export const getAllCategory = async () => {
  return await API({
    method: 'POST',
    url: 'api/v1/allcategory',
    data: {token: await getToken()},
  }).then(res => {
    return res;
  });
};
export const getNewProducts = async () => {
  return await API({
    method: 'POST',
    url: 'api/v1/newProduct',
    data: {token: await getToken()},
  }).then(res => {
    return res;
  });
};
export const getPopularProducts = async () => {
  return await API({
    method: 'POST',
    url: 'api/v1/homepage',
    data: {token: await getToken()},
  }).then(res => {
    return res;
  });
};

export const getProductList = async categoryName => {
  return await API({
    method: 'POST',
    url: 'api/v1/getlist',
    data: {token: await getToken(), categry: categoryName},
  }).then(res => {
    return res;
  });
};

export const updateUser = async user => {
  return await API({
    method: 'POST',
    url: 'api/v1/updateUser',
    data: user,
  }).then(res => {
    return res;
  });
};
export const searchProduct = async text => {
  return await API({
    method: 'GET',
    url: `api/v1/product/search?s=${text}`,
  }).then(res => {
    return res;
  });
};

export const orderPlace = async orderDetails => {
  return await API({
    method: 'Post',
    url: 'api/v1/placeorder',
    data: orderDetails,
  }).then(res => {
    return res;
  });
};
export const getOrderDetails = async (token, id) => {
  return await API({
    method: 'Post',
    url: 'api/v1/orderDetails',
    data: {
      token: token,
      user_id: id,
    },
  }).then(res => {
    return res;
  });
};

export const forgotPassword = async mobile => {
  const body = {
    mobile: mobile,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/forgot_password',
    data: body,
  }).then(res => {
    return res;
  });
};

export const resetPassword = async (otp, password) => {
  const body = {
    otp: otp,
    password: password,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/reset_password',
    data: body,
  }).then(res => {
    return res;
  });
};
