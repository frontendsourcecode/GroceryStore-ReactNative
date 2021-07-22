import {Platform, Dimensions} from 'react-native';

const statusBarHeight = 55;
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => Math.round((width / guidelineBaseWidth) * size);
const verticalScale = size => Math.round((height / guidelineBaseHeight) * size);
const moderateScale = (size, factor = 0.5) =>
  Math.round(size + (scale(size) - size) * factor);

const indent = moderateScale(16);
const halfIndent = moderateScale(indent / 2);
const doubleIndent = moderateScale(indent * 2);
const tripleIndent = moderateScale(indent * 3);
const fourIndent = moderateScale(indent * 4);
const sixIndent = moderateScale(indent * 6);

const verticalIndent = verticalScale(indent);
const halfVerticalIndent = verticalScale(indent / 2);

const borderRadius = 4;

const iconSize = moderateScale(28);
const bigIconSize = moderateScale(40);
const iconMargin = Platform.OS === 'android' ? 16 : 10;

export default {
  window: {
    width,
    height,
  },
  statusBarHeight,
  scale,
  verticalScale,
  moderateScale,
  indent,
  halfIndent,
  doubleIndent,
  tripleIndent,
  fourIndent,
  sixIndent,
  verticalIndent,
  halfVerticalIndent,
  borderRadius,
  iconSize,
  bigIconSize,
  iconMargin,
  isSmallDevice: width < 375,
};
