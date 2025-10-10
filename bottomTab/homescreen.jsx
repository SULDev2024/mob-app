import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#555" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search BAAF"
          placeholderTextColor="#555"
          style={styles.searchInput}
        />
      </View>

   
      <View style={styles.tabsContainer}>
        {["BAAF Lists", "Prime", "Video"].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tabButton}>
            <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      
      <Image
        source={{
          uri:{'http/www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ffashion-model&psig=AOvVaw0Jz1w0K8mXnX5Kf3cXQX6G&ust=1696065600000000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj1kq6T1P4CFQAAAAAdAAAAABAE'},
        }}
        style={styles.bannerImage}
        resizeMode="cover"
      />

      
      <View style={styles.newArrivalsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            "https://i.ibb.co/x83LwKQ/model1.jpg",
            "https://i.ibb.co/zRFBkKc/model2.jpg",
            "https://i.ibb.co/3R9kmx3/model3.jpg",
            "https://i.ibb.co/xM7KcnL/model4.jpg",
          ].map((uri, index) => (
            <View key={index} style={styles.arrivalCard}>
              <Text style={styles.arrivalLabel}>New Arrivals</Text>
              <Image source={{ uri }} style={styles.arrivalImage} resizeMode="cover" />
            </View>
          ))}
        </ScrollView>
      </View>

     
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Sign in for your best experience</Text>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign in Security</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },

 
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#8B008B",
    paddingVertical: 10,
  },
  tabButton: {},
  tabText: {
    color: "#eee",
    fontSize: 16,
  },
  activeTabText: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 4,
    fontWeight: "bold",
  },

  
  bannerImage: {
    width: "100%",
    height: 200,
  },

  
  newArrivalsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  arrivalCard: {
    width: 120,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  arrivalLabel: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  arrivalImage: {
    width: "100%",
    height: 120,
  },

  
  signInContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
