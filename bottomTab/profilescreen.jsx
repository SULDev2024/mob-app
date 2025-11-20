import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";

// Use the project's initialized Firebase instances
import { auth, db, storage } from "./firebaseConfig";

export default function ProfileScreen() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ orders: 0, wishlist: 0, saved: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setStats({
          orders: data.orders || 0,
          wishlist: data.wishlist || 0,
          saved: data.saved || 0,
        });
      }
    } catch (e) {}
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  }

  async function uploadImage(uri) {
    try {
      setLoading(true);

      const response = await fetch(uri);
      const blob = await response.blob();

      const imgRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(imgRef, blob);

      const url = await getDownloadURL(imgRef);
      setPhotoURL(url);

      await updateProfile(user, { photoURL: url });
      await setDoc(
        doc(db, "users", user.uid),
        { photoURL: url },
        { merge: true }
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Image upload failed.");
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER CARD */}
      <View style={styles.headerCard}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: photoURL || "https://www.gravatar.com/avatar/?d=mp&f=y" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarBtn} onPress={pickImage}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.nameText}>{displayName || "User"}</Text>
        <Text style={styles.emailText}>{user.email}</Text>

        {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      </View>

      {/* QUICK STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.orders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.wishlist}</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.saved}</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>

      {/* SETTINGS LIST */}
      <Text style={styles.sectionTitle}>Account Settings</Text>

      <View style={styles.settingsBox}>
        <SettingItem icon="lock-closed" title="Change Password" />
        <SettingItem icon="notifications" title="Notifications" />
        <SettingItem icon="shield-checkmark" title="Security" />
        <SettingItem icon="location" title="Address Book" />
        <SettingItem icon="card" title="Payment Methods" />
        <SettingItem icon="help-circle" title="Help Center" />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => auth.signOut()}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function SettingItem({ icon, title }) {
  return (
    <TouchableOpacity style={styles.settingItem}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        <Ionicons name={icon} size={22} color="#8B008B" />
        <Text style={styles.settingLabel}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 20,
  },

  headerCard: {
    marginTop: 30,
    backgroundColor: "#fff",
    paddingVertical: 30,
    borderRadius: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "#eee",
  },

  editAvatarBtn: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#8B008B",
    width: 34,
    height: 34,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  nameText: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
  },

  emailText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 2,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 13,
    color: "#777",
  },

  sectionTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  settingsBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  settingItem: {
    height: 56,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingLabel: {
    fontSize: 16,
    color: "#222",
  },

  logoutBtn: {
    marginTop: 30,
    alignSelf: "center",
  },

  logoutText: {
    color: "#E44A4A",
    fontSize: 16,
    fontWeight: "600",
  },
});

