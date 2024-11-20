import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageService = (() => {
  const store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(`Stored ${key}:`, value); 
    } catch (error) {
      console.error(`Failed to store ${key}:`, error);
      throw error;
    }
  };

  const get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      const parsedValue = value ? JSON.parse(value) : null;
      console.log(`Retrieved ${key}:`, parsedValue); 
      return parsedValue;
    } catch (error) {
      console.error(`Failed to retrieve ${key}:`, error);
      throw error;
    }
  };

  const logToken = async () => {
    const token = await get('authToken');
    console.log('Retrieved Token:', token); 
    return token;
  };

  return {
    store,
    get,
    logToken,
  };
})();

export default StorageService;
