import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;

  const handleAddToCart = () => {
    Alert.alert("Success", `${product.title} added to your cart!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔹 Product Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* 🔹 Product Info Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      {/* 🔹 Add to Cart Button */}
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart 🛒</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
  },

  imageContainer: {
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginBottom: 25,
  },

  image: {
    width: "100%",
    height: 350,
    borderRadius: 15,
  },

  detailsContainer: {
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },

  price: {
    fontSize: 22,
    color: "#007AFF",
    fontWeight: "600",
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },

  cartButton: {
    backgroundColor: "#FFD700", // Gold color
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },

  buttonText: {
    color: "#333",
    fontSize: 17,
    fontWeight: "700",
  },
});
