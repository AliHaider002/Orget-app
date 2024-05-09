import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, StatusBar, SafeAreaView} from 'react-native';
import {Text, TextInput} from 'react-native';
import {TouchableOpacity, Keyboard} from 'react-native';
import {View} from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import auth, {firebase} from '@react-native-firebase/auth';

import {
  Darkcolor,
  inputtitlecolor,
  primary,
  textcolor,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import styles from './style';
import Danger from '../../../assets/images/Danger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import Dialog from 'react-native-dialog';
import Close from '../../../assets/images/Close';
import AuthIcon from '../../../assets/images/AuthIcon';
import {Medium, Regular} from '../../Utils/FontFamily/Fonfamily';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import axios from 'axios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import App from '../../../App';

// import {FirebaseRecaptchaVerifierModal} from '@react-native-firebase/auth';

import firebaseconfigget from '../../../firebase';
export const save_user_id = async id => {
  await AsyncStorage.setItem('id', JSON.stringify(id));
};
// export const save_admin_id = async id => {
//   await AsyncStorage.setItem('adminid', JSON.stringify(id));
// };
export const save_userdata = async name => {
  await AsyncStorage.setItem('userdate', JSON.stringify(name));
};

export const save_role = async role => {
  await AsyncStorage.setItem('role', role);
};
const Signup = props => {
  const recaptchaVerifier = useRef(null);
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('');
  const [emailError, setEmailerror] = React.useState('');
  const [EmailFocus, setEmailFocus] = React.useState(false);
  const [PhoneIsFocus, setPhoneIsFocus] = useState(false);
  const [SigninPhoneError, setSigninPhoneError] = useState('');
  const [SigninPhone, setSigninPhone] = useState('');

  React.useEffect(() => {
    if (SigninPhone !== '') {
      setSigninPhoneError(false);
    }
  }, [SigninPhone]);
  React.useEffect(() => {
    if (email !== '') {
      setEmailerror(false);
    }
  }, [email]);
  React.useEffect(() => {
    if (password !== '') {
      setPasswordError(false);
    }
  }, [password]);

  const [Emailvisible, setEmailVisible] = React.useState(false);

  const emailLogin = async => {
    setLoading(true);
    if (email === '' || password == '') {
      setwhatopen('error');
      // alert('works');
      setdialogVisible(true);
      setLoading(false);
      // alert(userData.message);
      // setstatusdescmessage(JSON.stringify(error.message));
      setMessage('Please enter requires field');
    } else {
      try {
        // alert(phoneNumber);
        // save_user_id(userData._id);
        // save_user_id(userData.token);

        setLoading(true);
        const confirmation = firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            props.navigation.navigate('Login');
          });
        // const confirmation = signInWithPhoneNumber(phoneNumber);
        // setConfirm(confirmation);
      } catch (error) {
        console.log('>?>?>?>?>>', error.code);
        setLoading(false);
        if (error.code === 'auth/invalid-phone-number') {
          setdialogVisible(true);
          setLoading(false);
          setwhatopen('error');
          setMessage(
            'Please enter valid number with country code like e.g +92',
          );
        }
        if (error.code == 'auth/too-many-requests') {
          // alert(error);
          setdialogVisible(true);
          setLoading(false);
          setwhatopen('error');
          setMessage('To many Attempt try later');
        }
      }
    }
  };

  return (
    <View style={styles.main}>
      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseconfigget}
        attemptInvisibleVerification={true}
      /> */}
      <StatusBar backgroundColor={primary} barStyle={'light-content'} />
      <LoaderModel isVisible={loading} color={primary} />
      <MessageBox
        visible={dialogVisible}
        icon={whatopen == 'done' ? 'Success' : 'Error'}
        onPress={() => {
          whatopen == 'done'
            ? props.navigation.navigate('Projects') && setdialogVisible(false)
            : setdialogVisible(false);
        }}
        Message={message}
        buttonTitle={whatopen == 'done' ? 'Continue' : 'Try Again'}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          width: '100%',
          height: 'auto',
          backgroundColor: WhiteColor,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          flex: 1,
          padding: 10,
        }}>
        {/* <ScrollView> */}
        <View style={{alignSelf: 'center', marginTop: 50}}>
          {/* ****SINGIN WITH Email and password ********** */}
          <View>
            <Input
              placeholder={'Email '}
              // keyboardType={'number-pad'}
              width={Dimensions.get('screen').width / 1.1}
              titleInput={'Email'}
              backgroundColor={'white'}
              onChangeText={text => {
                setemail(text);
              }}
              IsFocus={EmailFocus}
              onFocus={() => {
                setEmailFocus(true);
              }}
              onBlur={event => {
                setEmailFocus(false);
              }}
            />
            <Input
              placeholder={'password'}
              // keyboardType={'number-pad'}
              width={Dimensions.get('screen').width / 1.1}
              titleInput={'Password'}
              backgroundColor={'white'}
              onChangeText={text => {
                setpassword(text);
                console.warn(SigninPhone);
              }}
              IsFocus={passwordFocus}
              onFocus={() => {
                setPasswordFocus(true);
              }}
              onBlur={event => {
                setPasswordFocus(false);
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Regular,
              color: textcolor,
            }}>
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Medium,
                color: primary,
                marginLeft: 6,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 30}}>
          <Button
            ButtonTitle={'Sig Up'}
            onPress={() => emailLogin()}
            // onPress={() => props.navigation.navigate('VerifyScreen')}
            backgroundColor={inputtitlecolor}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};
export default Signup;
