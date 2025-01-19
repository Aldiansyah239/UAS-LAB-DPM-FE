import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axiosInstance from '../utils/axiosInstance';

interface InventoryRecord {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  dateAdded: string;
}

const InventoryRecordsScreen = () => {
  const [records, setRecords] = useState<InventoryRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get('/offices');
        setRecords(response.data);
      } catch (error: any) {
        console.error('Error fetching inventory records:', error.response?.data?.error || 'Server error');
      }
    };

    fetchRecords();
  }, []);

  const renderRecord = (record: InventoryRecord) => (
    <View key={record._id} style={styles.recordCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.recordTitle}>{record.name}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Description:</Text> {record.description}</Text>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Quantity:</Text> {record.quantity}</Text>
        <Text style={styles.recordText}><Text style={styles.recordLabel}>Date Added:</Text> {new Date(record.dateAdded).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Inventory Records</Text>
      {records.length > 0 ? (
        records.map(renderRecord)
      ) : (
        <Text style={styles.noDataText}>No records available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FCE4E4',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A10000',
    textAlign: 'center',
    paddingTop: 50,
    marginBottom: 20,
  },
  recordCard: {
    backgroundColor: '#FFEAEA',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#A10000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#FFC1C1',
  },
  cardHeader: {
    marginBottom: 10,
  },
  recordTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A10000',
  },
  cardContent: {
    marginBottom: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#FFC1C1',
  },
  recordText: {
    fontSize: 15,
    color: '#A10000',
    marginBottom: 5,
  },
  recordLabel: {
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#A10000',
  },
});

export default InventoryRecordsScreen;
