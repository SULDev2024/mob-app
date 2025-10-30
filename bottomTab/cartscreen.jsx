// bottomTab/cartScreen.jsx
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, marginTop: 30 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  emptyText: { fontSize: 16, color: "gray", textAlign: "center", marginTop: 20 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "#333", marginTop: 4 },
  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeText: { color: "#fff", fontWeight: "bold" },
});
