import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
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
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import {useFocusEffect} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Medium} from '../../Utils/FontFamily/Fonfamily';
import MonthlyBox from '../../components/Customs/MonthlyBox';

const Stock = props => {
  const [userid, setUserid] = React.useState();
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [userData, setUserdata] = React.useState([]);
  const [selectCategory, setSelctCategory] = React.useState('Cash Balnace');
  const [Stock, setStock] = React.useState([]);
  const [searchValue1, setSearchValue1] = useState('');

  const [TotalAmounts, setTotalAmounts] = React.useState(0);
  const [Totalpurchase, setTotalpurchase] = React.useState(0);
  const [TotlaSale, setTotalsale] = React.useState(0);
  const [value, setValue] = useState(moment(new Date()).format('MMMM'));

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
  console.log('JKJJ', Stock);
  const [searchValue, setSearchValue] = useState('');
  const [BankCashdata, setBankCashData] = React.useState([]);
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
  function formatAmount(amount) {
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
  const [items2, setItems2] = useState([]);
  const [item, setitem] = React.useState(null);

  useEffect(() => {
    // Fetch existing items from Firestore
    const fetchItems = async () => {
      try {
        const snapshot = await firebase.firestore().collection('Stock').get();
        const fetchedItems = snapshot.docs.map(doc => ({
          name: doc.data().item,
          value: doc.data().item,
        }));
        setItems2(fetchedItems);
      } catch (error) {
        console.log('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);
  const saleitem = 0;

  const renderItem = ({item}) => {
    console.log('<<<<<', item);
    let itemtotal = 0;
    let total_Purchase = 0;
    let total_sale = 0;
    let itemtotal1 = 0;

    if (item.item === item.item) {
      itemtotal = item.Purchaseitem - item.saleitem;
      // total_Purchase += item.Purchaseitem;

      // total_sale += item.saleitem;

      // setTotalpurchase(total_Purchase);
      // setTotalsale(total_sale);
      console.log('<<<<<', total_Purchase, total_sale);
    }

    // const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
    // const formattedStartDate = moment(startDate).format('DD-MM-YY');

    return (
      <TouchableOpacity
      // onPress={() => props.navigation.navigate('PurchaseEdit', {data: item})}
      >
        <View style={styles.rowContainer1}>
          <View style={styles.column}>
            <Text style={styles.text}>{item.item}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>{formatAmount(item.Purchaseitem)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>{formatAmount(item.saleitem)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>
              {formatAmount(itemtotal)}
              {/* {item.Amounts} */}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const getData = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('Stock')
      .where('companyId', '==', userid) // Filter by company ID
      .get()
      .then(querySnapshot => {
        const arr = [];
        let total = 0;
        let total_Purchase = 0;
        let total_sale = 0;

        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();

          // console.log('((((((', data);
          const startDate = new Date(data.Date.seconds * 1000); // Convert seconds to milliseconds
          const formattedStartDate = moment(startDate).format('MMMM');
          // alert(formattedStartDate);

          if (
            formattedStartDate.toLowerCase().trim() ===
            value.toLowerCase().trim()
          ) {
            arr.push(data);
            data.id = snapshot.id;
            total_Purchase += data.Purchaseitem;
            total_sale += data.saleitem;
            total = total_Purchase - total_sale;
          }
        });
        setStock(arr);
        setTotalpurchase(total_Purchase);
        setTotalsale(total_sale);
        setTotalAmounts(total);
      })
      .catch(error => {
        console.log('Error getting data:', error);
      });
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [selectCategory, value]),
  );
  // const renderHeader = () => (
  //   <View
  //     style={{
  //       flexDirection: 'row',
  //       justifyContent: 'space-between',
  //       padding: 10,
  //       borderBottomWidth: 1.5,
  //       // width: '95%',
  //       marginHorizontal: 10,
  //       // alignSelf: 'center',
  //       height: 60,
  //       alignItems: 'center',
  //       borderTopColor: inputtitlecolor,
  //       borderBottomColor: inputtitlecolor,
  //     }}>
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         justifyContent: 'space-between',
  //       }}>
  //       <Text style={styles.headerflh}>Date</Text>
  //       <Text style={[styles.headerflh, {marginLeft: 60}]}>From</Text>
  //     </View>
  //     <Text style={styles.headerflh}>Qty</Text>
  //   </View>
  // );
  const data = [
    {id: '1', date: '22-03-29', name: 'Avenue Poultech', price: '₹ 40,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
    {id: '1', date: '22-03-29', name: 'MG Poultry Farm', price: '₹ 70,000'},
  ];

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
          marginTop: 40,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <TouchableOpacity style={[styles.btn]}>
          <Text style={styles.btnname}>Stock</Text>
          {/* <Text style={styles.btnname}>+</Text> */}
        </TouchableOpacity>
        {/* <View
          style={{
            width: Dimensions.get('screen').width / 1.1,
            height: '70%',
            borderWidth: 1,
            borderColor: '#E8ECF2',
            marginTop: 30,
            padding: 10,
            borderRadius: 5,
            alignSelf: 'center',
            // marginBottom: 10,
          }}>
          {Stock.length === 0 ? (
            <View>
              <Text style={styles.btnname}>Data not Found</Text>
            </View>
          ) : (
            <View>
             

              <FlatList
                data={Stock}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        borderBottomWidth: 0.7,

                        marginBottom: 7,
                        height: 60,
                        alignItems: 'center',
                        borderTopColor: inputtitlecolor,
                        borderBottomColor: inputtitlecolor,
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.headerfl}>{item.item}</Text>
                       
                      </View>
                      <Text style={styles.headerfl}>{item.Qty}</Text>
                    </View>
                  );
                }}
                
              />
            </View>
          )}
        </View> */}
        <View>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <View style={styles.column}>
                <Text style={styles.title}>Item</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.title}>Purchase</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.title}>Sale</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.title}>Stock</Text>
              </View>
            </View>
            {Stock.length === 0 ? (
              <View style={{alignSelf: 'center', marginTop: 40}}>
                <Text style={styles.btnname}>
                  Data not found by your filter month
                </Text>
              </View>
            ) : (
              <FlatList
                data={Stock}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              position: 'absolute',
              bottom: 10,
              backgroundColor: '#FAF3DC',
              justifyContent: 'space-between',
              flexDirection: 'row',
            },
          ]}>
          <Text style={styles.btnname}>Total</Text>
          <Text style={styles.btnname}>{formatAmount(Totalpurchase)}</Text>
          <Text style={styles.btnname}>{formatAmount(TotlaSale)}</Text>
          <Text style={styles.btnname}>{formatAmount(TotalAmounts)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Stock;
