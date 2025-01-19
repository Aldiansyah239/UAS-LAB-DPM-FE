import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import OfficeInventoryScreen from '../screens/OfficeInventoryScreen';
import InventoryRecordScreen from '../screens/InventoryRecordScreen';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ label, color }: { label: string; color: string }) => (
  <Text style={[styles.tabLabel, { color }]}>{label}</Text>
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FCE4E4',
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopColor: '#FF5C5C',
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: '#A10000',
        tabBarInactiveTintColor: '#FF5C5C', 
        tabBarLabel: ({ focused, color }) => {
          const label =
            route.name === 'Home'
              ? 'Home'
              : route.name === 'Office Inventory'
              ? 'Office Inventory'
                : route.name === 'Inventory Record'
              ? 'Inventory Record'
              : 'Inventory Record';
          return <CustomTabBarLabel label={label} color={color} />;
        },
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Office Inventory') {
              iconName = 'plus';
            } else if (route.name === 'Inventory Record') {
              iconName = 'bars';
            } else {
              iconName = 'question'; 
            }

            return <AntDesign name={iconName} size={size} color={color} />;
          },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Office Inventory" component={OfficeInventoryScreen} />
      <Tab.Screen name="Inventory Record" component={InventoryRecordScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default BottomNavigator;
