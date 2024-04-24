import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React from 'react'
const handleGetStarted = () => {
  // Handle the "Get Started" button press
  console.log('Get Started button pressed');
};
const WelcomeScreen = () => {
  return (

    <View style={styles.container}>
     {/* <Image source={require('./images/logo.png')} style={styles.logo} />  */}
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Text style={styles.subtitle}>A Simple and Powerful App</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

  
}

export default WelcomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
