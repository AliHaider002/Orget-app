import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import SettingIcon from '../../../assets/images/Setting';
import {
  WhiteColor,
  inputtitlecolor,
  primary,
  textcolor,
} from '../../Utils/ColorScheme/Colors';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebase} from '@react-native-firebase/auth';
import LoaderModel from '../../components/Customs/LoaderModel';
import MessageBox from '../../components/Customs/MessageBox';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Regular} from '../../Utils/FontFamily/Fonfamily';
import {useFocusEffect} from '@react-navigation/native';

const Home = props => {
  const [userid, setUserid] = React.useState();
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [userData, setUserdata] = React.useState([]);

  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('id');
    console.log('JKJJ', getid1);
    // alert(getid1);
    setUserid(getid1);
  };
  React.useEffect(() => {
    if (userid == undefined) {
      getid();
    } else {
      getData();
      getid();
    }
  }, [userid]);

  const Tab = [
    {
      icon: <AntDesign name="shoppingcart" size={25} color={textcolor} />,
      name: 'Purchase',
    },
    {
      icon: <AntDesign name="linechart" size={25} color={textcolor} />,

      name: 'Sale',
    },
    {
      icon: <FontAwesome name="dollar" size={25} color={textcolor} />,

      name: 'Payments',
    },
    {
      icon: (
        <MaterialCommunityIcons name="book-check" size={25} color={textcolor} />
      ),

      name: 'Receipt',
    },
  ];
  const Tab2 = [
    {
      icon: <FontAwesome5 name="store" size={20} color={textcolor} />,

      name: 'Stock',
    },
    {
      icon: <FontAwesome name="dollar" size={25} color={textcolor} />,

      name: 'Balance',
    },
  ];
  const signOut = async () => {
    await AsyncStorage.removeItem('number');
    await AsyncStorage.removeItem('id');

    await AsyncStorage.removeItem('role');
    props.navigation.replace('Login');
    // try {
    //   // setLoading(true);
    //   // await auth().signOut();
    //   // setLoading(false);
    //   // navigate to your sign-in screen or any other screen you want to redirect after sign out
    // } catch (error) {
    //   setLoading(false);
    //   setdialogVisible(true);
    //   setwhatopen('error');
    //   setMessage('Failed to sign out. Please try again later.');
    // }
  };
  const getData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await firebase
        .firestore()
        .collection('Users')
        .get();

      const arr = [];
      querySnapshot.forEach(snapshot => {
        let data = snapshot.data();
        data.id = snapshot.id;

        if (data.number === userid) {
          arr.push(data);
          console.log('___________', data.UserName, userid);
        }

        if (Array.isArray(data.users)) {
          data.users.forEach(user => {
            if (user.number === userid) {
              console.log('__________fsd', user.number, userid);
              arr.push(user);
            }
          });
        }
      });

      setUserdata(arr);
    } catch (error) {
      console.log('Error getting data:', error);
    }

    setLoading(false);
  };
  // const getData = async () => {
  //   setLoading(true);
  //   await firebase
  //     .firestore()
  //     .collection('Users')
  //     .get()
  //     .then(querySnapshot => {
  //       const arr = [];
  //       let existingUsers = [];
  //       const cleanUserId = userid.replace(/\D/g, ''); // Remove non-numeric characters from userid

  //       querySnapshot.forEach(snapshot => {
  //         let data = snapshot.data();
  //         data.id = snapshot.id;
  //         existingUsers = existingUsers.concat(data.users || []);

  //         const cleanDataCompanyId = data.companyId.replace(/\D/g, ''); // Remove non-numeric characters from data.companyId

  //         // Check if userid is equal to companyId
  //         if (cleanUserId === cleanDataCompanyId) {
  //           arr.push(data);
  //           console.log('userdata', data);
  //         } else {
  //           const users = data.users || [];
  //           // Check if userid matches any user number
  //           const duplicateUser = users.some(user => {
  //             const cleanUserNumber = user.number.replace(/\D/g, ''); // Remove non-numeric characters from user.number
  //             return cleanUserNumber === cleanUserId;
  //           });

  //           if (duplicateUser) {
  //             arr.push(data);
  //             console.log('userdata', data);
  //           }
  //         }
  //       });

  //       setUserdata(arr);
  //     });

  //   setLoading(false);
  // };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      getid();
    }, [userid]),
  );
  return (
    <View style={styles.main}>
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
      <StatusBar backgroundColor={primary} barStyle={'light-content'} />
      <View style={styles.headercon}>
        <TouchableOpacity
          style={styles.imgcon1}
          onPress={() => {
            props.navigation.navigate('UpdateProfile');
          }}>
          {/* onPress={signOut} */}
          {/* <AntDesign name="logout" size={25} color={WhiteColor} /> */}
          <SettingIcon />
        </TouchableOpacity>
        <View style={styles.imgcon}>
          <Image source={require('../../components/assets/Profile.png')} />
        </View>
      </View>
      <View>
        <FlatList
          data={userData}
          renderItem={({item, index}) => {
            console.log('<><><><', item);
            return (
              <View style={styles.headercontext}>
                <Text style={styles.headertext}>{item.UserName}</Text>
                <Text style={styles.headertext1}>Mobile {item.number}</Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          flex: 1,
          marginTop: 40,
          height: '100%',
          backgroundColor: '#F5F5F5',
        }}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <FlatList
              numColumns={2}
              data={Tab}
              renderItem={({item, index}) => {
                return (
                  <View style={{paddingHorizontal: 5, marginBottom: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        item.name == 'Purchase'
                          ? props.navigation.navigate('PurchaseList')
                          : item.name == 'Sale'
                          ? props.navigation.navigate('SaleList')
                          : item.name == 'Payments'
                          ? props.navigation.navigate('PaymentList')
                          : item.name == 'Receipt'
                          ? props.navigation.navigate('ReciptList')
                          : null;
                      }}
                      style={[
                        styles.btn,
                        {
                          backgroundColor:
                            item.name == 'Purchase'
                              ? '#FAF3DC'
                              : item.name == 'Sale'
                              ? '#EAF9E1'
                              : WhiteColor,
                        },
                      ]}>
                      <View style={{marginBottom: 10}}>{item.icon}</View>

                      <Text style={styles.btnname}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ReportList')}
            style={[
              styles.btn,
              {
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                width: Dimensions.get('screen').width / 1.1,
              },
            ]}>
            <View>
              <MaterialIcons name="report" size={23} color={textcolor} />
            </View>
            <Text
              style={{
                fontFamily: Regular,
                color: inputtitlecolor,
                fontSize: 16,
                marginLeft: 10,
                marginTop: 6,
              }}>
              Report
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <FlatList
              numColumns={2}
              data={Tab2}
              renderItem={({item, index}) => {
                return (
                  <View style={{paddingHorizontal: 5, marginBottom: 10}}>
                    <TouchableOpacity
                      onPress={() =>
                        item.name == 'Stock'
                          ? props.navigation.navigate('Stock')
                          : props.navigation.navigate('Balance')
                      }
                      style={[
                        styles.btn,
                        {
                          backgroundColor:
                            item.name == 'Purchase'
                              ? '#FAF3DC'
                              : item.name == 'Sale'
                              ? '#EAF9E1'
                              : WhiteColor,
                        },
                      ]}>
                      <View style={{marginBottom: 10}}>{item.icon}</View>

                      <Text style={styles.btnname}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default Home;
