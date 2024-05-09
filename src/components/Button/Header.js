import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SettingIcon from '../../../assets/images/Setting';
import {Regular, SemiBold} from '../../Utils/FontFamily/Fonfamily';
import {WhiteColor, primary, textcolor} from '../../Utils/ColorScheme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebase} from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
const Header = ({backPress, dropdown}) => {
  const [dialogVisible, setdialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [whatopen, setwhatopen] = React.useState('');
  const [userData, setUserdata] = React.useState([]);
  const [userid, setUserid] = React.useState('');
  console.log('JKJJ', userid);
  const getid = async () => {
    const getid1 = await AsyncStorage.getItem('id');
    setUserid(getid1);
  };
  React.useEffect(() => {
    if (userid == undefined || userid === '') {
      getid();
    } else {
      getData();
    }
  }, [userid]);
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
        }

        if (Array.isArray(data.users)) {
          data.users.forEach(user => {
            if (user.number === userid) {
              console.log('___________', user.number, userid);
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

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [userid]),
  );
  return (
    <View>
      <StatusBar backgroundColor={primary} barStyle={'light-content'} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginHorizontal: 20,
        }}>
        <TouchableOpacity onPress={backPress}>
          <AntDesign name={'back'} size={25} color={WhiteColor} />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <FlatList
            data={userData}
            renderItem={({item, index}) => {
              console.log('kamran', item);
              return (
                <View style={styles.headercontext}>
                  <Text style={styles.headertext}>{item.UserName}</Text>
                  <Text style={styles.headertext1}>Mobile {item.number}</Text>
                </View>
              );
            }}
          />
          <View style={{flex: 1, alignItems: 'center', marginBottom: 70}}>
            {dropdown}
          </View>
        </View>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  headercontext: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  headertext: {
    fontSize: 16,
    fontFamily: SemiBold,
    color: WhiteColor,
  },
  headertext1: {
    fontSize: 16,
    fontFamily: Regular,
    color: WhiteColor,
  },
});
