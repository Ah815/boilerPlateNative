import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const HomeScreen = () => {
  const route = useRoute();
  const { logoSize } = route.params || { logoSize: 150 }; // Default logo size if not provided

  // Animated values for logo position and scale
  const logoAnimX = useRef(new Animated.Value(width / 2 - logoSize / 2)).current; // Start at the center horizontally
  const logoAnimY = useRef(new Animated.Value(height / 2 - logoSize / 2)).current; // Start at the center vertically
  const logoScale = useRef(new Animated.Value(1)).current; // Initial scale (1x)

  useEffect(() => {
    // Animate the logo to the top-left corner
    Animated.parallel([
      Animated.timing(logoAnimX, {
        toValue: 10, // Small margin from the left edge
        duration: 1000, // Transition duration
        useNativeDriver: true,
      }),
      Animated.timing(logoAnimY, {
        toValue: 10, // Small margin from the top edge
        duration: 1000, // Transition duration
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 0.5, // Scale down the logo to half size
        duration: 1000, // Transition duration
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoAnimX, logoAnimY, logoScale]);

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.Image
        source={require('../../assets/images/360logo.png')} // Replace with your logo path
        style={[
          styles.logo,
          {
            transform: [
              { translateX: logoAnimX }, // Horizontal animation
              { translateY: logoAnimY }, // Vertical animation
              { scale: logoScale }, // Scale animation
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  logo: {
    width: 330, 
    height: 90, 
    position: 'absolute', 
  },
});

export default HomeScreen;
