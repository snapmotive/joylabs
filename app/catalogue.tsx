import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ConnectionStatusBar from '../src/components/ConnectionStatusBar';
import SearchBar from '../src/components/SearchBar';
import SortHeader from '../src/components/SortHeader';
import CatalogueItemCard from '../src/components/CatalogueItemCard';
import { ScanHistoryItem } from '../src/types';
import { Ionicons } from '@expo/vector-icons';

// Mock data for the scan history
const MOCK_SCAN_HISTORY: ScanHistoryItem[] = [
  {
    scanId: '5',
    id: '123456',
    name: 'Example Item Name',
    gtin: '78432786234',
    sku: 'None',
    price: 14.99,
    tax: true,
    crv: true,
    scanTime: '3/15/2025, 1:05:19PM'
  },
  {
    scanId: '4',
    id: '123457',
    name: 'Example Item Name',
    gtin: '78432786234',
    sku: 'None',
    price: 14.99,
    tax: true,
    crv: 10,
    scanTime: '3/15/2025, 1:03:12PM'
  },
  {
    scanId: '3',
    id: '123458',
    name: 'Example Item Name',
    gtin: '78432786234',
    sku: 'None',
    price: 14.99,
    crv: 10,
    scanTime: '3/15/2025, 11:45:23PM'
  },
  {
    scanId: '2',
    id: '123459',
    name: 'Example Item Name',
    gtin: '78432786234',
    sku: 'None',
    price: 14.99,
    tax: true,
    scanTime: '3/15/2025, 11:15:11PM'
  },
  {
    scanId: '1',
    id: '123460',
    name: 'Example Item Name This Is A Sample Of a Longer Item Name',
    gtin: '78432786234',
    sku: 'None',
    price: 14.99,
    scanTime: '3/15/2025, 11:06:19PM'
  },
];

export default function CatalogueScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'name' | 'price'>('newest');
  const [connected, setConnected] = useState(true);
  
  const handleSearch = () => {
    console.log('Searching for:', search);
    // Implementation would go here
  };
  
  const handleItemPress = (item: ScanHistoryItem) => {
    console.log('Item pressed:', item);
    // Navigate to item details
    // router.push(`/item/${item.id}`);
  };
  
  const sortedItems = [...MOCK_SCAN_HISTORY].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.scanTime).getTime() - new Date(a.scanTime).getTime();
      case 'oldest':
        return new Date(a.scanTime).getTime() - new Date(b.scanTime).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return b.price - a.price;
      default:
        return 0;
    }
  });
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <ConnectionStatusBar 
        connected={connected} 
        serviceName="Square" 
      />
      
      <SearchBar 
        value={search}
        onChangeText={setSearch}
        onSubmit={handleSearch}
      />
      
      <SortHeader 
        title="Scan History" 
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.scanId}
        renderItem={({ item, index }) => (
          <CatalogueItemCard 
            item={item}
            index={sortedItems.length - index}
            onPress={handleItemPress}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="home" size={24} color="#0D6EFD" />
          <Text style={styles.tabLabel}>Scan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="search" size={24} color="#888" />
          <Text style={styles.tabLabel}>Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="grid" size={24} color="#888" />
          <Text style={styles.tabLabel}>Categories</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="pricetag" size={24} color="#888" />
          <Text style={styles.tabLabel}>Label Design</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="person" size={24} color="#888" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
}); 