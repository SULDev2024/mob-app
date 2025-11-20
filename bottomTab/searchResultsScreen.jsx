// src/bottomTab/searchResultsScreen.jsx
import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function SearchResultsScreen({ route, navigation }) {
  const { results = [], query = "" } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Results for "{query}"</Text>

      {results.length === 0 ? (
        <Text style={styles.noResults}>No products found.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id?.toString() || item.title}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ProductDetail", { product: item })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", padding: 12 },
  noResults: { fontSize: 16, color: "gray", marginTop: 20, textAlign: "center" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  title: { fontSize: 16, fontWeight: "600" },
  price: { color: "#007AFF", marginTop: 6 },
});
