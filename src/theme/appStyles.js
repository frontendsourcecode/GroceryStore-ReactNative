import {StyleSheet} from 'react-native';
import {Layout} from './Layout';
import Color from './Color';
import Font from './Fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.primary,
  },
  statusBar: {
    flex: 1,
    height: Layout.statusBarHeight,
  },
  row: {
    flex: 1,
  },
  rowXYcenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowXcenter: {
    flex: 1,
    alignItems: 'center',
  },
  rowYcenter: {
    flex: 1,
    justifyContent: 'center',
  },
  fontRegular: {
    fontFamily: 'Font-Regular',
  },
  btnSecontary: {
    backgroundColor: Color.secondary,
    fontFamily: 'Font-Regular',
  },
  content: {
    marginTop: Layout.indent,
  },
  contentBg: {
    backgroundColor: Color.white,
    padding: Layout.indent,
    flex: 1,
  },

  setLanguage: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  introLangBtn: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '50%',
    marginLeft: '25%',
    marginBottom: Layout.halfIndent,
  },
  introLangBtnActive: {
    backgroundColor: Color.secondary,
  },
  // Slider
  slide: {
    backgroundColor: Color.primary,
    flex: 1,
  },
  slideTitle: {
    color: Color.white,
    fontSize: 30,
    textAlign: 'center',
  },
  slideText: {
    textAlign: 'center',
    color: Color.lightWhite,
  },
  slideImage: {
    width: 300,
    height: 300,
  },
  slideIcon: {
    backgroundColor: 'transparent',
    color: Color.white,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    color: Color.white,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDotStyle: {
    backgroundColor: Color.secondary,
  },

  menuBtn: {
    padding: Layout.indent,
  },
  drawerList: {
    margin: 0,
    paddingLeft: 0,
  },
  drawerItem: {
    margin: 0,
    padding: 0,
  },
  drawerIcon: {
    paddingRight: Layout.indent,
  },
  drawerText: {
    fontSize: 17,
    fontWeight: '600',
    color: Color.black,
    paddingLeft: Layout.indent,
  },
  profileName: {
    color: Color.white,
    fontSize: 22,
  },
  profileEmail: {
    color: Color.lightWhite,
    fontSize: 14,
  },
  activeDrawerItem: {
    // backgroundColor: Color.primaryLight
  },
  logo: {},
  headerLogo: {
    height: 40,
    width: 120,
  },
  loaderLogo: {
    height: 68,
    width: 220,
  },
  loginLogo: {
    marginTop: Layout.sixIndent,
    height: 68,
    width: 220,
  },
  loginMidText: {
    fontSize: 16,
    fontFamily: 'Font-Light',
    marginLeft: 40,
    marginRight: 40,
    marginTop: -Layout.doubleIndent,
    color: Color.lightWhite,
  },
  loginTitle: {
    fontSize: 30,
    color: Color.white,
    marginLeft: Layout.indent,
    textAlign: 'center',
    fontFamily: 'Font-Regular',
  },
  loginBack: {
    marginTop: Layout.doubleIndent,
    justifyContent: 'flex-start',
  },
  loginBackIcon: {
    color: Color.white,
  },

  // Input
  itemInput: {},
  textbox: {
    marginTop: 15,
    color: Color.white,
    width: 100,
    paddingLeft: Layout.indent,
    paddingRight: Layout.indent,
    fontFamily: 'Font-Regular',
    fontSize: 14,
  },
  inputError: {
    color: Color.red,
    top: 20,
    fontSize: 12,
  },
});
