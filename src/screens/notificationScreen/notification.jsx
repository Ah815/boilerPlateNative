import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNotifications } from '../../api/notificationAPI';

const NotificationScreen = () => {
  const { data: notifications, isLoading, error } = useNotifications();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error loading notifications</Text>
      </View>
    );
  }

  const renderNotificationCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.heading}>{item.heading}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderNotificationCard}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});
