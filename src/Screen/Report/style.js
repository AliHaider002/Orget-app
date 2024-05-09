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
    height: 70,
    backgroundColor: '#E8ECF2',
    padding: 10,
    fontSize: 17,
    fontFamily: Medium,
    color: inputtitlecolor,
    // marginTop: 6,
    maxHeight: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10,
    // textAlign:""
  },
  btn: {
    width: Dimensions.get('screen').width / 1.1,

    height: 60,
    borderRadius: 10,
    borderColor: '#E8ECF2',
    borderWidth: 1,
    backgroundColor: '#FDD3D3',
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
    fontSize: 18,
  },
  headerflh: {
    fontSize: 16,
    fontFamily: Medium,
    color: inputtitlecolor,
  },
  headerfl: {
    fontSize: 14,
    fontFamily: Regular,
    color: inputtitlecolor,
    marginBottom: 10,
    textAlign: 'center',
  },
  Leaveduration: {
    fontFamily: Light,
    color: inputTextColor,
    fontSize: 15,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  text: {
    // fontSize: 16,
    // fontFamily: Regular,
    // color: textcolor,
    // textAlign: 'center',
    marginBottom: 10,
    fontSize: 13,
    fontFamily: Regular,
    color: textcolor,
    textAlign: 'center',
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
});
export default styles;
