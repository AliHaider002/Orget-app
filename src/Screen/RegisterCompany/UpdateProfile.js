import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import SettingIcon from '../../../assets/images/Setting';
import Input from '../../components/Input/Input';
import {
  inputtitlecolor,
  primary,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import styles from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../../components/Button/Button';
import {Medium, Regular} from '../../Utils/FontFamily/Fonfamily';
import {firebase} from '@react-native-firebase/firestore';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Button/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Backicon from '../../../assets/images/Backicon';

const UpdateProfile = props => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [from, setfrom] = React.useState('');
  const [fromError, setfromerror] = React.useState('');
  const [fromFocus, setfromFocus] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items1, setItems1] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [newItem, setNewItem] = useState('');

  const [ComanyName, setCompanyName] = React.useState('');
  const [companyNameError, setcompanyNameError] = React.useState('');
  const [companyNameFocus, setcompanyNameFocus] = React.useState(false);
  const [UserName, setUserName] = React.useState('');
  const [UserNameerror, setUserNameerror] = React.useState('');
  const [UserNamefocus, setUserNameFocus] = React.useState(false);
  const [Address, setAddress] = React.useState('');
  const [AddressError, setAddressError] = React.useState('');
  const [AddressFocus, setAddressFocus] = React.useState(false);
  const [email, setemail] = React.useState('');
  const [EmailError, setEmailError] = React.useState('');
  const [emailFocus, setEmailFOcus] = React.useState(false);
  const [Number, setNumber] = React.useState();
  const [numberError, setnumberError] = React.useState('');
  const [numberfocus, setNumberFocus] = React.useState(false);
  const [City, setCity] = React.useState('');
  const [setateError, setsetateError] = React.useState('');
  // alert(Amounts);
  var Amountget = UserName * Address;

  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [EndDate, setEndDate] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    React.useState(false);
  const [userid, setUserid] = React.useState();
  const [ParentID, setParentId] = React.useState();

  const [CompanyId, setcompanyId] = React.useState();
  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('id');
    // const getp = await AsyncStorage.getItem('parentId');

    console.log('JKJJ', getid1);
    setUserid(getid1);
    setParentId(getp);
  };
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    } else {
      getData();
    }
  }, [userid]);
  const getData = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          data.id = snapshot.id;
          if (data.companyId === userid) {
            setcompanyId(data.companyId);
            setParentId(data?.parentuserid);

            // console.log('userid:', data, data?.parentuserid);
          }
        });
      });

    setLoading(false);
    // setimage(url);
  };
  React.useEffect(() => {
    getData();
  }, [userid]);
  console.log('**********************', userid, ParentID);

  React.useEffect(() => {
    if (UserName !== '') {
      setUserNameerror(false);
    }
  }, [UserName]);
  React.useEffect(() => {
    if (Address !== '') {
      setAddressError(false);
    }
  }, [Address]);
  React.useEffect(() => {
    if (email !== '') {
      setEmailError(false);
    }
  }, [email]);
  React.useEffect(() => {
    if (Number !== '') {
      setnumberError(false);
    }
  }, [Number]);

  const pressLoginbutton = () => {};
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };
  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };
  const handleConfirm1 = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker1();
    setEndDate(date);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    setStartDate(date);
  };

  const maximumDate = new Date();
  const submitdata = async () => {
    console.log('userid:', ParentID, userid);
    if (
      // from === '' ||
      UserName === '' ||
      Address === '' ||
      email === '' ||
      Number === '' ||
      Number === undefined ||
      Number === null
    ) {
      // if (from === '') {
      //   setfromerror(true);
      // }

      if (UserName === '') {
        setUserNameerror(true);
      }
      if (Address === '') {
        setAddressError(true);
      }
      if (email === '') {
        setEmailError(true);
      }
      if (Number === undefined || Number === null) {
        setnumberError(true);
      }
    }
    else{
    if (ParentID === userid) {
      const userJobsRef = firebase.firestore().collection('Users');
      const userJobsSnapshot = await userJobsRef
        .where('companyId', '==', userid)
        .get();
      console.log('...........................', userJobsSnapshot.empty);

      setLoading(true);
      if (userJobsSnapshot.empty) {
        console.log('No user documents found with the given company Id.');
        setLoading(false);
        return;
      }

      const userDocId = userJobsSnapshot.docs[0].id;

      const newUser = {
        number: Number,
        date: new Date(),

        UserName: UserName,
        useremail: email,
        mobileNumber: Number,
        userAddress: Address,
        companyId: userid,
      };

      // Get the existing users array from the document
      let existingUsers = [];
      let existingCompany;

      const userDoc = await firebase
        .firestore()
        .collection('Users')
        .doc(userDocId)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        existingUsers = userData.users || [];
        existingCompany = userData.companyId;
      }

      // Check if the new user number already exists
      const duplicateUser = existingUsers.some(
        user => user.number === newUser.number,
      );

      console.log('(***************(((*', existingCompany, Number);
      if (existingCompany === Number) {
        setLoading(false);
        setdialogVisible(true);
        setMessage('Input number is already Exist as your company number');
        setwhatopen('error');
        return;
      }
      if (duplicateUser) {
        console.log(
          'A user with the same number and company Id already exists. Cannot add the new user.',
        );
        setLoading(false);
        setdialogVisible(true);
        setMessage(
          'A user with the same number and company Id already exists. Cannot add the new user.',
        );
        setwhatopen('error');
        return;
      }

      // Check if the user limit of 10 is reached
      if (existingUsers.length >= 3) {
        setLoading(false);
        setdialogVisible(true);
        console.log('User limit reached. Cannot add more users.');
        setMessage('User limit reached. Cannot add more users.');
        setwhatopen('error');
        return;
      }

      // Add the new user to the array
      existingUsers.push(newUser);

      // Update the document with the updated users array
      firebase
        .firestore()
        .collection('Users')
        .doc(userDocId)
        .update({
          users: existingUsers,
        })
        .then(() => {
          setLoading(false);
          setdialogVisible(true);
          setMessage('User added Successfully');
          setwhatopen('done');
        })
        .catch(error => {
          setLoading(false);
          console.log('Error:', error.message);
        });
    } else {
      // Alert.alert('You can not add user contact to company thanks.');
      setLoading(false);
      setdialogVisible(true);
      setMessage('Sorry! you can not add user ');
      setwhatopen('error');
    }

    }

  };

  return (
    <View style={styles.main}>
      <LoaderModel isVisible={loading} color={primary} />
      <MessageBox
        visible={dialogVisible}
        icon={whatopen == 'done' ? 'Success' : 'Error'}
        onPress={() => {
          whatopen == 'done'
            ? setdialogVisible(false)
            : setdialogVisible(false);
        }}
        Message={message}
        buttonTitle={whatopen == 'done' ? 'Continue' : 'Try Again'}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible1}
        mode="date"
        onConfirm={handleConfirm1}
        onCancel={hideDatePicker1}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        maximumDate={maximumDate}
        onCancel={hideDatePicker}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
          marginHorizontal: 20,
        }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Backicon />
        </TouchableOpacity>

        <View style={styles.headercontext}>
          <Text style={styles.headertext}>Add New User</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 40,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View
            style={{
              width: Dimensions.get('screen').width / 1.1,
              height: 'auto',
              borderWidth: 1,
              borderColor: '#E8ECF2',
              alignSelf: 'center',
              marginTop: 30,
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
              marginBottom: 10,
              zIndex: 1000,
            }}>
            <Input
              placeholder={'User Name'}
              titleInput={'User Name'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setUserName(text)}
              IsFocus={UserNamefocus}
              onFocus={() => {
                setUserNameFocus(true);
              }}
              onBlur={event => {
                setUserNameFocus(false);
              }}
              error={UserNameerror}
            />
            <Input
              placeholder={'User Email'}
              titleInput={'User Email'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setemail(text)}
              IsFocus={emailFocus}
              onFocus={() => {
                setEmailFOcus(true);
              }}
              onBlur={event => {
                setEmailFOcus(false);
              }}
              error={EmailError}
            />
            <Input
              placeholder={'User Address'}
              titleInput={'User Address'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setAddress(text)}
              IsFocus={AddressFocus}
              onFocus={() => {
                setAddressFocus(true);
              }}
              onBlur={event => {
                setAddressFocus(false);
              }}
              error={AddressError}
            />
            <Input
              placeholder={'User Number'}
              titleInput={'User Number'}
              keyboardType={'phone-pad'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setNumber(text)}
              IsFocus={numberfocus}
              onFocus={() => {
                setNumberFocus(true);
              }}
              onBlur={event => {
                setNumberFocus(false);
              }}
              error={numberError}
            />
          </View>
          <Button
            ButtonTitle={'Save'}
            backgroundColor={'#6BC874'}
            onPress={() => {
              submitdata();
            }}
          />
          <View style={{marginTop: 30, alignSelf: 'center'}}>
            <Button
              ButtonTitle={'Logout'}
              backgroundColor={'red'}
              onPress={async () => {
                await AsyncStorage.removeItem('id');
                await AsyncStorage.removeItem('number');
                await AsyncStorage.removeItem('parentId');

                await AsyncStorage.removeItem('role');
                props.navigation.navigate('Login');
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default UpdateProfile;
