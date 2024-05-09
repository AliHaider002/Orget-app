import React, {useState} from 'react';
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
import {
  inputtitlecolor,
  primary,
  textcolor,
  WhiteColor,
} from '../../Utils/ColorScheme/Colors';
import styles from './style';
import Header from '../../components/Button/Header';
import {firebase} from '@react-native-firebase/firestore';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import {useFocusEffect} from '@react-navigation/native';
import SearchableDropdown from 'react-native-searchable-dropdown';

import moment from 'moment';
import MonthlyBox from '../../components/Customs/MonthlyBox';
import {Medium} from '../../Utils/FontFamily/Fonfamily';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Balance = props => {
  const [userid, setUserid] = React.useState();

  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [userData, setUserdata] = React.useState([]);
  const [selectCategory, setSelctCategory] = React.useState('Cash Balnace');
  const [CashData, setCashData] = React.useState([]);
  const [BankBalancedata, setBankBalanceData] = React.useState([]);
  // console.log('__________________', BankBalancedata);
  const [TotalAmounts, setTotalAmounts] = React.useState();
  const [TotalAmounts1, setTotalAmounts1] = React.useState();

  const [value, setValue] = useState(
    new Date().toLocaleString('default', {month: 'long'}),
  );

  const [items1, setItems1] = useState([
    {name: 'January'},
    {name: 'Febuary'},
    {name: 'March'},
    {name: 'April'},
    {name: 'May'},
    {name: 'June '},
    {name: 'July'},
    {name: 'August'},
    {name: 'September'},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'},
  ]);
  const [searchValue, setSearchValue] = useState('');
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
  const renderItem = ({item}) => {
    console.log('>???>?>??>kamran', item);
    const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
    const formattedStartDate = moment(startDate).format('DD-MMM-YY');
    return (
      <View>
        <ScrollView>
          <TouchableOpacity
          // onPress={() => props.navigation.navigate('PurchaseEdit', {data: item})}
          >
            <View style={styles.rowContainer1}>
              <View style={styles.column}>
                <Text style={styles.text}>{formattedStartDate}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>{item.farm}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>{item.Type}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>
                  {item.Type == 'Payment' || item.Type == 'Sales' ? '-' : null}
                  {formatAmount(item.Amounts)}
                  {/* {item.Amounts} */}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  const getData = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('Payment')
      .where('companyId', '==', userid)
      .orderBy('StartDate', 'asc')

      // Filter by company ID
      .get()
      .then(querySnapshot => {
        const arr = [];
        const arr1 = [];
        let total = 0;
        let totalbalance = 0;
        let TotalPaymentCash = 0;
        let TotalReceiptCash = 0;
        let TotalPaymentOnline = 0;
        let TotalReceiptOnline = 0;

        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          data.id = snapshot.id;
          // console.log('>>>>', data);
          const startDate = new Date(data.StartDate.seconds * 1000);
          const formattedStartDate = moment(startDate).format('MMMM');
          if (
            data.cash === 'Online' &&
            formattedStartDate.toLowerCase().trim() ===
              value.toLowerCase().trim()
          ) {
            arr.push(data);
            if (data.route === 'receipt') {
              TotalReceiptOnline += data.PaymentAmount;
            } else if (data.route === 'payment') {
              TotalPaymentOnline += data.PaymentAmount;
            }
          }

          if (
            data.cash === 'Cash' &&
            formattedStartDate.toLowerCase().trim() ===
              value.toLowerCase().trim()
          ) {
            arr1.push(data);
            if (data.route === 'receipt') {
              TotalReceiptCash += data.PaymentAmount;
            } else if (data.route === 'payment') {
              TotalPaymentCash += data.PaymentAmount;
            }
          }
        });

        const totalCash = TotalReceiptCash - TotalPaymentCash; // Calculate total cash by subtracting total payment from total receipt for cash
        const totalOnline = TotalReceiptOnline - TotalPaymentOnline; // Calculate total online by subtracting total payment from total receipt for online

        console.log('Total Cash Receipt Amount:', TotalReceiptCash);
        console.log('Total Cash Payment Amount:', TotalPaymentCash);
        console.log('Total Online Receipt Amount:', TotalReceiptOnline);
        console.log('Total Online Payment Amount:', TotalPaymentOnline);
        console.log('Total Cash Amount:', totalCash);
        console.log('Total Online Amount:', totalOnline);

        setBankBalanceData(arr);
        setTotalAmounts(totalCash);
        setTotalAmounts1(totalOnline);

        setCashData(arr1);
      })
      .catch(error => {
        // Handle any potential errors here
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('number');
    setUserid(getid1);
  };
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    } else {
      getData();
    }
  }, [userid]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [value, selectCategory]),
  );
  const [dialogVisible1, setdialogVisible1] = React.useState(false);

  return (
    <View style={styles.main}>
      <MonthlyBox
        checked={value}
        setChecked={setValue}
        monthlyboxvisible={dialogVisible1}
        setmonthlyboxvisible={setdialogVisible1}
      />
      <Header
        backPress={() => props.navigation.navigate('Home')}
        // dropdown={
        //   <View style={{zIndex: 1000, alignSelf: 'center', marginTop: 20}}>
        //     {/* <Text
        //       style={{
        //         fontSize: 13,
        //         marginBottom: 4,
        //         fontFamily: Medium,
        //         color: inputtitlecolor,
        //       }}>
        //       Filert by Month
        //     </Text> */}
        //     <SearchableDropdown
        //       onTextChange={text => setSearchValue(text)}
        //       onItemSelect={item => setValue(item.name)}
        //       containerStyle={{
        //         width: Dimensions.get('screen').width / 2.6,
        //         borderWidth: 1,
        //         borderColor: '#F4F6F9',
        //         borderRadius: 5,
        //         fontSize: 15,
        //         backgroundColor: '#E8ECF2',
        //       }}
        //       textInputStyle={{
        //         height: 40,
        //         borderWidth: 1,
        //         borderColor: '#F4F6F9',
        //         borderRadius: 5,
        //         fontSize: 15,
        //         backgroundColor: '#E8ECF2',
        //       }}
        //       itemStyle={{
        //         padding: 4,
        //         marginTop: 2,
        //         backgroundColor: '#E8ECF2',
        //         borderColor: '#F4F6F9',
        //         borderWidth: 1,
        //         borderRadius: 5,
        //       }}
        //       itemTextStyle={{
        //         color: '#222',
        //       }}
        //       itemsContainerStyle={{
        //         maxHeight: Dimensions.get('screen').height / 2.6,
        //       }}
        //       items={items1}
        //       placeholder={
        //         value === '' || value === null ? 'Select Month' : value
        //       }
        //       resetValue={false}
        //       underlineColorAndroid="transparent"
        //       selectedValue={value}
        //       searchInputPlaceholderText={value === '' ? 'Select Month' : value}
        //       autoFocus={false}
        //       displayKey="label"
        //       hideSubmitButton={true}
        //     />
        //   </View>
        // }
        dropdown={
          <TouchableOpacity
            onPress={() => setdialogVisible1(true)}
            style={{
              width: Dimensions.get('screen').width / 2.6,
              borderWidth: 1,
              borderColor: '#F4F6F9',
              borderRadius: 5,
              fontSize: 15,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              alignSelf: 'center',
              backgroundColor: '#E8ECF2',
            }}>
            <Text style={{fontSize: 16, fontFamily: Medium, color: textcolor}}>
              {value}
            </Text>
          </TouchableOpacity>
        }
      />
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
          width: '100%',
          flex: 1,
          marginTop: 10,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <View
          style={[
            styles.btn,
            {
              width: Dimensions.get('screen').width,
              marginTop: 0,
              borderRadius: 0,
            },
          ]}>
          <TouchableOpacity
            style={{
              borderWidth: selectCategory == 'Cash Balnace' ? 1 : null,
              borderColor: selectCategory == 'Cash Balnace' ? 'black' : null,
              paddingHorizontal: selectCategory == 'Cash Balnace' ? 20 : null,
            }}
            onPress={() => {
              setSelctCategory('Cash Balnace');
            }}>
            <Text style={styles.btnname}>Cash Balance</Text>
            {/* <Text style={styles.btnname}>+</Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: selectCategory == 'Bank Balnace' ? 1 : null,
              borderColor: selectCategory == 'Bank Balnace' ? 'black' : null,
              paddingHorizontal: selectCategory == 'Bank Balnace' ? 20 : null,
            }}
            onPress={() => {
              setSelctCategory('Bank Balnace');
            }}>
            <Text style={styles.btnname}>Bank Balance</Text>
            {/* <Text style={styles.btnname}>+</Text> */}
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: Dimensions.get('screen').width / 1.1,
            height: '70%',
            borderWidth: 1,
            borderColor: '#E8ECF2',
            marginTop: 10,
            padding: 10,
            borderRadius: 5,
            alignSelf: 'center',
            // marginBottom: 10,
          }}>
          <View>
            {(selectCategory == 'Bank Balnace') &
            (BankBalancedata.length === 0) ? (
              <View style={{marginTop: 40, alignSelf: 'center'}}>
                <Text style={styles.btnname}>Data not Available</Text>
              </View>
            ) : (selectCategory == 'Cash Balnace') & (CashData.length === 0) ? (
              <View style={{marginTop: 40, alignSelf: 'center'}}>
                <Text style={styles.btnname}>Data not Available</Text>
              </View>
            ) : (
              <View>
                <View style={styles.container}>
                  <View style={styles.rowContainer}>
                    <View style={styles.column}>
                      <Text style={styles.title}>Date</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.title}>Name</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.title}>Mode</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.title}>Amount</Text>
                    </View>
                  </View>
                  {/* {BankBalancedata.length === 0 ? (
                    <View style={{alignSelf: 'center', marginTop: 40}}>
                      <Text style={styles.btnname}>
                        Data not found by your filter month
                      </Text>
                    </View>
                  ) : CashData.length === 0 ? (
                    <View style={{alignSelf: 'center', marginTop: 40}}>
                      <Text style={styles.btnname}>
                        Data not found by your filter month
                      </Text>
                    </View>
                  ) : ( */}
                  <View>
                    <ScrollView contentContainerStyle={{paddingBottom: 30}}>
                      <FlatList
                        data={
                          selectCategory == 'Bank Balnace'
                            ? BankBalancedata
                            : CashData
                        }
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                      />
                    </ScrollView>
                  </View>
                  {/* )} */}
                </View>
              </View>
              // <FlatList
              //   data={
              //     selectCategory == 'Bank Balnace' ? BankBalancedata : CashData
              //   }
              //   keyExtractor={item => item.id}
              //   renderItem={({item}) => {
              //     const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
              //     const formattedStartDate =
              //       moment(startDate).format('DD-MM-YY');
              //     return (
              //       <View
              //         style={{
              //           flexDirection: 'row',
              //           justifyContent: 'space-between',
              //           padding: 10,
              //           borderBottomWidth: 0.7,
              //           // width: '95%',
              //           // marginHorizontal: 10,
              //           // alignSelf: 'center',
              //           marginBottom: 7,
              //           height: 60,
              //           alignItems: 'center',
              //           borderTopColor: inputtitlecolor,
              //           borderBottomColor: inputtitlecolor,
              //         }}>
              //         <View
              //           style={{
              //             justifyContent: 'space-between',
              //           }}>
              //           <Text style={styles.headerfl}>{item.from}</Text>
              //           <Text style={[styles.headerfl]}>
              //             {formattedStartDate}
              //           </Text>
              //         </View>
              //         <Text style={styles.headerfl}>{item.Amounts}</Text>
              //       </View>
              //     );
              //   }}
              //   // ListHeaderComponent={renderHeader}
              // />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.btn,
            {position: 'absolute', bottom: 10, backgroundColor: '#FAF3DC'},
          ]}>
          <Text style={styles.btnname}>
            {selectCategory == 'Cash Balnace' ? 'Cash Balance' : 'Bank Balance'}
          </Text>
          <Text style={styles.btnname}>
            {selectCategory == 'Cash Balnace'
              ? formatAmount(TotalAmounts)
              : formatAmount(TotalAmounts1)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Balance;
