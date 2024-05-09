import {Dimensions, StyleSheet} from 'react-native';
import {
  inputtitlecolor,
  maintitle,
  primary,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import {Medium, Regular, SemiBold} from '../../Utils/FontFamily/Fonfamily';

const styles = StyleSheet.create({
  main: {
    backgroundColor: primary,
    flex: 1,
  },
  loginheader: {
    fontSize: 20,
    fontFamily: SemiBold,
    color: primary,
    textAlign: 'center',
  },
  forgotpasswordcon: {
    alignSelf: 'flex-end',
    marginHorizontal: 30,
  },
  forgotpasswordtext: {
    fontFamily: Medium,
    color: primary,
    fontSize: 18,
  },
  cancelcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  canceltilte: {
    fontSize: 20,
    fontFamily: SemiBold,
    color: maintitle,
    marginBottom: 10,
    marginTop: 10,
  },
  canceldet: {
    fontSize: 18,
    fontFamily: Regular,
    color: maintitle,
    textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  cancelbtncon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelbtn: {
    width: Dimensions.get('screen').width / 2.8,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelbtntitle: {
    fontSize: 16,
    fontFamily: Medium,
  },
  otpInput: {
    backgroundColor: '#F1F1F2',
    width: Dimensions.get('screen').width / 7,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: primary,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Medium,
  },
  otpInput2: {
    backgroundColor: '#F1F1F2',
    width: Dimensions.get('screen').width / 7,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: primary,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Medium,
    // marginHorizontal: 2,
  },
  title: {
    fontSize: 24,
    // marginBottom: 5,
    color: inputtitlecolor,
    fontFamily: Medium,
  },
  bustitle: {
    fontSize: 14,
    fontFamily: Regular,
    color: '#666666',
    width: 260,
  },
});
export default styles;
