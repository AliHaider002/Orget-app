import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {Image, StatusBar, Text, View} from 'react-native';
import {primary, WhiteColor} from '../../Utils/ColorScheme/Colors';
import {SemiBold} from '../../Utils/FontFamily/Fonfamily';
import Egg from '../../../assets/images/Egg';
import Org1 from '../../../assets/images/Org1';
const Wellcome = props => {
  const [hideSplash, setHideSplash] = React.useState(true);

  React.useEffect(async () => {
    setTimeout(async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        console.log('role', role);
        if (role === 'user') {
          props.navigation.replace('Home');
        } else {
          props.navigation.replace('Login');
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  }, [hideSplash]);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('./splash.png')}
        style={{
          height: '100%',
          width: '100%',
          resizeMode: 'contain',
        }}></ImageBackground>
    </View>
  );
};
export default Wellcome;
