import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useAuth} from '../contexts/AuthContext';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Budget from '../screens/Budget';
import {CreateTransaction} from '../screens/CreateTransaction';
import TransactionScreen from '../screens/Transaction';
import { CreateBudget } from '../screens/CreateBudget';
import { CreateBalance } from '../screens/CreateBalance';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AuthenticatedDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#4B5563',
        drawerInactiveTintColor: '#9CA3AF',
        drawerStyle: {
          backgroundColor: '#F9FAFB',
        },
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Orçamento" component={Budget} />
      <Drawer.Screen name="Transações" component={TransactionScreen} />
    </Drawer.Navigator>
  );
}

export default function AppRoutes() {
  const {isAuthenticated} = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Main" component={AuthenticatedDrawer} />
          <Stack.Screen
            name="CreateTransaction"
            component={CreateTransaction}
          />
          <Stack.Screen
            name="CreateBudget"
            component={CreateBudget}
          />
          <Stack.Screen
            name="CreateBalance"
            component={CreateBalance}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
