import {StyleSheet} from 'react-native';
import Colors from '../../theme/Color';
import Dimensions from '../../theme/Dimension';
import Fonts from '../../theme/Fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarTitle: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',

    marginRight: 20,
  },
  androidButtonText: {
    color: 'blue',
    fontSize: Dimensions.headerText,
  },

  toolBar: {
    width: '100%',
    display: 'flex',
    backgroundColor: Colors.colorPrimary,
    fontSize: Dimensions.headerText,
    height: Dimensions.headerheight,
    flexDirection: 'row',
    color: Colors.white,
    alignItems: 'center',
    fontFamily: Fonts.primarySemiBold,
  },
  title: {
    color: Colors.white,
    fontSize: Dimensions.title,
    fontWeight: '700',
    marginBottom: 16,
  },

  toggle: {
    padding: 10,
  },
});
