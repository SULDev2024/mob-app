import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../bottomTab/homescreen';
import CartScreen from '../bottomTab/cartscreen';
import ProfileScreen from '../bottomTab/profilescreen';

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 65,
        },

        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../Icons/focusedHome-01.png')
              : require('../Icons/nonActiveHome-02.png');
          } else if (route.name === 'Cart') {
            iconSource = focused
              ? require('../Icons/focusedCart-01.png')
              : require('../Icons/nonActiveCart-02.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../Icons/foucusedProfile-01.png')
              : require('../Icons/nonActiveProfile-02.png');
          }

          return (
            <View style={{ alignItems: 'center' }}>
              
              {focused && (
                <View
                  style={{
                    width: 35,
                    height: 3,
                    backgroundColor: '#007AFF', // line color
                    borderRadius: 2,
                    marginBottom: 5,
                  }}
                />
              )}

              {/* Icon itself */}
              <Image
                source={iconSource}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#007AFF' : 'gray',
                  marginBottom: 10,
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}
