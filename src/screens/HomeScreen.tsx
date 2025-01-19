import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface InventoryRecord {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  dateAdded: string;
}

const HomeScreen = () => {
  const [records, setRecords] = useState<InventoryRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get('/offices');
        setRecords(response.data);
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.error || 'Failed to fetch records.');
      }
    };

    fetchRecords();
  }, []);

  const renderNode = (record: InventoryRecord) => (
    <View key={record._id} style={styles.nodeCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.nodeTitle}>{record.name}</Text>
        <Text style={styles.nodeDate}>{new Date(record.dateAdded).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.nodeDescription}>{record.description}</Text>
      <View style={styles.chartContainer}>
        <View style={[styles.chartBar, { width: `${Math.min(record.quantity, 100)}%` }]} />
      </View>
      <Text style={styles.nodeValue}>Quantity: {record.quantity}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Office Inventory Overview</Text>
        <Text style={styles.subHeader}>Modern display of your inventory</Text>
      </View>
      <View style={styles.recordContainer}>
        {records.map((record) => renderNode(record))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FCE4E4',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A10000',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#FF5C5C',
  },
  recordContainer: {
    marginTop: 20,
  },
  nodeCard: {
    backgroundColor: '#FFEAEA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFC1C1',
    shadowColor: '#A10000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A10000',
  },
  nodeDescription: {
    fontSize: 16,
    color: '#CC0000',
    marginBottom: 10,
  },
  chartContainer: {
    height: 10,
    backgroundColor: '#FFC1C1',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  chartBar: {
    height: '100%',
    backgroundColor: '#A10000',
  },
  nodeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A10000',
    marginTop: 5,
  },
  nodeDate: {
    fontSize: 14,
    color: '#FF5C5C',
  },
});

export default HomeScreen;
