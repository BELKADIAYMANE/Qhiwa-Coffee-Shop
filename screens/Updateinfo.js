import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateInfoPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleUpdateInfo = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('address', address);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      console.log('Profile info updated successfully!');
    } catch (error) {
      console.log('Error updating profile info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={text => setAddress(text)}
        value={address}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <Button title="Update" onPress={handleUpdateInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
});

export default UpdateInfoPage;
