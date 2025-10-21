import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/userService';

export default function SignupAdmin({ navigation }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSignup = async () => {
    try {
      await registerUser({ ...form, usertype: 'admin' });
      Alert.alert('Admin registered!');
      navigation.navigate('Login');
    } catch {
      Alert.alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Sign Up</Text>
      <TextInput placeholder="Name" style={styles.input} onChangeText={v => setForm({ ...form, name: v })} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={v => setForm({ ...form, email: v })} />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={v => setForm({ ...form, password: v })}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ...require('./Login').default.styles,
});
