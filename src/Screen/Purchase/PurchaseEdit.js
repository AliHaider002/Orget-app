import moment from 'moment';
import React from 'react';
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
import {Regular} from '../../Utils/FontFamily/Fonfamily';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Button/Header';
const PurchaseEdit = props => {
  const {data} = props.route.params;
  console.log('<>><>', data.rate);
  const [startDate, setStartDate] = React.useState(data?.StartDate);
  const [EndDate, setEndDate] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    React.useState(false);
  const [rate, setRate] = React.useState(data?.rate);
  console.log('<>><>', rate);
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
  function formatQty(amount) {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      // Check if the amount is a valid number
      if (Number.isInteger(parsedAmount)) {
        // If the amount is an integer, display without decimal and 00
        return parsedAmount.toLocaleString();
      } else {
        // If the amount is a decimal, display with two decimal places
        return parsedAmount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    } else {
      // If the amount is not a valid number, return as it is
      return amount;
    }
  }
  const [from, setfrom] = React.useState(data?.farm);
  const [item, setitem] = React.useState(data?.item);
  const [Amounts, setAmount] = React.useState(data?.Amounts);
  const [Remark, setRemark] = React.useState(data?.Remark);
  const [Qty, setQty] = React.useState(data?.qty);
  const [driver, setDriver] = React.useState(data?.driver);
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
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
    }
  }, [userid]);
  const maximumDate = new Date();
  const updateFirestoreDocument = async (id, data) => {
    try {
      if (
        from === '' ||
        item === '' ||
        Qty === '' ||
        rate === '' ||
        Amounts === '' ||
        driver === '' ||
        Remark === ''
      ) {
        if (from === '') {
          setdialogVisible(true);
          setMessage('From Field Required');
          setwhatopen('not');
        }
        if (item === '') {
          setdialogVisible(true);
          setMessage('item/packing Field Required');
          setwhatopen('not');
        }
        if (Qty === '') {
          setdialogVisible(true);
          setMessage('Qty Field Required');
          setwhatopen('not');
        }
        if (rate === '') {
          setdialogVisible(true);
          setMessage('Rate Field Required');
          setwhatopen('not');
        }
        if (Amounts === '') {
          setdialogVisible(true);
          setMessage('Amounts Field Required');
          setwhatopen('not');
        }
        if (driver === '') {
          setdialogVisible(true);
          setMessage('Driver Field Required');
          setwhatopen('not');
        }
        if (Remark === '') {
          setdialogVisible(true);
          setMessage('Remark Field Required');
          setwhatopen('not');
        }
      } else {
        setLoading(true);

        const documentRef = firestore().collection('Suppliers').doc(id);
        await documentRef.set(data, {merge: true});
        setLoading(false);
        updateStockCollection();
        setdialogVisible(true);
        setMessage('Update Successfully ');
        setwhatopen('done');
      }

      console.log('Document updated Successfully!');
    } catch (error) {
      setLoading(false);
      console.error('Error updating document: ', error);
    }
  };
  const updateStockCollection = async () => {
    const stockRef = firebase.firestore().collection('Stock');

    // Check if farm and item already exist in the Stock collection
    const querySnapshot = await stockRef
      .where('item', '==', item == '' || item == null ? searchValue1 : item)
      .get();

    if (!querySnapshot.empty) {
      // Farm and item already exist, update the existing document
      const stockDoc = querySnapshot.docs[0];
      const stockData = stockDoc.data();

      const newAmount = stockData.Amount + Amountget;
      // bus sirf qty :Qty g jagh t newqty rakhno ahy ager hi chawan t update plus karaeno ahy
      // const newqty = parseInt(stockData.Qty) + parseInt(Qty);

      stockDoc.ref

        .update({
          Amount: Amountget,
          Qty: Qty,
          Date: startDate,
          Purchaseitem: parseFloat(Qty),
        })
        .then(() => {
          setLoading(false);
          // console.log(ref);
          // setdialogVisible(true);
          // setMessage('Purchase added successfully');
          // setwhatopen('done');
        })
        .catch(e => {
          setLoading(false);
          console.log('karm>', e);
        });
    } else {
      // Farm or item does not exist, create a new document
      stockRef
        .add({
          companyId: userid,
          farm: from,

          item: item,
          Qty: Qty,
          Amount: Amountget,
          month: new Date().toLocaleString('default', {month: 'long'}),
          Date: startDate,
        })
        .then(ref => {
          setLoading(false);
          console.log(ref);
          setdialogVisible(true);
          setMessage('Purchase updated Successfully');
          setwhatopen('done');
        })
        .catch(e => {
          setLoading(false);
          console.log('kar', e);
        });
    }
  };
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
      <Header backPress={() => props.navigation.navigate('PurchaseList')} />
      <View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 40,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <TouchableOpacity style={[styles.btn]}>
          <Text style={styles.btnname}>Purchase </Text>
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
              <Text
                style={{
                  fontSize: 15,
                  marginBottom: 4,
                  fontFamily: Regular,
                  color: inputtitlecolor,
                }}>
                Date
              </Text>
              <TouchableOpacity
                style={[styles.input, {height: 55}]}
                onPress={showDatePicker}>
                <Text style={styles.Leaveduration}>
                  {startDate == ''
                    ? 'Choose Date'
                    : moment(startDate).format('MM/DD/YY')}
                </Text>
              </TouchableOpacity>
            </View>
            <Input
              // placeholder={'F}
              defaultValue={from}
              onChangeText={text => {
                setfrom(text);
              }}
              editable={false}
              // keyboardType={'number-pad'}
              titleInput={'From'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              // placeholder={'Item / Packing'}
              defaultValue={item}
              onChangeText={text => {
                setitem(text);
              }}
              keyboardType={'number-pad'}
              titleInput={'Item '}
              editable={false}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Qty'}
              defaultValue={Qty}
              value={Qty.toString()}
              onChangeText={text => {
                setQty(text);
              }}
              titleInput={'Qty'}
              keyboardType={'number-pad'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Rate'}
              value={rate.toString()}
              onChangeText={text => {
                setRate(text);
              }}
              keyboardType={'number-pad'}
              defaultValue={rate}
              titleInput={'Rate'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Amount'}
              // onChangeText={text => {
              //   setAmount(text);
              // }}
              defaultValue={formatAmount(Amountget.toString())}
              editable={false}
              titleInput={'Amount'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Driver'}
              defaultValue={driver}
              onChangeText={text => {
                setDriver(text);
              }}
              titleInput={'Driver'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Remark'}
              onChangeText={text => {
                setRemark(text);
              }}
              defaultValue={Remark}
              titleInput={'Remark'}
              width={Dimensions.get('screen').width / 1.2}
            />
          </View>
          <Button
            ButtonTitle={'Update'}
            backgroundColor={'#3797F0'}
            onPress={() => {
              const dataToUpdate = {
                Amounts: Amountget,
                Remark: Remark,
                StartDate: startDate,
                driver: driver,
                from: from,
                item: item,
                qty: parseFloat(Qty),
                rate: parseFloat(rate),
                SuppliersAmount: Amountget,
                userid: userid,
              };
              const documentId = data?.id; // replace with the actual document ID you want to update
              updateFirestoreDocument(documentId, dataToUpdate);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default PurchaseEdit;
