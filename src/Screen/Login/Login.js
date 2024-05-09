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
import {encode} from 'base-64';
// import {FirebaseRecaptchaVerifierModal} from '@react-native-firebase/auth';

import firebaseconfigget from '../../../firebase';
import Hen from '../../../assets/images/Hen';
import Orgatlogo from '../../../assets/images/OrgetLogo';

const Login = props => {
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
  const pressLoginbutton = () => {
    if (password === '' || email === '') {
      if (email === '') {
        setEmailerror(true);
      }
      if (password === '') {
        setPasswordError(true);
      }
    }
  };
  const [Emailvisible, setEmailVisible] = React.useState(false);

  const signInWithPhoneNumber = async phoneNumber => {
    if (SigninPhone === '') {
      setwhatopen('error');
      // alert('works');
      setdialogVisible(true);
      setLoading(false);
      // alert(userData.message);
      // setstatusdescmessage(JSON.stringify(error.message));
      setMessage('Please enter valid number');
    } else {
      try {
        // alert(phoneNumber);
        // save_user_id(userData._id);
        // save_user_id(userData.token);

        setLoading(true);
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        // const confirmation = signInWithPhoneNumber(phoneNumber);
        // setConfirm(confirmation);
        console.log('dataahi', confirmation);
        setLoading(false);

        if (confirmation._auth._authResult == true) {
          props.navigation.navigate('VerifyScreen', {
            number: SigninPhone,
            confirmation: confirmation,
          });
        } else {
          setwhatopen('error');

          //  alert('Invalid Credentiols');
          setdialogVisible(true);
          setLoading(false);

          setMessage("Invalid Credentiols'");
        }
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
        // else {
        //   setdialogVisible(true);
        //   setLoading(false);
        //   setwhatopen('error');
        //   setMessage(
        //     'Something Went Wrong',
        //     'An error occurred while verifying your phone number. Please try again later.',
        //   );
        // }
        // alert(error);
        // setdialogVisible(true);
        // setLoading(false);
        // setwhatopen('error');

        // setMessage(JSON.stringify(error));
      }
    }
  };

  const sendOTP = async (phoneNumber, otp) => {
    if (SigninPhone === '') {
      alert('Please enter number');
    } else {
      setLoading(true);
      props.navigation.navigate('VerifyScreen', {
        number: SigninPhone,
        // confirmation: sentdata.data.OTP,
        confirmation: '123456',
      });
      setLoading(false);
    }
    // try {
    //   setLoading(true);
    //   const sentdata = await axios.post(
    //     `https://2factor.in/API/V1/94587c48-8d46-11ea-9fa5-0200cd936042/SMS/${SigninPhone}/AUTOGEN2/OTP1`,
    //   );
    //   console.log('<><?<?><<?', sentdata.data);
    //   setLoading(false);
    //   if (sentdata.data.Status == 'Success') {
    //     props.navigation.navigate('VerifyScreen', {
    //       number: SigninPhone,
    //       // confirmation: sentdata.data.OTP,
    //       confirmation: '123456',
    //     });
    //   } else {
    //     setLoading(false);

    //     setdialogVisible(true);
    //     setwhatopen('error');
    //     setMessage(sentdata.data.Details);
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   setdialogVisible(true);
    //   setwhatopen('error');
    //   setMessage('Something went wrong ');
    //   console.log('Error sending OTP:', error);
    // }
  };

  const emailLogin = async => {
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
        setLoading(true);
        const confirmation = firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setLoading(false);
            props.navigation.navigate('Home');
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
          setdialogVisible(false);
          setLoading(false);
          setwhatopen('error');
          setMessage('To many Attempt try later');
        }
      }
    }
  };
  GoogleSignin.configure({
    webClientId:
      '137067906124-tsgasc6tgv1qq7ve2ieje6u9rqjo2k8a.apps.googleusercontent.com',
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    try {
      // Get the user's ID token and Google access token
      const {idToken, accessToken} = await GoogleSignin.signIn();

      // Create a Google credential with the tokens
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      const userCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      // Extract the user object from the userCredential response
      const user = userCredential.user;
      console.log('<><><><', user);
      if (user.emailVerified == true) {
        props.navigation.navigate('Home');
      }

      // Update state to reflect user is logged in
      setLoggedIn(true);
    } catch (error) {
      console.log('Error with Google sign-in:', error);
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
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 50,
          width: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
          backgroundColor: WhiteColor,
          borderRadius: 5,
          paddingHorizontal: 10,
        }}>
        <Orgatlogo />
      </View>
      <View style={{alignSelf: 'center'}}>
        <Hen />
      </View>
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
          {/* <Text
            style={{
              fontSize: 20,
              fontFamily: Medium,
              color: inputtitlecolor,
              // marginTop: 20,
            }}>
            Sign In
          </Text> */}
          {/* ****SINGIN WITH PHONE ********** */}
          <View>
            <Input
              placeholder={'+9199****99'}
              maxLength={13}
              keyboardType={'phone-pad'}
              width={Dimensions.get('screen').width / 1.1}
              titleInput={'Sign in'}
              backgroundColor={'white'}
              onChangeText={text => {
                setSigninPhone(text);
                console.warn(SigninPhone);
              }}
              IsFocus={PhoneIsFocus}
              onFocus={() => {
                setPhoneIsFocus(true);
              }}
              onBlur={event => {
                setPhoneIsFocus(false);
              }}
            />
          </View>
          {/* ****SINGIN WITH Email and password ********** */}
          {/* <View>
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
          </View> */}
        </View>
        {/* <View
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
            Not have an Account?
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Medium,
                color: primary,
                marginLeft: 6,
              }}>
              Signup
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* *********SINGIN with number***** */}
        <View style={{marginBottom: 30}}>
          <Button
            ButtonTitle={'Sign in '}
            onPress={() => sendOTP()}
            //  onPress={() => props.navigation.navigate('VerifyScreen')}
            backgroundColor={inputtitlecolor}
          />
        </View>
        {/* *********SINGIN with number***** */}
        {/* <View style={{marginBottom: 30}}>
          <Button
            ButtonTitle={'Sigin with Google'}
            onPress={() => login()}
            // onPress={() => props.navigation.navigate('VerifyScreen')}
            backgroundColor={inputtitlecolor}
          />
        </View> */}
        {/* *********SINGIN with Email password***** */}
        {/* <View style={{marginBottom: 30}}>
          <Button
            ButtonTitle={'Sigin email password'}
            onPress={() => emailLogin()}
            // onPress={() => props.navigation.navigate('VerifyScreen')}
            backgroundColor={inputtitlecolor}
          />
        </View> */}
        {/* </ScrollView> */}
      </View>
    </View>
  );
};
export default Login;
