import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getAllVendors } from '../services/vendorService';
import { getAllEvents } from '../services/eventService';
import { getAllGifts } from '../services/giftService';
import VendorCard from '../components/VendorCard';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'customer') {
          const vendorsList = await getAllVendors();
          setVendors(vendorsList);
        } else if (user.role === 'admin') {
          // Example admin stats, replace with API if available
          const events = await getAllEvents();
          const gifts = await getAllGifts();
          setStats({ totalEvents: events.length, totalGifts: gifts.length });
        }
      } catch (err) {
        console.error('Dashboard fetchData error:', err);
      }
    };
    fetchData();
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome, {user.name}</Text>

      {user.role === 'customer' && (
        <>
          <Text style={styles.subHeader}>Available Vendors</Text>
          {vendors.length > 0 ? (
            vendors.map(vendor => <VendorCard key={vendor._id} vendor={vendor} />)
          ) : (
            <Text style={styles.emptyText}>No vendors available</Text>
          )}
        </>
      )}

      {user.role === 'admin' && (
        <View style={styles.adminStats}>
          <Text style={styles.statText}>Total Events: {stats.totalEvents || 0}</Text>
          <Text style={styles.statText}>Total Gifts: {stats.totalGifts || 0}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#000' },
  header: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 16 },
  subHeader: { fontSize: 18, fontWeight: '600', color: '#fff', marginVertical: 12 },
  emptyText: { color: '#ccc', fontSize: 14, textAlign: 'center', marginTop: 20 },
  adminStats: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
  },
  statText: { fontSize: 16, color: '#fff', marginBottom: 8 },
});
