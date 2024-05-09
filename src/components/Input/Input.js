import React from 'react';
import {
  View,
  Text,
  ToucableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Darkcolor,
  inputbackcolor,
  inputTextColor,
  inputtitlecolor,
  maintitle,
  primary,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import {Light, Medium, Regular} from '../../Utils/FontFamily/Fonfamily';
const Input = ({
  titleInput,
  placeholder,
  value,
  width,
  maxLength,
  onChangeText,
  secureTextEntry,
  keyboardType,
  icon,
  backgroundColor,
  editable,
  disabled,
  defaultValue,
  error,
  getCode,
  // countryCode,
  error2,
  error3,
  onSelect,
  onFocus,
  IsFocus,
  onBlur,
}) => {
  const [trimmedValue, setTrimmedValue] = React.useState(value);
  const handleInputChange = inputValue => {
    // Trim the input value before updating the state or calling the onChangeText prop
    const trimmedInput = inputValue.trim();
    onChangeText(trimmedInput);
  };

  return (
    <View>
      {error === true && (
        <Text
          style={{
            position: 'absolute',
            // top: -20,
            right: 10,
            fontSize: 14,
            marginBottom: 4,
            fontFamily: Medium,
            color: 'red',
          }}>
          This Field Is Required
        </Text>
      )}

      {IsFocus == true ? (
        <View style={{marginBottom: 10}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 4,
                fontFamily: Medium,
                color: inputtitlecolor,
              }}>
              {titleInput}
            </Text>
            {icon}
          </View>
          <TextInput
            value={value}
            onChangeText={handleInputChange} // Use handleInputChange to handle input trimming
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={inputTextColor}
            keyboardType={keyboardType}
            defaultValue={defaultValue}
            editable={editable}
            onFocus={onFocus}
            maxLength={maxLength}
            // onBlur={onBlur}
            style={[styles.phoneInput, {borderColor: '#77E6B6', width: width}]}
          />
        </View>
      ) : (
        <View style={{marginBottom: 10}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 4,
                fontFamily: Medium,
                color: inputtitlecolor,
              }}>
              {titleInput}
            </Text>
            {icon}
          </View>
          <TextInput
            value={value}
            onChangeText={handleInputChange} // Use handleInputChange to handle input trimming
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            placeholderTextColor={inputTextColor}
            keyboardType={keyboardType}
            defaultValue={defaultValue}
            editable={editable}
            onFocus={onFocus}
            // onBlur={onBlur}
            style={
              error || error2 || error3
                ? [
                    styles.phoneInput,
                    {borderColor: 'red', borderWidth: 1, width: width},
                  ]
                : [styles.phoneInput, {width: width}]
            }
          />
        </View>
      )}
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  phoneInput: {
    height: 55,
    // width: width,
    borderWidth: 1,
    borderColor: '#F4F6F9',
    borderRadius: 5,
    paddingHorizontal: 10,

    // borderColor: Darkcolor,
    fontFamily: Light,
    color: inputTextColor,
    fontSize: 15,
    backgroundColor: '#E8ECF2',
  },
});
