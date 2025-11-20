// src/navigation/index.jsx
import { registerRootComponent } from "expo";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../bottomTab/firebaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartProvider } from "../context/CartContext";

// Screens (adjust imports to your file locations)
import HomeScreen from "../bottomTab/homescreen";
import CartScreen from "../bottomTab/cartscreen";
import ProfileScreen from "../bottomTab/profilescreen";
import ProductDetailScreen from "../bottomTab/productDetailScreen";
import SearchResultsScreen from "../bottomTab/searchResultsScreen";
import LoginScreen from "../bottomTab/login";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// navigation ref so we can navigate from outside components (auth listener)
const navigationRef = createNavigationContainerRef();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 65,
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          if (route.name === "Home") {
            iconSource = focused
              ? require("../Icons/focusedHome-01.png")
              : require("../Icons/nonActiveHome-02.png");
          } else if (route.name === "Cart") {
            iconSource = focused
              ? require("../Icons/focusedCart-01.png")
              : require("../Icons/nonActiveCart-02.png");
          } else if (route.name === "Profile") {
            iconSource = focused
              ? require("../Icons/foucusedProfile-01.png")
              : require("../Icons/nonActiveProfile-02.png");
          }
          return (
            <View style={{ alignItems: "center" }}>
              {focused && (
                <View
                  style={{
                    width: 35,
                    height: 3,
                    backgroundColor: "#007AFF",
                    borderRadius: 2,
                    marginBottom: 5,
                  }}
                />
              )}
              <Image
                source={iconSource}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#007AFF" : "gray",
                  marginBottom: 10,
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function IndexNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          title: "Product Details",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#007AFF",
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          headerShown: true,
          title: "Search Results",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "#007AFF",
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: true, title: "Sign In" }}
      />

      
    
      
    </Stack.Navigator>
  );
}


function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (navigationRef.isReady()) {
          if (user) {
            // if signed in, ensure main tabs are shown
            navigationRef.navigate("MainTabs");
          } else {
            // if signed out, go to Login
            navigationRef.navigate("Login");
          }
        }
      } catch (e) {
        // ignore navigation errors during startup
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer ref={navigationRef}>
        <IndexNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}

registerRootComponent(App);
