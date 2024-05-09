import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, StatusBar, SafeAreaView, Alert} from 'react-native';
import {Text, TextInput} from 'react-native';
import {TouchableOpacity, Keyboard} from 'react-native';
import {View} from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {
  Darkcolor,
  inputtitlecolor,
  primary,
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
import {Medium} from '../../Utils/FontFamily/Fonfamily';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import Org1 from '../../../assets/images/Org1';

export const save_user_id = async id => {
  await AsyncStorage.setItem('id', id);
};
// export const save_admin_id = async id => {
//   await AsyncStorage.setItem('adminid', JSON.stringify(id));
// };
export const save_CompanyId = async number => {
  await AsyncStorage.setItem('number', number);
};

export const save_role = async role => {
  await AsyncStorage.setItem('role', role);
};

const VerifyScreen = props => {
  const {number, confirmation} = props.route.params;
  const [loading, setLoading] = React.useState(false);

  // alert(confirmation);
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const verifyotp = async (phoneNumber, otp) => {
    const code1 = input1 + input2 + input3 + input4 + input5 + input6;
    // alert(code1);

    try {
      // setLoading(true);
      // const sentdata = await axios.post(
      //   `https://2factor.in/API/V1/94587c48-8d46-11ea-9fa5-0200cd936042/SMS/VERIFY3/${number}/${code1}`,
      // );
      // // console.log('<><?<?><<?', sentdata.data);
      // if (sentdata.data.Status === 'Error') {
      //   setdialogVisible(true);
      //   setLoading(false);
      //   setwhatopen('error');
      //   setMessage(sentdata.data.Details);
      //   setLoading(false);
      // }
      if (confirmation !== code1) {
        setLoading(false);
        alert('code not found');
      } else {
        setLoading(true);

        // Fetch all user documents
        const userJobsRef = firebase.firestore().collection('Users');
        const userJobsSnapshot = await userJobsRef.get();
        // setLoading(true);

        if (userJobsSnapshot.empty) {
          console.log('No user documents found.');
          setLoading(false);
          // return;
        }

        let existingUsers = [];
        let existingCompany = [];
        userJobsSnapshot.forEach(doc => {
          const userData = doc.data();
          existingUsers = existingUsers.concat(userData.users || []);
          existingCompany = existingCompany.concat(userData.companyId || []);
        });

        const duplicateCompany = existingCompany.some(user => user === number);
        const duplicateUser = existingUsers.some(
          user => user.number === number,
        );

        if (duplicateUser || duplicateCompany) {
          if (duplicateCompany) {
            const companyId = existingCompany.find(user => user === number);
            // Alert.alert(
            //   'Company Number',
            //   `The phone number belongs to a company with companyId: ${companyId}`,
            // );
            setLoading(false);
            props.navigation.navigate('Home');
            save_user_id(number);
            save_role('user');
            save_CompanyId(companyId);
          } else {
            const matchingUser = existingUsers.find(
              user => user.number === number,
            );
            const companyId = matchingUser.companyId;
            setLoading(false);
            props.navigation.navigate('Home');
            save_user_id(number);
            save_role('user');
            save_CompanyId(companyId);
          }
        } else {
          setLoading(false);
          props.navigation.navigate('RegisterCompany', {
            number: number,
          });
        }

        // No user or company exists with the input number, redirect to register company
      }
    } catch (error) {
      setLoading(false);
      console.log('Error sending OTP:', error);
    }
  };

  const [message, setMessage] = React.useState('');
  const [whatopen, setwhatopen] = React.useState('');
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('');
  const [emailError, setEmailerror] = React.useState('');
  const [EmailFocus, setEmailFocus] = React.useState(false);

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

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');

  const [input1Foucs, setinput1Foucs] = useState(false);
  const [input2Foucs, setInput2Foucs] = useState(false);
  const [input3Foucs, setInput3Foucs] = useState(false);
  const [input4Foucs, setInput4Foucs] = useState(false);
  const [input5Foucs, setInput5Foucs] = useState(false);
  const [input6Foucs, setInput6Foucs] = useState(false);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const focusPreviousInput = (ref, value) => {
    if (value === '') {
      ref.current.focus();
    }
  };

  useEffect(() => {
    ref1?.current?.focus();
  }, []);
  const [code, setCode] = useState('');
  const code1 = input1 + input2 + input3 + input4 + input5 + input6;
  console.log(code1);
  // const confirmationcode = async () => {
  //   if (firebase.auth().currentUser) firebase.auth().currentUser.delete();
  //   try {
  //     // setLoading(true);

  //     const result = await confirmation.confirm(code1);
  //     console.log('result', result);
  //     const params = {
  //       phone: number,
  //     };
  //     console.log('>?>?>?>?>', result.user.phoneNumber);

  //     // setLoading(false);
  //     if (result.user.phoneNumber == number) {
  //       props.navigation.navigate('RegisterCompany');
  //       save_user_id(result.user.phoneNumber);
  //       save_role('user');
  //       save_userdata(result?.user?.phoneNumber);
  //     }
  //   } catch (error) {
  //     if ((error.code = 'auth/requires-recent-login')) {
  //       setdialogVisible(true);
  //       setLoading(false);
  //       setwhatopen('error');
  //       setMessage('Something went wrong please try agian with  valid Otp');
  //     }

  //     // setLoading(false);
  //     // console.log('Error', error);

  //     // Alert.alert(JSON.stringify(error));
  //   }
  // };
  const handleKeyPress = (key, ref) => {
    if (key === 'Backspace' || key === 'Delete') {
      ref.current.focus();
    }
  };
  return (
    <View style={styles.main}>
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

      <Dialog.Container
        visible={Emailvisible}
        contentStyle={{
          // borderRadius: 10,
          backgroundColor: WhiteColor,

          width: Dimensions.get('screen').width,
          marginTop: '30%',
          height: '100%',
        }}
        onBackdropPress={() => setEmailVisible(false)}></Dialog.Container>
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
          borderRadius: 20,
          paddingHorizontal: 45,
        }}>
        <Org1 />
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
        }}>
        <View
          style={{
            flex: 1,
            // position: 'absolute',
            // alignSelf: 'center',
            marginTop: 30,
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AuthIcon />
        </View>
        <View>
          <ScrollView
            // contentContainerStyle={{paddingBottom: 10}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            {/* ***************Email Varification Title********** */}

            <View style={{marginTop: 10, marginHorizontal: 20}}>
              <View>
                <Text style={styles.title}>Verify Your OTP</Text>
                <Text style={[styles.bustitle, {lineHeight: 25}]}>
                  Please enter the verification code sent to your mobile{' '}
                  {number}
                </Text>
                {/* <Text style={[styles.bustitle, {lineHeight: 25}]}>
                  Your OTP is:
                  {confirmation}
                </Text> */}
              </View>
            </View>
            {/* <SafeAreaView style={[styles.root, {marginBottom: 15}]}> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginTop: 10,
                padding: 10,
                marginBottom: 15,
                // backgroundColor: 'red',
                justifyContent: 'space-evenly',
              }}>
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  setinput1Foucs(true);
                }}
                maxLength={1}
                // keyboardType={"number-pad"}
                onBlur={() => setinput1Foucs(false)}
                style={[
                  input1Foucs === true ? styles.otpInput2 : styles.otpInput,
                  {
                    borderBottomColor:
                      input1Foucs === true ? 'black' : Darkcolor,
                  },
                ]}
                // placeholder="*"
                value={input1}
                onChangeText={value => {
                  setInput1(value);
                  focusPreviousInput(ref1, value);
                  ref2?.current?.focus();
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace') {
                    setInput1('');
                    ref1?.current?.focus();
                  }
                }}
                ref={ref1}
              />
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  setInput2Foucs(true);
                }}
                onBlur={() => setInput2Foucs(false)}
                style={[
                  input2Foucs === true ? styles.otpInput2 : styles.otpInput,
                  {
                    borderBottomColor:
                      input2Foucs === true ? 'black' : Darkcolor,
                  },
                ]}
                // placeholder="*"
                value={input2}
                onChangeText={value => {
                  setInput2(value);
                  focusPreviousInput(ref2, value);
                  ref3?.current?.focus();
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && input2 === '') {
                    setInput1('');
                    ref1?.current?.focus();
                  }
                }}
                ref={ref2}
              />
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  setInput3Foucs(true);
                }}
                onBlur={() => setInput3Foucs(false)}
                style={[
                  input3Foucs === true ? styles.otpInput2 : styles.otpInput,
                  {
                    borderBottomColor:
                      input3Foucs === true ? 'black' : Darkcolor,
                  },
                ]}
                // placeholder="*"
                value={input3}
                onChangeText={value => {
                  setInput3(value);
                  focusPreviousInput(ref3, value);
                  ref4?.current?.focus();
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && input3 === '') {
                    setInput2('');
                    ref2?.current?.focus();
                  }
                }}
                ref={ref3}
                maxLength={1}
              />
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  setInput4Foucs(true);
                }}
                onBlur={() => setInput4Foucs(false)}
                style={[
                  input4Foucs === true ? styles.otpInput2 : styles.otpInput,
                  {
                    borderBottomColor:
                      input4Foucs === true ? 'black' : Darkcolor,
                  },
                ]}
                // placeholder="*"
                value={input4}
                onChangeText={value => {
                  setInput4(value);
                  focusPreviousInput(ref4, value);
                  ref5?.current?.focus();
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && input4 === '') {
                    setInput3('');
                    ref3?.current?.focus();
                  }
                }}
                ref={ref4}
                maxLength={1}
              />
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  setInput5Foucs(true);
                }}
                onBlur={() => setInput5Foucs(false)}
                style={[
                  input5Foucs === true ? styles.otpInput2 : styles.otpInput,
                  {
                    borderBottomColor:
                      input5Foucs === true ? 'black' : Darkcolor,
                  },
                ]}
                // placeholder="*"
                value={input5}
                onChangeText={value => {
                  setInput5(value);
                  focusPreviousInput(ref5, value);
                  ref6?.current?.focus();
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && input5 === '') {
                    setInput4('');
                    ref4?.current?.focus();
                  }
                }}
                ref={ref5}
                maxLength={1}
              />
              <TextInput
                keyboardType="numeric"
                onFocus={() => {
                  setInput6Foucs(true);
                }}
                onBlur={() => setInput6Foucs(false)}
                style={[
                  input6Foucs === true ? styles.otpInput2 : styles.otpInput,
                ]}
                // placeholder="*"
                onChangeText={value => {
                  setInput6(value);
                  focusPreviousInput(ref6, value);
                  ref6?.current?.focus();
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && input6 == '') {
                    setInput5('');
                    ref5?.current?.focus();
                    // Keyboard.dismiss();
                  }
                }}
                ref={ref6}
                maxLength={1}
              />
            </View>
            {/* </SafeAreaView> */}

            {/* ***************Eamil Varification BUTTON********** */}
            <View style={{alignSelf: 'center', marginBottom: 10}}>
              <Button
                ButtonTitle={'Verify'}
                // onPress={SIgnup}
                onPress={verifyotp}
                backgroundColor={inputtitlecolor}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default VerifyScreen;
