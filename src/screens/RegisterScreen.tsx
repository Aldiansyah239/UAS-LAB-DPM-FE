import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axiosInstance.post('/auth/register', { name, email, password });
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>
      <Text style={styles.subHeader}>Join our inventory management system</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}> Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4E4',
    padding: 25,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A10000',
    textAlign: 'center',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 16,
    color: '#FF5C5C',
    textAlign: 'center',
    marginBottom: 25,
  },
  formContainer: {
    borderRadius: 12,
    padding: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#FFEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFC1C1',
    color: '#A10000',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#A10000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#A10000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  footerText: {
    fontSize: 15,
    color: '#FF5C5C',
  },
  footerLink: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A10000',
    marginLeft: 5,
  },
});

export default RegisterScreen;
