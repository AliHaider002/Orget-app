import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
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
import {firebase} from '@react-native-firebase/firestore';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Button/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import NumericFormat from './NumericFormat';

const PaymentNew = props => {
  const [startDate, setStartDate] = React.useState();
  const [from, setfrom] = React.useState('');
  const [fromError, setfromerror] = React.useState('');
  const [fromFocus, setfromFocus] = React.useState(false);
  const [ac, setAc] = React.useState('');
  const [acerror, setacerror] = React.useState('');
  const [acfocus, setacfocus] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items1, setItems1] = useState([]);

  const [searchValue1, setSearchValue1] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [newItem, setNewItem] = useState('');
  const [item, setitem] = React.useState('');
  const [itemError, setItemError] = React.useState('');
  const [itemFocus, setItemFocus] = React.useState(false);
  const [Cash, setCash] = React.useState('');
  const [casherror, setcasherror] = React.useState('');
  const [cashfocus, setcashfocus] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [items4, setItems4] = useState([
    {label: 'Cash', value: 'Cash'},
    {label: 'Online', value: 'Online'},
  ]);
  const [cashopen, setcashopen] = React.useState(false);
  React.useEffect(() => {
    if (Cash !== '') {
      setcashopen(false);
    }
  }, [Cash]);
  const [rate, setRate] = React.useState('');
  const [rateError, setRateError] = React.useState('');
  const [RateFocus, setRateFocus] = React.useState(false);
  const [Amounts, setAmount] = React.useState(null);

  console.log('::::::::::::::::::::::::', Amounts);
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
  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('number');
    console.log('JKJJ', getid1);
    setUserid(getid1);
  };
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    }
  }, [userid]);
  const [formattedAmount, setFormattedAmount] = useState('');
  const [startdateopen, setstartdateopen] = React.useState('');

  const [fromoepn, setfromopen] = React.useState(false);
  const [itemoepn, setitemopen] = React.useState(false);
  // React.useEffect(() => {
  //   if (value !== '' || searchValue !== '') {
  //     setfromopen(false);
  //   }
  // }, [value, searchValue]);
  React.useEffect(() => {
    if (open === false) {
      setfromopen(false);
    }
  }, [open]);
  React.useEffect(() => {
    if (item !== '' || searchValue1 !== '') {
      setitemopen(false);
    }
  }, [item, searchValue1]);
  React.useEffect(() => {
    if (startDate !== '') {
      setstartdateopen(false);
    }
  }, [startDate]);

  const fetchItems = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('supplier_records')
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
  }, [userid]);

  // const handleAddItem = async () => {
  //   if (searchValue && !items1.find(item => item.value === searchValue)) {
  //     try {
  //       // Add new item to Firestore
  //       await firebase
  //         .firestore()
  //         .collection('supplier_records')
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
  // const submitdata = async () => {
  //   const cashLowercase = Cash.toLowerCase();
  //   if (
  //     Amounts === '' ||
  //     Amounts === undefined ||
  //     Remark === '' ||
  //     ac === '' ||
  //     (cashLowercase !== 'online' &&
  //       cashLowercase !== 'cash' &&
  //       cashLowercase !== '')
  //   ) {
  //     // Error handling code...
  //   } else {
  //     setLoading(true);
  //     const suppliersRef = firebase.firestore().collection('Suppliers');

  //     // Check if farm already exists in the Suppliers collection
  //     const querySnapshot = await suppliersRef.where('farm', '==', value).get();

  //     if (!querySnapshot.empty) {
  //       // Farm exists, update the existing document
  //       const supplierDoc = querySnapshot.docs[0];
  //       const supplierData = supplierDoc.data();

  //       if (supplierData.Amounts >= Amounts) {
  //         const newAmount = supplierData.Amounts - Amounts;
  //         supplierDoc.ref
  //           .update({Amounts: newAmount})
  //           .then(() => {
  //             // Add payment to Payment collection
  //             addPaymentToCollection();
  //           })
  //           .catch(e => {
  //             setLoading(false);
  //             console.log('<><><>', e);
  //           });
  //       } else {
  //         setLoading(false);
  //         Alert.alert(
  //           `Amount exceeds the available balance for the farm and Balance is: ${supplierData.Amounts}`,
  //         );
  //       }
  //     } else {
  //       // Farm does not exist in Suppliers collection
  //       setLoading(false);
  //       alert('Farm does not exist in the Suppliers collection.');
  //     }
  //   }
  // };
  const checkItemQuantity = async () => {
    if (
      item === '' ||
      Qty === '' ||
      rate === '' ||
      driver === '' ||
      Remark === ''
    ) {
      if (startDate == null || startDate === undefined) {
        Alert.alert('Please select Date');
      }
      if (item == null || item === undefined) {
        Alert.alert('Please select Items');
      }
      if (value == null || value === undefined) {
        Alert.alert('Please select Farm');
      }
      if (item === '') {
        setItemError(true);
      }

      if (Qty === '') {
        setQtyerror(true);
      }
      if (rate === '') {
        setRateError(true);
      }
      if (driver === '') {
        setDrivererror(true);
      }
      if (Remark === '') {
        setRemarkError(true);
      }
      // Error handling code...
    } else {
      setLoading(true);
      const stockRef = firebase.firestore().collection('Stock');

      // Check if item exists in the Stock collection
      const querySnapshot = await stockRef.where('item', '==', item).get();

      if (!querySnapshot.empty) {
        // Item exists, check quantity
        const stockData = querySnapshot.docs[0].data();
        const itemQty = stockData.Qty;
        const itemamount = stockData.Amount;
        const actualRate = stockData.rate;

        if (Qty <= itemQty) {
          // Sufficient quantity, update the Stock collection
          const newQty = itemQty - Qty;
          const stockDocRef = querySnapshot.docs[0].ref;
          const Retailpricerate = actualRate * Qty;
          const stockAmount =
            Amountget > itemamount ? 0 : itemamount - Retailpricerate;
          stockDocRef
            .update({Qty: newQty, Amount: stockAmount})
            .then(() => {
              // Stock quantity updated successfully
              submitdata();
              setLoading(false);
              console.log('Stock quantity updated successfully');
              setdialogVisible(true);

              setMessage('Sale added Successfully');
              setwhatopen('done');

              // Call submitdata function after stock quantity is updated
            })
            .catch(e => {
              setLoading(false);
              console.log('<><><>', e);
            });
        } else {
          setLoading(false);
          alert(
            `Insufficient quantity for item '${item}'. Available quantity: ${itemQty}`,
            setqtycheck(
              `Insufficient quantity for item '${item}'. Available quantity: ${itemQty}`,
            ),
          );
        }
      } else {
        setLoading(false);
        alert(
          `Item '${item}' not found in the Stock collection please only select`,
        );
      }
    }
  };
  const submitdata = async () => {
    const cashLowercase = Cash.toLowerCase();

    if (
      from === '' ||
      Amounts === '' ||
      Amounts === undefined ||
      Remark === '' ||
      ac === '' ||
      Cash === '' ||
      (cashLowercase !== 'online' &&
        cashLowercase !== 'cash' &&
        cashLowercase !== '')
    ) {
      if (from === '') {
        setfromerror(true);
      }
      // if (Cash === '') {
      //   Alert.alert('Please write payemtn method Cash/Online');
      // }
      if (item == null || item === undefined) {
        // Alert.alert('Please select Items');
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
        // setcasherror(true);
        setcashopen(true);
      }
      if (ac === '') {
        setacerror(true);
      }

      if (Amounts === null || Amounts === undefined) {
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
      const stockRef = firebase.firestore().collection('Suppliers');
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
            account: ac,
            month: new Date().toLocaleString('default', {month: 'long'}),
            cash: Cash,
            route: 'payment',
            Type: 'Payment',
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
            .collection('Suppliers')
            .doc(paymentRef.id)
            .set(suppliersData);

          setLoading(false);
          setdialogVisible(true);
          setMessage('Payment added Successfully');
          setwhatopen('done');
        } catch (error) {
          setLoading(false);

          console.error('Error updating stock:', error);
          // Handle the error or show an appropriate error message to the user.
        }
      } else {
        setLoading(false);

        // Handle the case when no documents are found in the query results.
      }
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
            ? props.navigation.navigate('PaymentList') &&
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
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Header backPress={() => props.navigation.navigate('PaymentList')} />
      <View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 40,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <TouchableOpacity style={[styles.btn]}>
          <Text style={styles.btnname}>Payment </Text>
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
                  {startDate == '' || startDate === undefined
                    ? 'Choose Date'
                    : moment(startDate).format('MM/DD/YY')}
                </Text>
              </TouchableOpacity>
            </View>
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
                    height: 'auto',
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
                showSearchBox={false}
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
                  value !== null
                    ? value
                    : searchValue !== ''
                    ? searchValue
                    : 'select Farm'
                }
                resetValue={false}
                placeholderTextColor={'#000'}
                underlineColorAndroid="transparent"
                selectedValue={value}
                searchInputPlaceholderText="Type or select an Farm"
                autoFocus={false}
                displayKey="label"
                hideSubmitButton={true}
              />
            </View> */}
            <Input
              placeholder={'From'}
              titleInput={'From'}
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
            />
            {/* <NumericFormat
              value={Amounts.toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            /> */}
            <Input
              placeholder={'Amount'}
              titleInput={'Amount'}
              width={Dimensions.get('screen').width / 1.2}
              value={Amounts}
              onChangeText={text => setAmount(text)}
              // onChangeText={handleAmountChange}
              keyboardType="numeric"
              IsFocus={AmountFocus}
              // value={Amounts}

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
            {/* <Input
              placeholder={'Cash / Online'}
              titleInput={'Mode'}
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
            <View style={{zIndex: 1000}}>
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
                  dropDownDirection="BOTTOM"
                  listMode="SCROLLVIEW"
                />
              </View>
            </View>
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
                // handleAddItem();
                submitdata();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default PaymentNew;
