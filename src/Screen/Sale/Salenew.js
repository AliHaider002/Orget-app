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
import {Regular, Medium} from '../../Utils/FontFamily/Fonfamily';
import {firebase} from '@react-native-firebase/firestore';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Button/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

const SaleNew = props => {
  const [startDate, setStartDate] = React.useState();
  const [from, setfrom] = React.useState('');
  const [fromError, setfromerror] = React.useState('');
  const [fromFocus, setfromFocus] = React.useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items1, setItems1] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [item, setitem] = React.useState(null);
  const [itemError, setItemError] = React.useState('');
  const [itemFocus, setItemFocus] = React.useState(false);
  const [Qty, setQty] = React.useState('');
  const [Qtyerror, setQtyerror] = React.useState('');
  const [Qtyfocus, setQtyFocus] = React.useState(false);
  const [rate, setRate] = React.useState('');
  const [rateError, setRateError] = React.useState('');
  const [RateFocus, setRateFocus] = React.useState(false);
  const [Amounts, setAmount] = React.useState();
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
  const [qtycheck, setqtycheck] = React.useState('');
  const [searchValue1, setSearchValue1] = useState('');
  const [items2, setItems2] = useState([]);

  // Fetch existing items from Firestore
  const fetchItems2 = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('Stock')
        .where('companyId', '==', userid)
        .get();
      const fetchedItems = snapshot.docs.map(doc => ({
        name: doc.data().item,
        value: doc.data().item,
      }));
      setItems2(fetchedItems);
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };
  useEffect(() => {
    fetchItems2();
  }, [userid]);
  const [EndDate, setEndDate] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    React.useState(false);
  const [startdateopen, setstartdateopen] = React.useState('');

  const [fromoepn, setfromopen] = React.useState(false);
  const [itemoepn, setitemopen] = React.useState(false);
  React.useEffect(() => {
    if (value !== '' || searchValue !== '') {
      setfromopen(false);
    }
  }, [value, searchValue]);
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
  const [userid, setUserid] = React.useState();
  var Amountget = Qty * rate;

  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('number');
    console.log('JKJJ', getid1);
    setUserid(getid1);
  };
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    } else {
      fetchItems();
      fetchItems2();
    }
  }, [userid]);
  React.useEffect(() => {
    if (from !== '') {
      setfromerror(false);
    }
  }, [from]);
  React.useEffect(() => {
    if (driver !== '') {
      setDrivererror(false);
    }
  }, [driver]);
  React.useEffect(() => {
    if (item !== '') {
      setItemError(false);
    }
  }, [item]);
  React.useEffect(() => {
    if (Amounts !== '') {
      setAmountError(false);
    }
  }, [Amounts]);
  React.useEffect(() => {
    if (Qty !== '') {
      setQtyerror(false);
    }
  }, [Qty]);
  React.useEffect(() => {
    if (rate !== '') {
      setRateError(false);
    }
  }, [rate]);
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
  const fetchItems = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('customer_records')
        .where('companyId', '==', userid)

        .get();
      const fetchedItems = snapshot.docs.map(doc => ({
        name: doc.data().name,
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

  const handleAddItem = async () => {
    if (searchValue && !items1.find(item => item.value === searchValue)) {
      try {
        // Add new item to Firestore
        await firebase
          .firestore()
          .collection('customer_records')
          .add({name: searchValue, companyId: userid});

        // Update dropdown items
        const newItem = {label: searchValue, value: searchValue};
        setItems1(prevItems => [...prevItems, newItem]);

        setValue(searchValue);
      } catch (error) {
        console.log('Error adding item:', error);
      }
    }
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
    setStartDate(date);
  };
  function formatAmount(amount) {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      // Check if the amount is a valid number
      return parsedAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      // If the amount is not a valid number, return as it is
      return amount;
    }
  }
  const submitdata = async () => {
    if (
      item === '' ||
      Qty === '' ||
      rate === '' ||
      driver === '' ||
      Remark === ''
    ) {
      if (startDate == null || startDate === undefined) {
        // Alert.alert('Please select Date');
        setstartdateopen(true);
      }
      if (item == null || item === undefined) {
        // Alert.alert('Please select Items');
        setitemopen(true);
      }
      if (value == null || value === undefined) {
        // Alert.alert('Please select Farm');
        setfromopen(true);
      }
      if (item === '') {
        setItemError(true);
      }
      if (driver === '') {
        setDrivererror(true);
      }
      if (Qty === '') {
        setQtyerror(true);
      }
      if (rate === '') {
        setRateError(true);
      }
      if (Remark === '') {
        setRemarkError(true);
      }
      // Error handling code...
    } else {
      setLoading(true);
      const suppliersRef = firebase.firestore().collection('Customer');
      const suppliersRef1 = firebase.firestore().collection('Stock_records');

      // // Check if farm already exists in the Suppliers collection
      // const querySnapshot = await suppliersRef
      //   .where('farm', '==', value == '' || value == null ? searchValue : value)
      //   .get();

      // if (!querySnapshot.empty) {
      //   // Farm already exists, update the existing document
      //   const supplierDoc = querySnapshot.docs[0];
      //   const supplierData = supplierDoc.data();

      //   const newAmount = supplierData.Amounts + Amountget;

      //   supplierDoc.ref
      //     .update({Amounts: newAmount})
      //     .then(() => {
      //       setLoading(false);
      //       // Check item quantity before submitting order
      //     })
      //     .catch(e => {
      //       setLoading(false);
      //       console.log('Stock quantity updated successfully');
      //       setdialogVisible(true);
      //       setMessage('Sale added ');
      //       setwhatopen('done');
      //       console.log('<><><>', e);
      //     });
      // }

      // Farm does not exist, create a new document
      suppliersRef1.add({
        companyId: userid,
        StartDate: startDate,
        farm: value == '' || value == null ? searchValue : value,
        item: item == '' || item == null ? searchValue1 : item,
        qty: parseFloat(Qty),
        rate: rate,
        Amounts: parseFloat(Amountget),
        CustomerAmount: parseFloat(Amountget),
        driver: driver,
        Remark: Remark,
        Type: 'Sales',

        route: 'Customer',

        month: new Date().toLocaleString('default', {month: 'long'}),
      });
      suppliersRef
        .add({
          companyId: userid,
          StartDate: startDate,
          farm: value == '' || value == null ? searchValue : value,
          item: item,
          qty: parseFloat(Qty),

          rate: rate,
          Amounts: parseFloat(Amountget),
          CustomerAmount: parseFloat(Amountget),
          driver: driver,
          Remark: Remark,
          Type: 'Sales',

          route: 'Customer',

          month: new Date().toLocaleString('default', {month: 'long'}),
        })
        .then(() => {
          // Check item quantity before submitting order
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
          setdialogVisible(true);

          setMessage('Sale added Successfully');
          setwhatopen('done');

          console.log('<><><>', e);
        });
    }
  };

  const checkItemQuantity = async () => {
    if (
      item === '' ||
      Qty === '' ||
      rate === '' ||
      driver === '' ||
      Remark === ''
    ) {
      if (startDate == null || startDate === undefined) {
        // Alert.alert('Please select Date');
        setstartdateopen(true);
      }
      if (item == null || item === undefined) {
        // Alert.alert('Please select Items');
        setitemopen(true);
      }
      if (value == null || value === undefined) {
        // Alert.alert('Please select Farm');
        setfromopen(true);
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
        const purchaseqty = stockData.Purchaseitem;
        const saleitem = stockData.saleitem;

        const itemamount = stockData.Amount;
        const actualRate = stockData.rate;

        if (parseFloat(Qty) <= itemQty) {
          // Sufficient quantity, update the Stock collection
          const newQty = itemQty - Qty;
          const purchaseitem = purchaseqty - Qty;
          const saleplus = parseFloat(saleitem) + parseFloat(Qty);

          const stockDocRef = querySnapshot.docs[0].ref;
          const Retailpricerate = actualRate * Qty;
          const stockAmount =
            Amountget > itemamount ? 0 : itemamount - Retailpricerate;
          stockDocRef
            .update({
              Qty: newQty,
              Amount: Amountget,
              saleitem: saleplus,
              // Purchaseitem: purchaseitem,
            })
            .then(() => {
              // Stock quantity updated successfully
              submitdata();
              setLoading(false);
              console.log('Stock quantity updated successfully');
              setdialogVisible(true);
              handleAddItem();

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
          `Item '${searchValue1}' not found in the Stock collection please only select`,
        );
      }
    }
  };

  let stockUpdated = false; // Flag variable to track stock update

  const updateStockCollection = async () => {
    try {
      const stockRef = firebase.firestore().collection('Stock');

      await stockRef.add({
        companyId: userid,
        farm: value == '' ? searchValue : value,
        item: item,
        Qty: Qty,
        Amount: Amountget,
        month: new Date().toLocaleString('default', {month: 'long'}),
        Date: startDate,
      });

      setLoading(false);
      console.log('Stock collection updated successfully');

      stockUpdated = true;

      setdialogVisible(true);
      setMessage('Sale added Successfully');
      setwhatopen('done');

      if (stockUpdated) {
        submitdata();
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating stock collection:', error);
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
            ? props.navigation.navigate('SaleList') && setdialogVisible(false)
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
      <Header backPress={() => props.navigation.navigate('SaleList')} />
      <View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 40,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <TouchableOpacity style={[styles.btn]}>
          <Text style={styles.btnname}>Sale </Text>
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
            <View style={{marginBottom: 10}}>
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
            <View style={{zIndex: 1000, marginBottom: 10}}>
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
                onTextChange={text => setSearchValue(text) & setValue(null)}
                onItemSelect={item => setValue(item.name) & setSearchValue('')}
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
                  color: '#000',
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
                    : 'Type or select Farm'
                }
                resetValue={false}
                underlineColorAndroid="transparent"
                selectedValue={value}
                searchInputPlaceholderText="Type or select Farm"
                autoFocus={false}
                placeholderTextColor={'#000'}
                displayKey="label"
                hideSubmitButton={true}
              />
            </View>
            {/* <Input
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
            /> */}
            <View style={{zIndex: 1000, marginBottom: 10}}>
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
                  Item
                </Text>
                {itemoepn == true ? (
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
                onTextChange={text => setSearchValue1(text)}
                onItemSelect={item => setitem(item.name)}
                containerStyle={{
                  width: Dimensions.get('screen').width / 1.2,
                  borderWidth: 1,
                  borderColor: itemoepn === true ? 'red' : '#F4F6F9',

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
                  item !== null
                    ? item
                    : searchValue1 !== ''
                    ? searchValue1
                    : 'Type or select an Item'
                }
                resetValue={false}
                underlineColorAndroid="transparent"
                selectedValue={item}
                searchInputPlaceholderText="Type or select an Item"
                autoFocus={false}
                displayKey="label"
                hideSubmitButton={true}
                placeholderTextColor={'#000'}
              />
            </View>
            {/* <Input
              placeholder={'Item / Packing'}
              titleInput={'Item / Packing'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setitem(text)}
              IsFocus={itemFocus}
              onFocus={() => {
                setItemFocus(true);
              }}
              onBlur={event => {
                setItemFocus(false);
              }}
              error={itemError}
            /> */}
            <Input
              placeholder={'Qty'}
              keyboardType={'number-pad'}
              titleInput={'Qty'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setQty(text) & setqtycheck('')}
              IsFocus={Qtyfocus}
              onFocus={() => {
                setQtyFocus(true);
              }}
              onBlur={event => {
                setQtyFocus(false);
              }}
              error={Qtyerror}
            />
            {qtycheck == '' ? null : (
              <View>
                <Text style={{color: 'red', fontSize: 13, fontFamily: Medium}}>
                  {qtycheck}
                </Text>
              </View>
            )}
            <Input
              placeholder={'Rate'}
              titleInput={'Rate'}
              keyboardType={'number-pad'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setRate(text)}
              IsFocus={RateFocus}
              onFocus={() => {
                setRateFocus(true);
              }}
              onBlur={event => {
                setRateFocus(false);
              }}
              error={rateError}
            />
            <Input
              defaultValue={formatAmount(Amountget.toString())}
              titleInput={'Amount'}
              width={Dimensions.get('screen').width / 1.2}
              editable={false}
              // onChangeText={text => setAmount(text)}
              // IsFocus={AmountFocus}
              // onFocus={() => {
              //   setAmountFocus(true);
              // }}
              // onBlur={event => {
              //   setAmountFocus(false);
              // }}
              // error={Amounterror}
            />
            <Input
              placeholder={'Driver'}
              titleInput={'Driver'}
              width={Dimensions.get('screen').width / 1.2}
              onChangeText={text => setDriver(text)}
              IsFocus={DriverFocus}
              onFocus={() => {
                setDriverFocus(true);
              }}
              onBlur={event => {
                setDriverFocus(false);
              }}
              error={drivererror}
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
                checkItemQuantity();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default SaleNew;
