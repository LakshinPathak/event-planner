import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VendorCard({ vendor }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{vendor.name}</Text>
      <Text style={styles.info}>{vendor.category}</Text>
      <Text style={styles.info}>{vendor.email}</Text>
      {vendor.phone && <Text style={styles.info}>{vendor.phone}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: '700', color: '#111' },
  info: { fontSize: 14, color: '#555', marginTop: 4 },
});
