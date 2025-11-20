import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "./firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      // Create a user profile document in Firestore
      await setDoc(doc(db, "users", uid), {
        uid,
        email,
        displayName: displayName || null,
        createdAt: serverTimestamp(),
      });
      setUser(userCredential.user);
      // navigate to Profile tab after successful sign up
      try {
        navigation.navigate("MainTabs", { screen: "Profile" });
      } catch (e) {}
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      // navigate to Profile tab after successful sign in
      try {
        navigation.navigate("MainTabs", { screen: "Profile" });
      } catch (e) {}
    } catch (err) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message || "Sign out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        {user ? (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.welcome}>Welcome, {user.email}</Text>
            <View style={{ height: 12 }} />
            <Button title="Sign Out" onPress={handleSignOut} />
          </View>
        ) : (
          <>
            <Text style={styles.title}>Sign in / Sign up</Text>
            <TextInput
              placeholder="Display name (optional)"
              value={displayName}
              onChangeText={setDisplayName}
              style={styles.input}
              returnKeyType="next"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {loading ? (
              <ActivityIndicator size="small" color="#8B008B" style={{ marginTop: 10 }} />
            ) : (
              <>
                <View style={{ marginVertical: 6 }} />
                <Button title="Sign Up" onPress={handleSignUp} />
                <View style={{ height: 8 }} />
                <Button title="Sign In" onPress={handleSignIn} />
              </>
            )}
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#fff" },
  card: { margin: 20, padding: 18, borderRadius: 10, elevation: 3, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginBottom: 10, borderRadius: 6 },
  welcome: { fontSize: 16, fontWeight: "600" },
  error: { color: "#b00020", marginTop: 6, marginBottom: 6 },
});
