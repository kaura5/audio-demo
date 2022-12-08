import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ListScreen from './components/ListScreen'
import CreateScreen from './components/CreateScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {DataProvider} from './context/dataContext'


import {SafeAreaProvider} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <DataProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Create" component={CreateScreen} options={{headerShown: false}} />
            <Tab.Screen name="List" component={ListScreen} options={{headerShown: false}} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
