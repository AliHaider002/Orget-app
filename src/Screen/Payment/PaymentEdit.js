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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/Button/Header';

const PaymentEdit = props => {
  const {data} = props.route.params;

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
  console.log('<>><>', data);
  const [startDate, setStartDate] = React.useState(data?.StartDate);
  const [EndDate, setEndDate] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] =
    React.useState(false);
  const [ac, setAc] = React.useState(data?.account);
  const [Cash, setCash] = React.useState(data?.cash);
  const [from, setfrom] = React.useState(data?.farm);
  const [item, setitem] = React.useState(data?.item);
  const [Amounts, setAmount] = React.useState(data?.Amounts);
  const [Remark, setRemark] = React.useState(data?.Remark);
  const [userid, setUserid] = React.useState();
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
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
  const updateFirestoreDocument = async (id, data) => {
    try {
      if (
        from === '' ||
        ac === '' ||
        Cash === '' ||
        Amounts === '' ||
        Remark === ''
      ) {
        if (from === '') {
          setdialogVisible(true);
          setMessage('From Field Required');
          setwhatopen('not');
        }

        if (ac === '') {
          setdialogVisible(true);
          setMessage('From/Ac Field Required');
          setwhatopen('not');
        }
        if (Amounts === '') {
          setdialogVisible(true);
          setMessage('Amounts Field Required');
          setwhatopen('not');
        }
        if (Cash === '') {
          setdialogVisible(true);
          setMessage('Cash Field Required');
          setwhatopen('not');
        }
        if (Remark === '') {
          setdialogVisible(true);
          setMessage('Remark Field Required');
          setwhatopen('not');
        }
      } else {
        setLoading(true);

        const documentRef = firestore().collection('Payment').doc(id);
        const documentRef2 = firestore().collection('Suppliers').doc(id);

        await documentRef.set(data, {merge: true});
        await documentRef2.set(data, {merge: true});

        setLoading(false);
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
  const maximumDate = new Date();
  // var Amountget = Qty * rate;
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
        maximumDate={maximumDate}
        mode="date"
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
              // marginBottom: 10,
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
              defaultValue={from}
              onChangeText={text => {
                setfrom(text);
              }}
              editable={false}
              titleInput={'To'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Amount'}
              defaultValue={Amounts}
              value={Amounts.toString()}
              onChangeText={text => {
                setAmount(text);
              }}
              keyboardType={'number-pad'}
              titleInput={'Amount'}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'Cash / Online'}
              titleInput={'Cash / Online'}
              keyboardType={'number-pad'}
              defaultValue={Cash}
              onChangeText={text => {
                setCash(text);
              }}
              width={Dimensions.get('screen').width / 1.2}
            />
            <Input
              placeholder={'From A/c'}
              keyboardType={'number-pad'}
              titleInput={'From A/c'}
              defaultValue={ac}
              onChangeText={text => {
                setAc(text);
              }}
              width={Dimensions.get('screen').width / 1.2}
            />

            <Input
              placeholder={'Remark'}
              keyboardType={'number-pad'}
              titleInput={'Remark'}
              defaultValue={Remark}
              onChangeText={text => {
                setRemark(text);
              }}
              width={Dimensions.get('screen').width / 1.2}
            />
          </View>
          <Button
            ButtonTitle={'Update'}
            backgroundColor={'#3797F0'}
            onPress={() => {
              const dataToUpdate = {
                companyId: userid,
                StartDate: startDate,
                from: from,
                Amounts: parseFloat(Amounts),
                Remark: Remark,
                account: ac,
                month: new Date().toLocaleString('default', {month: 'long'}),
                cash: Cash,
                route: 'payment',
                Type: 'Payment',
                PaymentAmount: parseFloat(Amounts),
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
export default PaymentEdit;
