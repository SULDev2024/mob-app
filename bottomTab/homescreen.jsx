// src/bottomTab/homescreen.jsx
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);

  const bannerScrollX = useRef(new Animated.Value(0)).current;
  const bannerRef = useRef(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchText, setSearchText] = useState("");

  const bannerImages = [
    "https://dc11.ru/loadimg/image/2023_07_04_site_2.jpg",
    "https://img.freepik.com/free-photo/girl-looking-yellow-shopping-bag_23-2148333126.jpg?semt=ais_hybrid&w=740&q=80",
  ];

  // Product objects (titles + images + price + description)
  const products = [
    {
      id: 1,
      title: "Titan Watch",
      image:
        "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwb830e1d4/images/Titan/Catalog/1805QM04_1.jpg?sw=600&sh=600",
      price: "199.00",
      category: "watch",
      description: "A luxury gold finish wristwatch with classic design.",
    },
    {
      id: 2,
      title: "Aafiya Perfume",
      image:
        "https://aafiyaperfumes.com/cdn/shop/files/671D72E5-2D1C-4201-9BFD-253542B2F7AD.jpg?v=1747812750&width=1445",
      price: "49.00",
      category: "perfume",
      description: "Elegant Arabian perfume with long-lasting fragrance.",
    },
    {
      id: 3,
      title: "Otto T-shirt",
      image:
        "https://www.ottostore.com/cdn/shop/files/OTTO05copy3_500x.jpg?v=1755606832",
      price: "25.00",
      category: "tshirt",
      description: "Soft cotton tee with premium stitching and fit.",
    },
    {
      id: 4,
      title: "Wisconline Bag",
      image: "https://www.wisconline.co.uk/images/webp/A48-min.webp",
      price: "59.00",
      category: "bag",
      description: "Durable laptop bag suitable for business and travel.",
    },
    {
      id: 5,
      title: "Sussan Shirt",
      image:
        "https://www.sussan.com.au/media/catalog/product/0/4/040769_001_01.jpg?optimize=low&bg-color=255,255,255&fit=bounds&height=572&width=480&canvas=480:572",
      price: "39.00",
      category: "top",
      description: "Elegant white shirt perfect for office and casual wear.",
    },
    {
      id: 6,
      title: "Classic Jacket",
      image:
        "https://i.pinimg.com/736x/75/96/64/7596648db3c64142a8687a5e035d0ed4.jpg",
      price: "89.00",
      category: "jacket",
      description: "Stylish jacket with modern look for all seasons.",
    },
  ];

  // ===== Smooth Auto Scroll for New Arrivals =====
  useEffect(() => {
    let currentOffset = 0;
    const imageWidth = 130; // card width including margin
    const totalWidth = products.length * imageWidth;
    const visibleWidth = width;

    const interval = setInterval(() => {
      let nextOffset = currentOffset + imageWidth;
      if (nextOffset + visibleWidth >= totalWidth) {
        nextOffset = 0;
      }

      Animated.timing(scrollX, {
        toValue: nextOffset,
        duration: 1800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      scrollRef.current?.scrollTo({ x: nextOffset, animated: true });
      currentOffset = nextOffset;
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  // ===== Smooth Auto Slide for Banner (fade-style) =====
  const bannerFade = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(bannerFade, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bannerFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      const nextIndex = (bannerIndex + 1) % bannerImages.length;
      setBannerIndex(nextIndex);
      bannerRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerIndex]);

  // ===== Search handler (basic hardcoded search) =====
  const handleSearch = () => {
    const q = searchText?.trim().toLowerCase() || "";
    const filtered = products.filter((p) =>
      (p.title + " " + p.category).toLowerCase().includes(q)
    );
    navigation.navigate("SearchResults", { results: filtered, query: searchText });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#555" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#555"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={handleSearch} style={{ padding: 6 }}>
          <Ionicons name="arrow-forward-circle" size={26} color="#8B008B" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["BAAF Lists", "Prime", "Video"].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tabButton}>
            <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign in quick button (kept as you had) */}
    

      {/* Banner (clickable) */}
      <Animated.ScrollView
        ref={bannerRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={{ width }}
      >
        {bannerImages.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                product: {
                  image: uri,
                  title: `Featured Product ${index + 1}`,
                  price: (200 + index * 50).toFixed(2),
                  description: "Exclusive deal! Discover elegance and premium quality.",
                },
              })
            }
            activeOpacity={0.9}
          >
            <Animated.Image
              source={{ uri }}
              style={[styles.bannerImage, { opacity: bannerFade }]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      {/* New Arrivals (clickable) */}
      <View style={styles.newArrivalsContainer}>
        <Animated.ScrollView
          horizontal
          ref={scrollRef}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
        >
          {products.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.arrivalCard}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <Text style={styles.arrivalLabel}>{item.title}</Text>
              <Image source={{ uri: item.image }} style={styles.arrivalImage} />
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>

      {/* Sign In Section (you had this too) */}
      <View style={styles.signInSection}>
        <Text style={styles.signInText}>Sign in for your best experience</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.signInButtonText}>Sign in Security</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 35,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 3,
  },
  searchInput: { flex: 1, fontSize: 16 },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#8B008B",
    paddingVertical: 10,
  },
  tabButton: {},
  tabText: { color: "#eee", fontSize: 16 },
  activeTabText: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 4,
    fontWeight: "bold",
  },

  bannerImage: { width, height: 340 },

  newArrivalsContainer: { marginTop: 10, paddingHorizontal: 10 },
  arrivalCard: {
    width: 130,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  arrivalLabel: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 6,
    backgroundColor: "#fff",
  },
  arrivalImage: { width: "100%", height: 140 },

  signInSection: {
    alignItems: "center",
    marginVertical: 17,
  },
  signInText: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  signInButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  signInButtonText: { fontSize: 16, fontWeight: "bold", color: "#333" },
});
