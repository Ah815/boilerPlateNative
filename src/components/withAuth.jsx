import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const withAuth = (WrappedComponent) => (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    const token = await getAuthToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please log in to access this screen.</Text>
      </View>
    );
  }

  return <WrappedComponent {...props} />
};
const getAuthToken = async () => {
  return null; 
};

export default withAuth;
