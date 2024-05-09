import {StyleSheet, Dimensions} from 'react-native';
import {
  inputtitlecolor,
  primary,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import {Regular, SemiBold} from '../../Utils/FontFamily/Fonfamily';
const styles = StyleSheet.create({
  main: {
    backgroundColor: primary,
    flex: 1,
  },
  headercon: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  imgcon: {
    // position: 'absolute',
    // flex: 1,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: -20,
    zIndex: -2000,
  },
  imgcon1: {
    marginHorizontal: 20,
    marginTop: 20,

    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'flex-end',
  },
  headercontext: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headertext: {
    fontSize: 16,
    fontFamily: SemiBold,
    color: WhiteColor,
  },
  headertext1: {
    fontSize: 16,
    fontFamily: Regular,
    color: WhiteColor,
  },
  btn: {
    width: Dimensions.get('screen').width / 2.3,
    height: 100,
    borderRadius: 10,
    borderColor: '#E8ECF2',
    borderWidth: 1,
    backgroundColor: WhiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnname: {
    position: 'absolute',
    bottom: 10,
    fontFamily: Regular,
    color: inputtitlecolor,
    fontSize: 16,
  },
  btnname1: {
    fontFamily: Regular,
    color: inputtitlecolor,
    fontSize: 16,
  },
});
export default styles;
