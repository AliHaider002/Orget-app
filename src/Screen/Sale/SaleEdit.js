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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBox from '../../components/Customs/MessageBox';
import LoaderModel from '../../components/Customs/LoaderModel';
import Header from '../../components/Button/Header';

const SaleEdit = props => {
  const {data} = props.route.params;
  console.log('<>><>', data);
  const [startDate, setStartDate] = React.useState(data?.StartDate);
  const [EndDate, setEndDate] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    React.useState(false);
  const [rate, setRate] = React.useState(data?.rate);
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
  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('number');
    console.log('JKJJ', getid1);
    setUserid(getid1);
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
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    }
  }, [userid]);
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

        const documentRef = firestore().collection('Customer').doc(id);
        await documentRef.set(data, {merge: true});
        setLoading(false);
        setdialogVisible(true);
        setMessage('Update Successfully ');
        setwhatopen('done');
      }

      console.log('Document updated successfully!');
    } catch (error) {
      setLoading(false);
      console.error('Error updating document: ', error);
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
      const stockRef = firestore().collection('Stock');

      // Check if item exists in the Stock collection
      const querySnapshot = await stockRef.where('item', '==', item).get();

      if (!querySnapshot.empty) {
        // Item exists, check quantity
        const stockData = querySnapshot.docs[0].data();
        const itemQty = stockData.Qty;

        if (parseFloat(Qty) <= itemQty) {
          // Sufficient quantity, update the Stock collection
          const newQty = itemQty - Qty;
          const stockDocRef = querySnapshot.docs[0].ref;

          stockDocRef
            .update({Qty: newQty, saleitem: Qty})
            .then(() => {
              // Stock quantity updated successfully
              const dataToUpdate = {
                Amounts: Amountget,
                Remark: Remark,
                StartDate: startDate,
                driver: driver,
                from: from,
                item: item,
                qty: Qty,
                rate: rate,
                userid: userid,
                CustomerAmount: Amountget,
              };
              const documentId = data?.id; // replace with the actual document ID you want to update
              updateFirestoreDocument(documentId, dataToUpdate);
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
            // setqtycheck(
            //   `Insufficient quantity for item '${item}'. Available quantity: ${itemQty}`,
            // ),
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
  var Amountget = Qty * rate;

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
        maximumDate={maximumDate}
        mode="date"
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
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  fontSize: 15,
                  marginBottom: 4,
                  fontFamily: Regular,
                  color: inputtitlecolor,
                }}>
                Start Date
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
              editable={false}
              onChangeText={text => {
                setitem(text);
              }}
              keyboardType={'number-pad'}
              titleInput={'Item / Packing'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Qty'}
              value={Qty.toString()}
              defaultValue={Qty}
              onChangeText={text => {
                setQty(text);
              }}
              titleInput={'Qty'}
              keyboardType={'number-pad'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Rate'}
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
              // keyboardType={'number-pad'}
              defaultValue={formatAmount(Amountget.toString())}
              titleInput={'Amount'}
              editable={false}
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
              checkItemQuantity();
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default SaleEdit;
