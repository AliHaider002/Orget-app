import {
  inputTextColor,
  inputtitlecolor,
  primary,
  textcolor,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import {
  Light,
  Medium,
  Regular,
  SemiBold,
} from '../../Utils/FontFamily/Fonfamily';
import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  main: {
    backgroundColor: primary,
    flex: 1,
  },
  headercontext: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
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
  input: {
    width: Dimensions.get('screen').width / 1.2,
    height: 60,
    backgroundColor: '#E8ECF2',
    padding: 10,
    fontSize: 17,
    fontFamily: Medium,
    color: inputtitlecolor,
    // marginTop: 6,
    maxHeight: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    // textAlign:""
  },
  btn: {
    width: Dimensions.get('screen').width / 1.1,

    height: 60,
    borderRadius: 10,
    borderColor: '#E8ECF2',
    borderWidth: 1,
    backgroundColor: '#EAF9E1',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  btnname: {
    fontFamily: Regular,
    color: inputtitlecolor,
    fontSize: 16,
  },
  headerflh: {
    fontSize: 16,
    fontFamily: Regular,
    color: inputtitlecolor,
  },
  headerfl: {
    fontSize: 13,
    fontFamily: Regular,
    color: inputtitlecolor,
  },
  Leaveduration: {
    fontFamily: Light,
    color: inputTextColor,
    fontSize: 15,
  },
  container: {
    padding: 16,
  },
  rowContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'auto',
    borderBottomColor: Light,
    borderBottomWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    maxHeight: 'auto',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    maxHeight: 'auto',
    borderBottomColor: Light,
    borderBottomWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: Regular,
    color: textcolor,
    textAlign: 'center',
    marginBottom: 10,
  },
  headercontext: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: -2000,
    textAlign: 'center',
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
});
export default styles;
