import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../Screen/Home/Home';
import Login from '../Screen/Login/Login';
import VerifyScreen from '../Screen/Login/VerifyScreen';
import PaymentEdit from '../Screen/Payment/PaymentEdit';
import PaymentList from '../Screen/Payment/PaymentList';
import PaymentNew from '../Screen/Payment/PaymentNew';
import PurchaseEdit from '../Screen/Purchase/PurchaseEdit';
import PurchaseList from '../Screen/Purchase/PurchaseList';
import PurchaseNew from '../Screen/Purchase/PurchaseNew';
import ReciptEdit from '../Screen/Recipt/ReciptEdit';
import ReciptList from '../Screen/Recipt/ReciptList';
import ReciptNew from '../Screen/Recipt/ReciptNew';
import ReportList from '../Screen/Report/ReportList';
import Stock from '../Screen/Report/Stock';
import SaleEdit from '../Screen/Sale/SaleEdit';
import SaleList from '../Screen/Sale/SaleList';
import SaleNew from '../Screen/Sale/Salenew';
import Wellcome from '../Screen/Wellcome/Wellcome';
import Signup from '../Screen/Login/Signup';
import RegisterCompany from '../Screen/RegisterCompany/RegisterCompany';
import UpdateProfile from '../Screen/RegisterCompany/UpdateProfile';
import Balance from '../Screen/Report/Balance';

const MainNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Wellcome">
        <Stack.Screen
          component={Wellcome}
          name="Wellcome"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Login}
          name="Login"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Signup}
          name="Signup"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={VerifyScreen}
          name="VerifyScreen"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PurchaseList}
          name="PurchaseList"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PurchaseNew}
          name="PurchaseNew"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PurchaseEdit}
          name="PurchaseEdit"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={SaleList}
          name="SaleList"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={SaleEdit}
          name="SaleEdit"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={SaleNew}
          name="SaleNew"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PaymentList}
          name="PaymentList"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PaymentEdit}
          name="PaymentEdit"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PaymentNew}
          name="PaymentNew"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ReciptList}
          name="ReciptList"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ReciptEdit}
          name="ReciptEdit"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ReciptNew}
          name="ReciptNew"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ReportList}
          initialParams={{from: 'Suppliers'}}
          name="ReportList"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Stock}
          name="Stock"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={RegisterCompany}
          name="RegisterCompany"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={UpdateProfile}
          name="UpdateProfile"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Balance}
          name="Balance"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
