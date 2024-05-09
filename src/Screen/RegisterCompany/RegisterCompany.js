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
export const save_user_id = async id => {
  await AsyncStorage.setItem('id', id);
};
// export const save_admin_id = async id => {
//   await AsyncStorage.setItem('adminid', JSON.stringify(id));
// };
export const save_userdata = async number => {
  await AsyncStorage.setItem('number', number);
};
export const save_parentID = async parentID => {
  await AsyncStorage.setItem('parentId', parentID);
};
export const save_CompanyId = async number => {
  await AsyncStorage.setItem('number', number);
};
export const save_role = async role => {
  await AsyncStorage.setItem('role', role);
};
const RegisterCompany = props => {
  const {number} = props.route.params;
  const [startDate, setStartDate] = React.useState(new Date());
  const [from, setfrom] = React.useState('');
  const [fromError, setfromerror] = React.useState('');
  const [fromFocus, setfromFocus] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items1, setItems1] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [newItem, setNewItem] = useState('');
  console.log('**********************', searchValue);

  const [ComanyName, setCompanyName] = React.useState('');
  const [companyNameError, setcompanyNameError] = React.useState('');
  const [companyNameFocus, setcompanyNameFocus] = React.useState(false);
  const [UserName, setUserName] = React.useState('');
  const [UserNameerror, setUserNameerror] = React.useState('');
  const [UserNamefocus, setUserNameFocus] = React.useState(false);
  const [Address, setAddress] = React.useState('');
  const [AddressError, setAddressError] = React.useState('');
  const [AddressFocus, setAddressFocus] = React.useState(false);
  const [City, setCity] = React.useState('');
  const [CityError, setCityError] = React.useState('');
  const [CityFocus, setCityFocus] = React.useState(false);
  const [StateAddress, setstateAddress] = React.useState('');
  const [setateError, setsetateError] = React.useState('');
  const [stateFocus, setStateFocus] = React.useState(false);
  const [Amounts, setAmount] = React.useState('');
  // alert(Amounts);
  var Amountget = UserName * Address;
  const [Amounterror, setAmountError] = React.useState('');
  const [AmountFocus, setAmountFocus] = React.useState(false);
  const [driver, setDriver] = React.useState('');
  const [drivererror, setDrivererror] = React.useState('');
  const [DriverFocus, setDriverFocus] = React.useState(false);
  const [Remark, setRemark] = React.useState('');
  const [RemarkError, setRemarkError] = React.useState('');
  const [RemarkFocus, setRemarkFocus] = React.useState(false);
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [EndDate, setEndDate] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    React.useState(false);
  const [userid, setUserid] = React.useState();
  // alert(userid);
  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('id');
    console.log('JKJJ', getid1);
    setUserid(getid1);
  };
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    }
  }, [userid]);

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
    if (City !== '') {
      setCityError(false);
    }
  }, [City]);
  React.useEffect(() => {
    if (StateAddress !== '') {
      setsetateError(false);
    }
  }, [StateAddress]);
  React.useEffect(() => {
    if (ComanyName !== '') {
      setcompanyNameError(false);
    }
  }, [ComanyName]);
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
  const submitdata = async () => {
    if (
      // from === '' ||
      UserName === '' ||
      Address === '' ||
      City === '' ||
      StateAddress === '' ||
      ComanyName === ''
    ) {
      // if (from === '') {
      //   setfromerror(true);
      // }
      if (ComanyName === '') {
        setcompanyNameError(true);
      }

      if (UserName === '') {
        setUserNameerror(true);
      }
      if (Address === '') {
        setAddressError(true);
      }
      if (City === '') {
        setCityError(true);
      }
      if (StateAddress === '') {
        setsetateError(true);
      }
    } else {
      setLoading(true);
      firebase
        .firestore()
        .collection('Users')
        .add({
          companyId: number,
          Company_Name: ComanyName,
          Your_Name: UserName,
          Address: Address,
          UserName: UserName,
          date: new Date(),
          Address: Address,
          parentuserid: number,
          number: number,
          City: City,
          State: StateAddress,
        })
        .then(ref => {
          setLoading(false);
          console.log(ref);
          props.navigation.navigate('Home');
          save_user_id(number);
          save_role('user');
          save_userdata(number);
          save_CompanyId(number);
          save_parentID(number);
          return;
          //   setdialogVisible(true);
          //   setMessage('Register Successfully ');
          //   setwhatopen('done');
        })
        .catch(e => {
          setLoading(false);
          console.log('<><><>', e);
        });
    }
  };
  const maximumDate = new Date();

  return (
    <View style={styles.main}>
      <LoaderModel isVisible={loading} color={primary} />
      <MessageBox
        visible={dialogVisible}
        icon={whatopen == 'done' ? 'Success' : 'Error'}
        onPress={() => {
          whatopen == 'done'
            ? props.navigation.navigate('PurchaseList') &&
              setdialogVisible(false)
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
        <View style={styles.headercontext}>
          <Text style={styles.headertext}>Register Your Company</Text>
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Text style={styles.headertext}>Skip</Text>
        </TouchableOpacity> */}
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
              placeholder={'Company Name'}
              titleInput={'Company Name'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setCompanyName(text)}
              IsFocus={companyNameFocus}
              onFocus={() => {
                setcompanyNameFocus(true);
              }}
              onBlur={event => {
                setcompanyNameFocus(false);
              }}
              error={companyNameError}
            />
            <Input
              placeholder={'Your Name'}
              titleInput={'Your Name'}
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
              placeholder={'Address'}
              titleInput={'Address'}
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
              placeholder={'City'}
              titleInput={'City'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setCity(text)}
              IsFocus={CityFocus}
              onFocus={() => {
                setCityFocus(true);
              }}
              onBlur={event => {
                setCityFocus(false);
              }}
              error={CityError}
            />
            <Input
              placeholder={'State'}
              //   keyboardType={'number-pad'}
              titleInput={'State'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setstateAddress(text)}
              IsFocus={stateFocus}
              onFocus={() => {
                setStateFocus(true);
              }}
              onBlur={event => {
                setStateFocus(false);
              }}
              error={setateError}
            />
          </View>
          <Button
            ButtonTitle={'Save'}
            backgroundColor={'#6BC874'}
            onPress={() => {
              submitdata();
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default RegisterCompany;
