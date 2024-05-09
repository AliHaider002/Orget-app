import React from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  inputbackcolor,
  inputtitlecolor,
  primary,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import {Medium, Regular, SemiBold} from '../../Utils/FontFamily/Fonfamily';

const Button = ({ButtonTitle, onPress, backgroundColor}) => {
  return (
    <TouchableOpacity
      style={[styles.mainCon, {backgroundColor: backgroundColor}]}
      onPress={onPress}>
      <Text style={styles.ButtonTitle}>{ButtonTitle}</Text>
    </TouchableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  mainCon: {
    width: Dimensions.get('screen').width / 1.1,
    height: 50,
    borderRadius: 10,
    backgroundColor: inputtitlecolor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ButtonTitle: {
    fontSize: 17,
    fontFamily: Regular,
    color: WhiteColor,
  },
});
