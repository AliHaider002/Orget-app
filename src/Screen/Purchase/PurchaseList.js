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
import {firebase} from '@react-native-firebase/firestore';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Button/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import MonthlyBox from '../../components/Customs/MonthlyBox';
import {Medium, Regular} from '../../Utils/FontFamily/Fonfamily';
import Close from '../../../assets/images/Close';
import Dialog from 'react-native-dialog';
import {RadioButton} from 'react-native-paper';

const PurchaseList = props => {
  const [data, setuserData] = React.useState([]);
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [FarmVisible, setFarmVisible] = React.useState(false);

  const [farmname, setFarmname] = React.useState('');
  const [farmData, setfarmData] = React.useState([]);
  const [showfilter, setshowfilter] = React.useState(false);
  const [TotalAmounts, setTotalAmounts] = React.useState('');
  const [Totalpurchase, setTotalpurchase] = React.useState('');
  const [dialogVisible1, setdialogVisible1] = React.useState(false);

  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [userid, setUserid] = React.useState();
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
  const [searchValue, setSearchValue] = useState('');
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
  const renderItem = ({item}) => {
    console.log('>???>?>??>', item.StartDate);
    const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
    const formattedStartDate = moment(startDate).format('DD-MMM-YY');

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('PurchaseEdit', {data: item})}>
        <View style={styles.rowContainer1}>
          <View style={styles.column}>
            <Text style={styles.text}>{formattedStartDate}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>{item.farm}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>
              {/* {item.qty} */}
              {formatQty(item.qty)}
            </Text>
          </View>
          {/* <View style={styles.column}>
            {item.hasOwnProperty('rate') ? (
              <Text style={styles.text}>{item.rate}</Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View> */}
        </View>
        {/* {userid == item?.userid ? (
      ) : null} */}
      </TouchableOpacity>
    );
  };
  const renderItem2 = ({item}) => {
    // console.log('>???>?>??>', item);
    const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
    const formattedStartDate = moment(startDate).format('DD-MMM-YY');

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('PurchaseEdit', {data: item})}>
        <View style={styles.rowContainer1}>
          <View style={styles.column}>
            <Text style={styles.text}>{formattedStartDate}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}> {formatQty(item.qty)}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.text}>
              {/* {item.Amounts} */}
              {formatAmount(item.Amounts)}
            </Text>
          </View>
          {/* <View style={styles.column}>
            {item.hasOwnProperty('rate') ? (
              <Text style={styles.text}>{item.rate}</Text>
            ) : (
              <Text style={styles.text}>-</Text>
            )}
          </View> */}
        </View>
        {/* {userid == item?.userid ? (
      ) : null} */}
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1.5,
        // width: '95%',
        marginHorizontal: 10,
        // alignSelf: 'center',
        height: 60,
        alignItems: 'center',
        borderTopColor: inputtitlecolor,
        borderBottomColor: inputtitlecolor,
      }}>
      <Text style={styles.headerflh}>Date</Text>
      <Text style={[styles.headerflh]}>From</Text>
      <Text style={styles.headerflh}>Qty</Text>
    </View>
  );
  // const data = [
  //   {id: '1', date: '22-03-29', from: 'A', qty: 5},
  //   {id: '2', date: '22-03-30', from: 'B', qty: 10},
  //   {id: '3', date: '22-03-31', from: 'C', qty: 15},
  // ];
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
  const getFarms = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('supplier_records')
      .where('companyId', '==', userid) // Filter by company ID

      .get()
      .then(querySnapshot => {
        const arr = [];
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          data.id = snapshot.id;

          arr.push(data);

          // alert(formattedStartDate);
        });
        setfarmData(arr);
      })
      .catch(error => {
        console.log('Error getting data:', error);
      });
    setLoading(false);
  };
  const getData = async () => {
    setLoading(true);
    await firebase
      .firestore()
      .collection('Suppliers')
      // .orderBy('Suppliers', 'desc')
      .where('companyId', '==', userid)
      .where('route', '==', 'Suppliers')
      .orderBy('StartDate', 'asc')
      // .orderBy('desc')
      .get()
      .then(querySnapshot => {
        const arr = [];
        let total = 0;
        let totalqty = 0;

        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          data.id = snapshot.id;

          const startDate = new Date(data.StartDate.seconds * 1000); // Convert seconds to milliseconds
          const formattedStartDate = moment(startDate).format('MMMM');

          if (value && !farmname) {
            // Filter by month only
            if (
              formattedStartDate.toLowerCase().trim() ===
              value.toLowerCase().trim()
            ) {
              arr.push(data);
              if (farmname === data.farm) {
              }
            }
          } else if (!value && farmname) {
            // Filter by farm only
            // if (farmname === data.farm) {
            //   arr.push(data);
            // }
          } else if (value && farmname) {
            // setshowfilter(false);
            // Filter by both month and farm
            if (
              formattedStartDate.toLowerCase().trim() ===
                value.toLowerCase().trim() &&
              farmname === data.farm
            ) {
              arr.push(data);

              total += data.Amounts;
              totalqty += data.qty;

              console.log('))))', total);
            }
          } else {
            // No filters applied
            arr.push(data);
          }
        });
        setTotalAmounts(total);
        setTotalpurchase(totalqty);

        setuserData(arr);
      })
      .catch(error => {
        console.log('Error getting data:', error);
      });
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setValue(moment(new Date()).format('MMMM'));
      getData();
      setFarmname('');
      setshowfilter(false);
      getFarms();
    }, [userid]),
  );
  React.useEffect(() => {
    getData();
    getFarms();
  }, [value, farmname]);
  return (
    <View style={styles.main}>
      <Header
        backPress={() => props.navigation.navigate('Home')}
        dropdown={
          <View>
            <TouchableOpacity
              onPress={() => setdialogVisible1(true)}
              style={{
                width: Dimensions.get('screen').width / 2.6,
                borderWidth: 1,
                borderColor: '#F4F6F9',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                backgroundColor: '#E8ECF2',
              }}>
              <Text
                style={{fontSize: 16, fontFamily: Medium, color: textcolor}}>
                {value}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFarmVisible(true)}
              style={{
                width: Dimensions.get('screen').width / 2.6,
                borderWidth: 1,
                borderColor: '#F4F6F9',
                borderRadius: 5,
                fontSize: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                marginTop: 10,
                backgroundColor: '#E8ECF2',
              }}>
              <Text
                style={{fontSize: 16, fontFamily: Medium, color: textcolor}}>
                {farmname === '' ? 'Filter by Farm' : farmname}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <Dialog.Container
        visible={FarmVisible}
        contentStyle={{
          borderRadius: 10,
          backgroundColor: WhiteColor,
          width: Dimensions.get('screen').width / 1.2,
        }}>
        <View>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginBottom: 10}}
            onPress={() => setFarmVisible(false)}>
            <Close />
          </TouchableOpacity>
          {farmData.length <= 0 ? (
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontFamily: Medium,
              }}>
              No data Found
            </Text>
          ) : (
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: Medium,
                }}>
                Filter by
              </Text>
              <FlatList
                data={farmData}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setFarmname(item.name) &
                          setFarmVisible(false) &
                          setshowfilter(true);
                      }}>
                      <RadioButton
                        value={item.name}
                        status={
                          farmname === item.name ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          setFarmname(item.name) & setFarmVisible(false);
                          setshowfilter(true);
                        }}
                      />
                      <Text
                        style={{
                          color: farmname === item.name ? primary : textcolor,
                          fontSize: 16,
                          fontFamily: Regular,
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>
      </Dialog.Container>
      <MonthlyBox
        checked={value}
        setChecked={setValue}
        monthlyboxvisible={dialogVisible1}
        setmonthlyboxvisible={setdialogVisible1}
      />
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
      {showfilter === false ? (
        <View
          style={{
            width: '100%',
            flex: 1,
            marginTop: 40,
            height: '100%',
            backgroundColor: '#F5F5F5',
          }}>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={
              () => props.navigation.navigate('PurchaseNew')
              // setValue(new Date()).format('MMMM')
            }>
            <Text style={styles.btnname}>Purchase </Text>
            <Text style={styles.btnname}>+</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <View style={styles.column}>
                <Text style={styles.title}>Date</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.title}>From</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.title}>Qty</Text>
              </View>
            </View>
            {data.length === 0 ? (
              <View style={{alignSelf: 'center', marginTop: 40}}>
                <Text style={styles.btnname}>
                  Data not found by your filter month
                </Text>
              </View>
            ) : (
              <View>
                <ScrollView
                  contentContainerStyle={{paddingBottom: 250}}
                  showsVerticalScrollIndicator={false}>
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                  />
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flex: 1,
            marginTop: 40,
            height: '100%',
            backgroundColor: '#F5F5F5',
          }}>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => props.navigation.navigate('PurchaseNew')}>
            <Text style={styles.btnname}>Purchase </Text>
            <Text style={styles.btnname}>+</Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <View style={styles.column}>
                <Text style={styles.title}>Date</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.title}>Qty</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.title}>Amount</Text>
              </View>
            </View>
            {data.length === 0 ? (
              <View style={{alignSelf: 'center', marginTop: 40}}>
                <Text style={styles.btnname}>
                  Data not found by your filter month
                </Text>
              </View>
            ) : (
              <View>
                <ScrollView contentContainerStyle={{paddingBottom: 300}}>
                  <FlatList
                    data={data}
                    renderItem={renderItem2}
                    keyExtractor={item => item.id.toString()}
                  />
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      )}
      {showfilter == true ? (
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
          <Text style={[styles.btnname, {marginLeft: 50}]}>
            {formatQty(Totalpurchase)}
          </Text>
          <Text style={styles.btnname}>{formatAmount(TotalAmounts)}</Text>
          {/* <Text style={styles.btnname}>{TotalAmounts}</Text> */}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default PurchaseList;
// Custom sorting function
// arr.sort((a, b) => {
//   const aDate = a.StartDate.seconds;
//   const bDate = b.StartDate.seconds;

//   if (aDate === bDate) {
//     // If dates are the same, show the most recent data on top
//     return b.id.localeCompare(a.id); // Compare IDs in reverse order
//   } else {
//     return aDate - bDate; // Ascending order based on StartDate
//   }
// });
