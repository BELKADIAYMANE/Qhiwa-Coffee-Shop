import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Coffeepage = ({ route, navigation }) => {
  const { Coffee } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [Coffees, setCoffees] = useState([]);
  const [quantityModalVisible, setQuantityModalVisible] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState('');

  useEffect(() => {
    checkIfFavorite();
    fetchCoffees();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      setIsFavorite(favorites.includes(Coffee.id));
    } catch (error) {
      console.log('Error checking favorite:', error);
    }
  };

  const fetchCoffees = async () => {
    try {
      const CoffeesString = await AsyncStorage.getItem('Coffees');
      const CoffeesData = CoffeesString ? JSON.parse(CoffeesString) : [];
      setCoffees(CoffeesData);
    } catch (error) {
      console.log('Error fetching :', error);
    }
  };

  const handleOrderPress = () => {
    setQuantityModalVisible(true);
  };

  const handleOrderConfirm = async () => {
    const quantity = parseInt(orderQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      console.log('Invalid quantity');
      return;
    }

    if (quantity > Coffee.quantity) {
      Alert.alert('Error', 'Quantity exceeds available stock.');
      return;
    }

    try {
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
      const updatedCartItems = [...cartItems];
      const existingItem = updatedCartItems.find(item => item.id === Coffee.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        updatedCartItems.push({ ...Coffee, quantity });
      }

      const updatedCoffee = { ...Coffee, quantity: Coffee.quantity - quantity };
      const updatedCoffees = Coffees.map(item => (item.id === Coffee.id ? updatedCoffee : item));

      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      await AsyncStorage.setItem('Coffees', JSON.stringify(updatedCoffees));
      setQuantityModalVisible(false);

      Alert.alert('Order Placed', 'Your order has been placed successfully.');

      setCoffees(updatedCoffees); 
    } catch (error) {
      console.log('Error updating cart:', error);
    }
  };

  const handleFavoritePress = () => {
    toggleFavorite(Coffee.id);
  };

  const toggleFavorite = async (CoffeeId) => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];

      if (favorites.includes(CoffeeId)) {
        favorites.splice(favorites.indexOf(CoffeeId), 1);
      } else {
        favorites.push(CoffeeId);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log('Error toggling favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coffee Details</Text>
      </View>
      <View style={styles.content}>
        <Image source={{ uri: Coffee.image }} style={styles.image} />
        <Text style={styles.name}>{Coffee.name}</Text>
        <Text style={styles.price}>Price: ${Coffee.price}</Text>
        
        <Text style={styles.description}>{Coffee.description}</Text>
        <TouchableOpacity style={styles.button} onPress={handleOrderPress} disabled={Coffee.quantity === 0}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFavoritePress}>
          <Text style={styles.buttonText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={quantityModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Quantity</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Quantity"
              keyboardType="numeric"
              value={orderQuantity}
              onChangeText={text => setOrderQuantity(text)}
            />
            <Button title="Confirm" onPress={handleOrderConfirm} />
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  quantity: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    width: '70%',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default Coffeepage;
