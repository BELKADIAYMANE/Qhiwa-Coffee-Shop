import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedAddress = await AsyncStorage.getItem('address');
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

        setName(storedName || '');
        setAddress(storedAddress || '');
        setPhoneNumber(storedPhoneNumber || '');
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    getData();
  }, []);

  const handleFavorites = () => {
    navigation.navigate('favoritelist');
  };

  const handleUpdateInfo = () => {
    navigation.navigate('updateinfo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Favorites" onPress={handleFavorites} />
        <Button title="Update Info" onPress={handleUpdateInfo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#b5651d',
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfilePage;
