import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      const items = cartItemsString ? JSON.parse(cartItemsString) : [];
      setCartItems(items);

      // Calculate total sum
      let sum = 0;
      items.forEach(item => {
        sum += item.price * item.quantity;
      });
      setTotalSum(sum);
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemTotal}>Total: ${item.quantity * item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
      setTotalSum(0);
      Alert.alert('Cart Cleared', 'Your shopping cart has been cleared.');
    } catch (error) {
      console.log('Error clearing cart:', error);
    }
  };

  const finalizePurchase = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
      setTotalSum(0);
      Alert.alert('Purchase Finalized', 'Thank you for your purchase!');
    } catch (error) {
      console.log('Error finalizing purchase:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.title}>Shopping Cart</Text>
      </View>
      <View style={styles.content}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.emptyText}>Your shopping cart is empty</Text>
        )}
        {cartItems.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Total: ${totalSum}</Text>
            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={styles.clearButtonText}>Clear Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finalizeButton} onPress={finalizePurchase}>
              <Text style={styles.finalizeButtonText}>Finalize Purchase</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b5651d',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b5651d',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  itemTotal: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  summaryContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 12,
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  finalizeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
  },
  finalizeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ShoppingCartPage;
