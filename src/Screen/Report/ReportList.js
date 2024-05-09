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
import Dialog from 'react-native-dialog';
import {RadioButton} from 'react-native-paper';

import moment from 'moment';
import {Medium, Regular} from '../../Utils/FontFamily/Fonfamily';
import MonthlyBox from '../../components/Customs/MonthlyBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Close from '../../../assets/images/Close';
const ReportList = props => {
  const [userid, setUserid] = React.useState();
  const [datashow, setdatashow] = React.useState(false);
  const [Totalpurchase, setTotalpurchase] = React.useState('');

  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [userData, setUserdata] = React.useState([]);
  const [selectCategory, setSelctCategory] = React.useState('Suppliers');
  const [TotalAmounts, setTotalAmounts] = React.useState('');
  const [value, setValue] = useState(moment(new Date()).format('MMMM'));
  const [FarmVisible, setFarmVisible] = React.useState(false);
  const [farmname, setFarmname] = React.useState('');
  const [farmData, setfarmData] = React.useState([]);
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
    if (selectCategory === 'Suppliers') {
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
    } else {
      await firebase
        .firestore()
        .collection('customer_records')
        .where('companyId', '==', userid)

        // Filter by company ID

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
    }
    setLoading(false);
  };

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
  const [searchValue, setSearchValue] = useState('');
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
  const renderItem = ({item}) => {
    console.log('>???>?>??>', item.StartDate);
    const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
    const formattedStartDate = moment(startDate).format('DD-MMM-YY');

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <TouchableOpacity
          // onPress={() => props.navigation.navigate('PurchaseEdit', {data: item})}
          >
            <View style={styles.rowContainer1}>
              <View style={styles.column}>
                <Text style={styles.text}>{formattedStartDate}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>{item.Type}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>{item.qty}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.text}>
                  {item.Type == 'Payment' || item.Type == 'Sales' ? '-' : null}
                  {item.route === 'payment'
                    ? formatAmount(item.PaymentAmount)
                    : formatAmount(item.Amounts)}
                  {/* {item.Amounts} */}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  const renderItem2 = ({item}) => {
    console.log('>???>?>??>', item.StartDate);
    const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
    const formattedStartDate = moment(startDate).format('DD-MMM-YY');

    return (
      <View style={{flex: 1}}>
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
                <Text style={styles.text}>
                  {item.Type == 'Payment'
                    ? //  || item.route == 'receipt'
                      '-'
                    : null}
                  {item.route === 'payment' || item.route == 'receipt'
                    ? formatAmount(item.PaymentAmount)
                    : selectCategory === 'Suppliers' ||
                      selectCategory === 'Customer'
                    ? formatQty(item.qty)
                    : formatAmount(item.Amounts)}
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
      .collection(selectCategory)
      .where('companyId', '==', userid)
      .orderBy('StartDate', 'asc')

      // Filter by company ID
      .get()
      .then(querySnapshot => {
        const arr = [];
        let totalamnt = 0;
        let totalpayment = 0;

        let total = 0;
        let totalqty = 0;

        let totalpurchase = 0;
        let totalcustomer = 0;
        let totalreciept = 0;

        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          data.id = snapshot.id;
          // total += data.Amounts;

          const startDate = new Date(data.StartDate.seconds * 1000); // Convert seconds to milliseconds
          const formattedStartDate = moment(startDate).format('MMMM');
          console.log(formattedStartDate, value);
          if (value && !farmname) {
            // Filter by month only
            if (
              formattedStartDate.toLowerCase().trim() ===
              value.toLowerCase().trim()
            ) {
              arr.push(data);
              total += data.Amounts;
              // alert('wor');
            }
          } else if (!value && farmname) {
            // Filter by farm only
            // if (farmname === data.farm) {
            //   arr.push(data);
            //   if (data.route === 'Suppliers' && farmname === data.farm) {
            //     totalamnt += data.SuppliersAmount;
            //   }
            //   if (data.route === 'payment' && farmname === data.farm) {
            //     totalpayment += data.PaymentAmounts;
            //   }
            //   if (data.route === 'Customer' && farmname === data.farm) {
            //     totalamnt += data.CustomerAmount;
            //   }
            //   if (data.route === 'payment' && farmname === data.farm) {
            //     total = totalamnt - totalpayment;
            //   }
          } else if (value && farmname) {
            // Filter by both month and farm
            if (
              formattedStartDate.toLowerCase().trim() ===
                value.toLowerCase().trim() &&
              farmname === data.farm
            ) {
              arr.push(data);

              // totalpurchase += data.SuppliersAmount;
              // totalpayment += data.PaymentAmounts;
              // console.log('>>>>>>>>>>>>>>>', totalpurchase);

              if (data.route === 'Suppliers') {
                totalpurchase += data.SuppliersAmount;
              }
              if (data.route === 'payment') {
                totalpayment += data.PaymentAmount;
              }
              if (selectCategory === 'Suppliers') {
                total = totalpurchase - totalpayment;
                if (typeof data.qty === 'number') {
                  totalqty += data.qty;
                } else if (data.qty === undefined) {
                  totalqty += 0;
                }
              }
              if (data.route === 'Customer') {
                totalcustomer += data.CustomerAmount;
              }
              if (selectCategory === 'Customer' && data.Type === 'Receipt') {
                totalreciept += data.PaymentAmount;
              }
              if (selectCategory === 'Customer') {
                total = totalcustomer - totalreciept;
                if (typeof data.qty === 'number') {
                  totalqty += data.qty;
                } else if (data.qty === undefined) {
                  totalqty += 0;
                }
              }

              // if (data.route === 'payment' && farmname === data.farm) {
              //   totalpayment += data.PaymentAmounts;
              // }
              // if (data.route === 'Customer' && farmname === data.farm) {
              //   totalamnt += data.CustomerAmount;
              // }

              // if (data.route === 'payment' && farmname === data.farm) {
              //   total = totalamnt - totalpayment;
              // }
            }
          } else {
            // No filters applied
            arr.push(data);
            // if (data.route === 'payment' && farmname === data.farm) {
            //   total = data.PaymentAmounts - data.Amounts;
            // }
            // total += data.Amounts;
          }
        });
        setUserdata(arr);
        setTotalAmounts(total);
        setTotalpurchase(totalqty);
      })
      .catch(error => {
        setLoading(false);
        console.log('Error getting data:', error);
      });
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [userid]),
  );
  React.useEffect(() => {
    getData();
    getFarms();
  }, [value, selectCategory, userid, farmname]);
  const [dialogVisible1, setdialogVisible1] = React.useState(false);

  return (
    <View style={styles.main}>
      <MonthlyBox
        checked={value}
        setChecked={setValue}
        monthlyboxvisible={dialogVisible1}
        setmonthlyboxvisible={setdialogVisible1}
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
                          setdatashow(true);
                      }}>
                      <RadioButton
                        value={item.name}
                        status={
                          farmname === item.name ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          setFarmname(item.name) & setFarmVisible(false);
                          setdatashow(true);
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
          <View>
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
                alignSelf: 'center',
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
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => {
            selectCategory === 'Suppliers'
              ? setSelctCategory('Customer') &
                setFarmname('') &
                setdatashow(false)
              : setSelctCategory('Suppliers') &
                setFarmname('') &
                setdatashow(false);
          }}>
          <Text style={styles.btnname}>{selectCategory}</Text>
          {/* <Text style={styles.btnname}>+</Text> */}
        </TouchableOpacity>
        {datashow == false ? (
          // pehrin hi set thyal ahy aj 4-8-23 ty docuemtn hjy hsiab san set kayan pyo ager chawan t pehrin waro kari dy t view het waro uncomment karno ahy aen hi view comment karno ahy
          // <View
          //   style={{
          //     width: Dimensions.get('screen').width / 1.1,
          //     height: '70%',
          //     borderWidth: 1,
          //     borderColor: '#E8ECF2',
          //     marginTop: 30,
          //     padding: 10,
          //     borderRadius: 5,
          //     alignSelf: 'center',
          //     // marginBottom: 10,
          //   }}>
          //   {userData.length === 0 ? (
          //     <View>
          //       <Text style={styles.btnname}>
          //         Data not found by your filter month
          //       </Text>
          //     </View>
          //   ) : (
          //     <FlatList
          //       data={userData}
          //       keyExtractor={item => item.id}
          //       renderItem={({item}) => {
          //         const startDate = new Date(item.StartDate.seconds * 1000); // Convert seconds to milliseconds
          //         const formattedStartDate =
          //           moment(startDate).format('DD-MMM-YY');
          //         return (
          //           <View
          //             style={{
          //               flexDirection: 'row',
          //               justifyContent: 'space-between',
          //               padding: 10,
          //               borderBottomWidth: 0.7,
          //               // width: '95%',
          //               // marginHorizontal: 10,
          //               // alignSelf: 'center',
          //               marginBottom: 7,
          //               height: 60,
          //               alignItems: 'center',
          //               borderTopColor: inputtitlecolor,
          //               borderBottomColor: inputtitlecolor,
          //             }}>
          //             <View
          //               style={{
          //                 justifyContent: 'space-between',
          //               }}>
          //               <Text style={[styles.headerfl, {marginBottom: 0}]}>
          //                 {item.farm}
          //               </Text>
          //               <Text style={[styles.headerfl]}>
          //                 {formattedStartDate}
          //               </Text>
          //             </View>
          //             <Text style={styles.headerfl}>
          //               {item.route === 'payment' ? '-' : '+'}
          //               {item.route === 'payment'
          //                 ? formatAmount(item.PaymentAmount)
          //                 : formatAmount(item.Amounts)}
          //             </Text>
          //           </View>
          //         );
          //       }}
          //       // ListHeaderComponent={renderHeader}
          //     />
          //   )}
          // </View>
          <View>
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                <View style={styles.column}>
                  <Text style={styles.title}>Date</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.title}>
                    {selectCategory === 'Suppliers' ? 'From' : 'To'}
                  </Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.title}>
                    {/* {selectCategory === 'Suppliers' ? 'Qty' : 'Amount'} */}
                    Qty
                  </Text>
                </View>
              </View>
              {userData.length === 0 ? (
                <View style={{alignSelf: 'center', marginTop: 40}}>
                  <Text style={styles.btnname}>
                    Data not found by your filter month
                  </Text>
                </View>
              ) : (
                <View>
                  <ScrollView contentContainerStyle={{paddingBottom: 300}}>
                    <FlatList
                      data={userData}
                      renderItem={renderItem2}
                      keyExtractor={item => item.id.toString()}
                    />
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                <View style={styles.column}>
                  <Text style={styles.title}>Date</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.title}>Type</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.title}>Qty</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.title}>Amount</Text>
                </View>
              </View>
              {userData.length === 0 ? (
                <View style={{alignSelf: 'center', marginTop: 40}}>
                  <Text style={styles.btnname}>
                    Data not found by your filter month
                  </Text>
                </View>
              ) : (
                <View>
                  <ScrollView contentContainerStyle={{paddingBottom: 400}}>
                    <FlatList
                      data={userData}
                      renderItem={renderItem}
                      keyExtractor={item => item.id.toString()}
                    />
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        )}
        {datashow ? (
          <TouchableOpacity
            style={[
              styles.btn,
              {
                position: 'absolute',
                bottom: 10,
                backgroundColor: '#FAF3DC',
              },
            ]}>
            <Text style={styles.btnname}>Total</Text>
            <Text style={styles.btnname}></Text>

            <Text style={[styles.btnname, {marginLeft: 90}]}>
              {' '}
              {formatQty(Totalpurchase)}
            </Text>
            <Text style={styles.btnname}>{formatAmount(TotalAmounts)}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
export default ReportList;
