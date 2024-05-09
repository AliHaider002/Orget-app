import React from 'react';
const {
  WhiteColor,
  primary,
  maintitle,
  inputbackcolor,
  inputTextColor,
} = require('../../Utils/ColorScheme/Colors');
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Dialog from 'react-native-dialog';
import {Medium, Regular, SemiBold} from '../../Utils/FontFamily/Fonfamily';

const MessageBox = ({Message, icon, visible, onPress, buttonTitle}) => {
  return (
    <Dialog.Container
      visible={visible}
      contentStyle={{
        borderRadius: 10,
        backgroundColor: WhiteColor,
        width: Dimensions.get('screen').width / 1.2,
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {/* <View>

        {icon}
        </View> */}
        <View style={styles.cancelcon}>
          <Text style={styles.canceltilte}> {Message}</Text>
        </View>
        <View style={styles.cancelbtncon}>
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.cancelbtn,
              {
                borderWidth: 2,
                borderColor: primary,
                backgroundColor: primary,
                // marginLeft: 15,
                // marginTop: 30,
              },
            ]}>
            <Text style={[styles.cancelbtntitle, {color: WhiteColor}]}>
              {buttonTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog.Container>
  );
};

export default MessageBox;
const styles = StyleSheet.create({
  cancelcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  canceltilte: {
    fontSize: 17,
    fontFamily: Regular,
    color: inputTextColor,
    marginBottom: 15,
    textAlign: 'center',
    // marginTop: 10,
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
    fontSize: 13,
    fontFamily: Medium,
  },
});
