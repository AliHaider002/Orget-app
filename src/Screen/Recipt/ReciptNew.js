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
  inputTextColor,
  inputtitlecolor,
  primary,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import styles from './style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../../components/Button/Button';
import {Light, Medium, Regular} from '../../Utils/FontFamily/Fonfamily';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Button/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

const ReciptNew = props => {
  const [startDate, setStartDate] = React.useState();

  const [from, setfrom] = React.useState('');
  const [fromError, setfromerror] = React.useState('');
  const [fromFocus, setfromFocus] = React.useState(false);
  const [ac, setAc] = React.useState('');
  const [acerror, setacerror] = React.useState('');
  const [acfocus, setacfocus] = React.useState(false);
  const [item, setitem] = React.useState('');
  const [itemError, setItemError] = React.useState('');
  const [itemFocus, setItemFocus] = React.useState(false);
  const [Cash, setCash] = React.useState('');
  const [casherror, setcasherror] = React.useState('');
  const [cashfocus, setcashfocus] = React.useState(false);

  const [rate, setRate] = React.useState('');
  const [rateError, setRateError] = React.useState('');
  const [RateFocus, setRateFocus] = React.useState(false);
  const [Amounts, setAmount] = React.useState();
  const [startdateopen, setstartdateopen] = React.useState('');

  const [fromoepn, setfromopen] = React.useState(false);
  const [cashopen, setcashopen] = React.useState(false);

  const [fromtooepn, setfromtoopen] = React.useState(false);

  const [itemoepn, setitemopen] = React.useState(false);
  React.useEffect(() => {
    if (value !== '' || searchValue !== '') {
      setfromopen(false);
    }
  }, [value, searchValue]);
  React.useEffect(() => {
    if (value3 !== '' || searchValue3 !== '') {
      setfromtoopen(false);
    }
  }, [value3, searchValue3]);
  // React.useEffect(() => {
  //   if (item !== '' || searchValue1 !== '') {
  //     setitemopen(false);
  //   }
  // }, [item, searchValue1]);
  React.useEffect(() => {
    if (startDate !== '') {
      setstartdateopen(false);
    }
  }, [startDate]);
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
  const [items2, setItems2] = useState([
    {
      name: 'Cash',
    },
    {
      name: 'Online',
    },
  ]);

  const [searchValue1, setSearchValue1] = useState('');
  const [userid, setUserid] = React.useState();
  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('number');
    console.log('JKJJ', getid1);
    setUserid(getid1);
  };
  const [open1, setOpen1] = useState(false);
  const [Acedmicvalue, setAcedmicvalue] = useState('');
  const [items4, setItems4] = useState([
    {label: 'Cash', value: 'Cash'},
    {label: 'Online', value: 'Online'},
  ]);
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    }
  }, [userid]);
  React.useEffect(() => {
    if (from !== '') {
      setfromerror(false);
    }
  }, [from]);

  React.useEffect(() => {
    if (Cash !== '') {
      setcasherror(false);
    }
  }, [Cash]);
  React.useEffect(() => {
    if (item !== '') {
      setItemError(false);
    }
  }, [item]);
  React.useEffect(() => {
    if (Amounts !== '' || Amounts !== undefined) {
      setAmountError(false);
    }
  }, [Amounts]);

  React.useEffect(() => {
    if (ac !== '') {
      setacerror(false);
    }
  }, [ac]);
  React.useEffect(() => {
    if (Remark !== '') {
      setRemarkError(false);
    }
  }, [Remark]);
  React.useEffect(() => {
    if (Cash !== '') {
      setcashopen(false);
    }
  }, [Cash]);
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
  const [open, setOpen] = useState(false);
  const [openfrom, setOpenfrom] = useState(false);

  React.useEffect(() => {
    if (open === false) {
      setfromopen(false);
    }
  }, [open]);
  const [value, setValue] = useState(null);
  const [items1, setItems1] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([]);
  const [searchValue3, setSearchValue3] = useState('');

  const submitdata = async () => {
    const cashLowercase = Cash.toLowerCase();

    if (
      // from === '' ||
      Amounts === '' ||
      Amounts === undefined ||
      Remark === '' ||
      ac === '' ||
      Cash === '' ||
      (cashLowercase !== 'online' &&
        cashLowercase !== 'cash' &&
        cashLowercase !== '')
    ) {
      if (value3 === null || value3 === undefined) {
        setfromtoopen(true);
      }
      if (item == null || item === undefined) {
        // Alert.alert('Please select Items');
        setitemopen(true);
      }
      if (value == null || value === undefined) {
        // Alert.alert('Please select Farm');
        setfromopen(true);
      }
      if (startDate == null || startDate === undefined) {
        // Alert.alert('Please select Date');
        setstartdateopen(true);
      }

      if (Cash === '') {
        setcashopen(true);
      }
      if (ac === '') {
        setacerror(true);
      }

      if (Amounts === '' || Amounts === undefined) {
        setAmountError(true);
      }

      if (Remark === '') {
        setRemarkError(true);
      }
      if (
        cashLowercase !== 'online' &&
        cashLowercase !== 'cash' &&
        cashLowercase !== ''
      ) {
        alert('Payment method is not correct write Cash/Online.');
      }
    } else {
      setLoading(true);
      const stockRef = firebase.firestore().collection('Customer');
      const querySnapshot = await stockRef.where('farm', '==', value).get();

      if (!querySnapshot.empty) {
        const stockDoc = querySnapshot.docs[0];
        const stockData = stockDoc.data();
        const itemamount = stockData.Amounts;
        const stockAmount = Amounts > itemamount ? 0 : itemamount - Amounts;

        try {
          const paymentData = {
            companyId: userid,
            StartDate: startDate,
            farm: value,
            Amounts: parseFloat(Amounts),
            Remark: Remark,
            To: value3,
            account: ac,
            month: new Date().toLocaleString('default', {month: 'long'}),
            cash: Cash,
            route: 'receipt',
            Type: 'Receipt',
            PaymentAmount: parseFloat(Amounts),
          };

          const paymentRef = await firebase
            .firestore()
            .collection('Payment')
            .add(paymentData);

          const suppliersData = {
            ...paymentData,
            PaymentAmount: parseFloat(Amounts),
          };

          await firebase
            .firestore()
            .collection('Customer')
            .doc(paymentRef.id)
            .set(suppliersData);

          setLoading(false);
          setdialogVisible(true);
          setMessage('Receipt added Successfully');
          setwhatopen('done');
        } catch (error) {
          setLoading(false);

          console.error('Error updating stock:', error);
          // Handle the error or show an appropriate error message to the user.
        }
      } else
        err => {
          setLoading(false);
          console.log('<><>error', err);

          // Handle the case when no documents are found in the query results.
        };
    }
  };
  const [farmData, setfarmData] = React.useState([]);

  const fetchItems1 = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('supplier_records')
        .where('companyId', '==', userid)
        .get();
      const fetchedItems = snapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.data().name,
      }));
      setItems3(fetchedItems);
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };
  useEffect(() => {
    if (userid === undefined) {
      fetchItems1();
    }
    // Fetch existing items from Firestore
  }, [userid]);
  const handleAddItem = async () => {
    if (searchValue && !items1.find(item => item.value === searchValue)) {
      try {
        // Add new item to Firestore
        await firebase
          .firestore()
          .collection('supplier_records')
          .add({name: searchValue, companyId: userid});

        // Update dropdown items
        const newItem = {label: searchValue, value: searchValue};
        setItems3(prevItems => [...prevItems, newItem]);

        setValue3(searchValue);
      } catch (error) {
        console.log('Error adding item:', error);
      }
    }
  };
  const fetchItems = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('customer_records')
        .where('companyId', '==', userid) // Filter by company ID

        .get();
      const fetchedItems = snapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.data().name,
      }));
      setItems1(fetchedItems);
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };

  useEffect(() => {
    // Fetch existing items from Firestore

    fetchItems();
    fetchItems1();
  }, [userid]);

  // const handleAddItem = async () => {
  //   if (searchValue && !items1.find(item => item.value === searchValue)) {
  //     try {
  //       // Add new item to Firestore
  //       await firebase
  //         .firestore()
  //         .collection('customer_records')
  //         .add({name: searchValue});

  //       // Update dropdown items
  //       const newItem = {label: searchValue, value: searchValue};
  //       setItems1(prevItems => [...prevItems, newItem]);

  //       setValue(searchValue);
  //     } catch (error) {
  //       console.log('Error adding item:', error);
  //     }
  //   }
  // };
  const handleAmountChange = text => {
    // Remove any non-numeric characters except the dot (.)
    const cleanedText = text.replace(/[^\d.]/g, '');

    // If there's more than one dot, keep only the first one
    const dotIndex = cleanedText.indexOf('.');
    if (dotIndex !== -1) {
      const textBeforeDot = cleanedText.substring(0, dotIndex);
      const textAfterDot = cleanedText.substring(dotIndex + 1);
      cleanedText = `${textBeforeDot}.${textAfterDot}`;
    }

    // Format the amount with commas every three digits before the dot
    const [integerPart, decimalPart] = cleanedText.split('.');
    let formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );

    // Ensure the decimal part always has two digits
    const formattedDecimalPart = decimalPart
      ? decimalPart.padEnd(2, '0').slice(0, 2)
      : '00';

    const formattedText = decimalPart
      ? `${formattedIntegerPart}.${formattedDecimalPart}`
      : formattedIntegerPart;

    setAmount(formattedText);
  };

  return (
    <View style={styles.main}>
      <LoaderModel isVisible={loading} color={primary} />
      <MessageBox
        visible={dialogVisible}
        icon={whatopen == 'done' ? 'Success' : 'Error'}
        onPress={() => {
          whatopen == 'done'
            ? props.navigation.navigate('ReciptList') && setdialogVisible(false)
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
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Header backPress={() => props.navigation.navigate('ReciptList')} />
      <View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 40,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <TouchableOpacity style={[styles.btn]}>
          <Text style={styles.btnname}> Receipt </Text>
        </TouchableOpacity>
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
            }}>
            <View style={{marginBottom: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 4,
                    fontFamily: Medium,
                    color: inputtitlecolor,
                  }}>
                  Date
                </Text>
                {startdateopen == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 4,
                      fontFamily: Medium,
                      color: 'red',
                    }}>
                    This Field is Required
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={[
                  styles.input,
                  {
                    height: 55,
                    borderWidth: 1,
                    borderColor: startdateopen === true ? 'red' : '#F4F6F9',
                  },
                ]}
                onPress={showDatePicker}>
                <Text style={styles.Leaveduration}>
                  {' '}
                  {startDate == '' || startDate === undefined
                    ? 'Choose Date'
                    : moment(startDate).format('MM/DD/YY')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'flex-start'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 4,
                    fontFamily: Medium,
                    color: inputtitlecolor,
                  }}>
                  From
                </Text>
                {fromoepn == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 4,
                      fontFamily: Medium,
                      color: 'red',
                    }}>
                    This Field is Required
                  </Text>
                ) : null}
              </View>
            </View>
            <View
              style={{
                zIndex: 1000,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <DropDownPicker
                zIndex={1000}
                placeholder="Select Farm"
                containerStyle={{
                  width: Dimensions.get('screen').width / 1.2,
                  borderWidth: 1,
                  height: open === false ? 55 : 'auto',

                  backgroundColor: '#E8ECF2',
                  borderColor: fromoepn == true ? 'red' : '#F4F6F9',

                  borderRadius: 0,
                }}
                style={{
                  width: Dimensions.get('screen').width / 1.2,
                  backgroundColor: '#E8ECF2',
                  borderWidth: 1,
                  height: 'auto',
                  backgroundColor: '#E8ECF2',
                  borderColor: fromoepn == true ? 'red' : '#F4F6F9',

                  borderWidth: 0,
                  borderRadius: 0,
                }}
                textStyle={{
                  fontFamily: Light,
                  color: inputTextColor,
                  fontSize: 15,
                }}
                open={open}
                value={value}
                items={items1}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems1}
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
              />
            </View>
            {/* <View style={{zIndex: 1000, marginBottom: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 4,
                    fontFamily: Medium,
                    color: inputtitlecolor,
                  }}>
                  From
                </Text>
                {fromoepn == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 4,
                      fontFamily: Medium,
                      color: 'red',
                    }}>
                    This Field is Required
                  </Text>
                ) : null}
              </View>
              <SearchableDropdown
                onTextChange={text => setSearchValue(text) & setfromopen(false)}
                onItemSelect={item => setValue(item.name) & setfromopen(false)}
                containerStyle={{
                  width: Dimensions.get('screen').width / 1.2,
                  borderWidth: 1,
                  borderColor: fromoepn === true ? 'red' : '#F4F6F9',

                  borderRadius: 5,
                  fontSize: 15,
                  backgroundColor: '#E8ECF2',
                }}
                textInputStyle={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#F4F6F9',
                  borderRadius: 5,
                  color: 'black',

                  fontSize: 15,
                  backgroundColor: '#E8ECF2',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#E8ECF2',
                  borderColor: '#F4F6F9',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{
                  color: '#222',
                }}
                itemsContainerStyle={{
                  maxHeight: Dimensions.get('screen').height / 2,
                }}
                items={items1}
                placeholder={
                  value === '' || value === null ? 'Select Farm' : value
                }
                resetValue={false}
                placeholderTextColor={'#000'}
                underlineColorAndroid="transparent"
                selectedValue={value}
                searchInputPlaceholderText={
                  value === '' ? 'Select Farm' : value
                }
                autoFocus={false}
                displayKey="label"
                hideSubmitButton={true}
              />
            </View> */}
            {/* ***********************To farm is set jekdhen chawan t farm select kary saghy tho ya likhy saghy tho t hi set kandasin */}
            <View style={{zIndex: 2}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 4,
                    fontFamily: Medium,
                    color: inputtitlecolor,
                  }}>
                  To
                </Text>
                {fromoepn == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 4,
                      fontFamily: Medium,
                      color: 'red',
                    }}>
                    This Field is Required
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  zIndex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <DropDownPicker
                  // zIndex={1000}
                  placeholder="Select Farm"
                  containerStyle={{
                    width: Dimensions.get('screen').width / 1.2,
                    borderWidth: 1,
                    height: 'auto',
                    backgroundColor: '#E8ECF2',
                    borderColor: fromoepn == true ? 'red' : '#F4F6F9',

                    borderRadius: 0,
                  }}
                  style={{
                    width: Dimensions.get('screen').width / 1.2,
                    backgroundColor: '#E8ECF2',
                    borderWidth: 1,
                    height: openfrom === false ? 55 : 'auto',
                    backgroundColor: '#E8ECF2',
                    borderColor: fromoepn == true ? 'red' : '#F4F6F9',

                    borderWidth: 0,
                    borderRadius: 0,
                  }}
                  textStyle={{
                    fontFamily: Light,
                    color: inputtitlecolor,
                    fontSize: 15,
                  }}
                  open={openfrom}
                  value={value3}
                  items={items3}
                  setOpen={setOpenfrom}
                  setValue={setValue3}
                  setItems={setItems1}
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  listMode="SCROLLVIEW"
                  dropDownDirection="BOTTOM"
                />
              </View>
            </View>
            {/* <View style={{zIndex: 1000, marginBottom: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 4,
                    fontFamily: Medium,
                    color: inputtitlecolor,
                  }}>
                  To
                </Text>
                {fromtooepn == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 4,
                      fontFamily: Medium,
                      color: 'red',
                    }}>
                    This Field is Required
                  </Text>
                ) : null}
              </View>
              <SearchableDropdown
                textColor="black"
                onTextChange={text =>
                  setSearchValue3(text) & setValue3(null) & setfromtoopen(false)
                }
                onItemSelect={item =>
                  setValue3(item.name) & setfromtoopen(false)
                }
                placeholderTextColor={'#000'}
                containerStyle={{
                  width: Dimensions.get('screen').width / 1.2,
                  borderWidth: 1,
                  borderColor: fromtooepn === true ? 'red' : '#F4F6F9',
                  borderRadius: 5,
                  fontSize: 15,
                  color: 'black',
                  backgroundColor: '#E8ECF2',
                }}
                textInputStyle={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#F4F6F9',
                  borderRadius: 5,
                  fontSize: 15,
                  color: 'black',
                  backgroundColor: '#E8ECF2',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#E8ECF2',
                  borderColor: '#F4F6F9',
                  borderWidth: 1,
                  color: 'black',
                  borderRadius: 5,
                }}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{
                  color: 'black',
                  maxHeight: Dimensions.get('screen').height / 2,
                }}
                items={items3}
                placeholder={
                  value3 !== null
                    ? value3
                    : searchValue3 !== ''
                    ? searchValue3
                    : 'Type or select Farm'
                }
                resetValue={false}
                underlineColorAndroid="transparent"
                selectedValue={value3}
                searchInputPlaceholderText="Type or select Farm"
                autoFocus={false}
                displayKey="label"
                hideSubmitButton={true}
              />
            </View> */}
            {/* <Input
              placeholder={'To'}
              titleInput={'To'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setfrom(text)}
              IsFocus={fromFocus}
              onFocus={() => {
                setfromFocus(true);
              }}
              onBlur={event => {
                setfromFocus(false);
              }}
              error={fromError}
            /> */}
            <Input
              placeholder={'Amount'}
              titleInput={'Amount'}
              keyboardType={'number-pad'}
              width={Dimensions.get('screen').width / 1.2}
              value={Amounts}
              onChangeText={text => setAmount(text)}
              IsFocus={AmountFocus}
              onFocus={() => {
                setAmountFocus(true);
              }}
              onBlur={event => {
                setAmountFocus(false);
              }}
              error={Amounterror}
            />
            {/* <View style={{zIndex: 1000, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 15,
                  marginBottom: 4,
                  fontFamily: Medium,
                  color: inputtitlecolor,
                }}>
                Cash / Online
              </Text>
              <SearchableDropdown
                onTextChange={text => setSearchValue1(text)}
                onItemSelect={item => setCash(item.name)}
                containerStyle={{
                  width: Dimensions.get('screen').width / 1.2,
                  borderWidth: 1,
                  borderColor: '#F4F6F9',
                  borderRadius: 5,
                  fontSize: 15,
                  backgroundColor: '#E8ECF2',
                }}
                textInputStyle={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#F4F6F9',
                  borderRadius: 5,
                  fontSize: 15,
                  backgroundColor: '#E8ECF2',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#E8ECF2',
                  borderColor: '#F4F6F9',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{
                  color: '#222',
                }}
                itemsContainerStyle={{
                  maxHeight: Dimensions.get('screen').height / 2,
                }}
                items={items2}
                placeholder={
                  Cash !== null
                    ? Cash
                    : searchValue1 !== ''
                    ? searchValue1
                    : 'Type or select an Farm'
                }
                resetValue={false}
                underlineColorAndroid="transparent"
                selectedValue={Cash}
                searchInputPlaceholderText="Type or select an Farm"
                autoFocus={false}
                displayKey="label"
                hideSubmitButton={true}
              />
            </View> */}
            <View style={{zIndex: 2000}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 4,
                    fontFamily: Medium,
                    color: inputTextColor,
                  }}>
                  Mode
                </Text>
                {cashopen == true ? (
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 4,
                      fontFamily: Medium,
                      color: 'red',
                    }}>
                    This Field is Required
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  zIndex: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <DropDownPicker
                  zIndex={1000}
                  placeholder="Select Mode"
                  containerStyle={{
                    width: Dimensions.get('screen').width / 1.2,
                    borderWidth: 1,
                    height: cashopen === false ? 55 : 'auto',
                    backgroundColor: '#E8ECF2',
                    borderColor: cashopen === true ? 'red' : '#F4F6F9',

                    borderRadius: 0,
                  }}
                  style={{
                    width: Dimensions.get('screen').width / 1.2,
                    borderWidth: 0,
                    height: cashopen === false ? 55 : 'auto',
                    backgroundColor: '#E8ECF2',
                    borderColor: cashopen === true ? 'red' : '#F4F6F9',

                    borderRadius: 0,
                  }}
                  textStyle={{
                    fontFamily: Light,
                    color: inputTextColor,
                    fontSize: 15,
                  }}
                  open={open1}
                  value={Cash}
                  items={items4}
                  setOpen={setOpen1}
                  setValue={setCash}
                  setItems={setItems4}
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  listMode="SCROLLVIEW"
                  dropDownDirection="BOTTOM"
                />
              </View>
            </View>
            {/* <Input
              placeholder={'Cash / Online'}
              titleInput={'Mode'}
              // keyboardType={'number-pad'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setCash(text)}
              IsFocus={cashfocus}
              onFocus={() => {
                setcashfocus(true);
              }}
              onBlur={event => {
                setcashfocus(false);
              }}
              error={casherror}
            /> */}
            <Input
              placeholder={'From A/c'}
              titleInput={'From A/c'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setAc(text)}
              IsFocus={acfocus}
              onFocus={() => {
                setacfocus(true);
              }}
              onBlur={event => {
                setacfocus(false);
              }}
              error={acerror}
            />

            <Input
              placeholder={'Remark'}
              // keyboardType={'number-pad'}
              titleInput={'Remark'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setRemark(text)}
              IsFocus={RemarkFocus}
              onFocus={() => {
                setRemarkFocus(true);
              }}
              onBlur={event => {
                setRemarkFocus(false);
              }}
              error={RemarkError}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Button
              ButtonTitle={'Save'}
              backgroundColor={'#6BC874'}
              onPress={() => {
                submitdata();
                // handleAddItem();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default ReciptNew;
