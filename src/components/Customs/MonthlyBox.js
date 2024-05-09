import React from 'react';
const {
  WhiteColor,
  primary,
  maintitle,
  inputbackcolor,
  inputTextColor,
  textcolor,
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
import {RadioButton} from 'react-native-paper';
import {FlatList} from 'react-native';
import Close from '../../../assets/images/Close';
const MonthlyBox = ({
  Message,
  icon,
  monthlyboxvisible,
  onPress,
  checked,
  setChecked,
  buttonTitle,
  setmonthlyboxvisible,
}) => {
  const item1 = [
    {name: 'January'},
    {name: 'February'},
    {name: 'March'},
    {name: 'April'},
    {name: 'May'},
    {name: 'June '},
    {name: 'July'},
    {name: 'August'},
    {name: 'September'},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'},
  ];

  return (
    <Dialog.Container
      visible={monthlyboxvisible}
      contentStyle={{
        borderRadius: 10,
        backgroundColor: WhiteColor,
        width: Dimensions.get('screen').width / 1.2,
      }}>
      <View>
        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginBottom: 10, zIndex: -2000}}
          onPress={() => setmonthlyboxvisible(false)}>
          <Close />
        </TouchableOpacity>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            fontFamily: Medium,
          }}>
          Filter by
        </Text>
        <FlatList
          data={item1}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setChecked(item.name) & setmonthlyboxvisible(false);
                }}>
                <RadioButton
                  value={item.name}
                  status={checked === item.name ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(item.name) & setmonthlyboxvisible(false);
                  }}
                />
                <Text
                  style={{
                    color: checked === item.name ? primary : textcolor,
                    fontSize: 16,
                    fontFamily: Regular,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Dialog.Container>
  );
};

export default MonthlyBox;
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
