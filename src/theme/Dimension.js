import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  headerText: 20,
  headerheight: 50,
  title: 20,
  textInputHeight: 40,
};
