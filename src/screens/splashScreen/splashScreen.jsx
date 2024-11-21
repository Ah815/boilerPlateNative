import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Animated,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const SplashScreen = () => {
  const navigation = useNavigation();
  const logoPosition = useRef(new Animated.Value(-height)).current; // Initial position off the top of the screen
  const fadeOutText = useRef(new Animated.Value(1)).current; // Initial opacity for text
  const modalPosition = useRef(new Animated.Value(height)).current; // Initial position off the bottom of the screen

  useEffect(() => {
    // Animate the logo and text
    Animated.sequence([
      // Move logo from the top to the center
      Animated.timing(logoPosition, {
        toValue: height * 0.4, // Move to the center (40% from the top)
        duration: 2000, // 2-second transition
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Fade out the text
      Animated.timing(fadeOutText, {
        toValue: 0,
        duration: 1000, // 1-second fade-out
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After logo animation, trigger modal slide-in with a 3-second delay
      setTimeout(() => {
        // Animate the modal and move logo to the top
        Animated.parallel([
          Animated.timing(modalPosition, {
            toValue: 0, // Slide modal into view
            duration: 1000, // 1-second transition
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(logoPosition, {
            toValue: 0, // Move logo to the top of the screen
            duration: 1000, // 1-second transition
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start();
      }, 3000);
    });
  }, [logoPosition, fadeOutText, modalPosition]);

  return (
    <View style={styles.container}>
      {/* Set StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Persistent Background Image */}
      <ImageBackground
        source={require('../../assets/images/background_img.png')} // background image path
        style={styles.backgroundImage}
        resizeMode="cover">
        {/* Animated Text Content */}
        <Animated.View style={[styles.fadeContainer, {opacity: fadeOutText}]}>
          {/* Red Arrow Image */}
          <Image
            source={require('../../assets/images/frame_img.jpg')} //red arrow image path
            style={styles.redArrow}
            resizeMode="contain"
          />

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>
              <Text style={styles.highlight}>Easy</Text> Way to Confirm{' '}
              <Text style={styles.highlight}>Your Attendance</Text>
            </Text>
            <Text style={styles.subText}>
              Effortlessly manage your attendance. Just Check-In or Check-Out
              and stay on track!
            </Text>
          </View>
        </Animated.View>

        {/* Animated Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{translateY: logoPosition}], // Move the logo vertically
            },
          ]}>
          <Image
            source={require('../../assets/images/360logo.png')} //logo image path
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Modal */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{translateY: modalPosition}], // Slide modal vertically
            },
          ]}>
          <Text style={styles.modalTitle}>Join the Movement</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.buttonText}>Open New Doors!</Text>
            <Image
              source={require('../../assets/images/arrow_right_img.png')} 
              style={styles.arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background as fallback
  },
  backgroundImage: {
    flex: 1,
  },
  fadeContainer: {
    ...StyleSheet.absoluteFillObject, // Make it cover the screen
  },
  redArrow: {
    width: '120%', // Adjust size of the arrow to fill the screen width
    height: '200%', // Adjust height for proportion
    bottom: '70%', // Move up to align like the design
    right: '6%',
  },
  textContainer: {
    position: 'absolute',
    bottom: height * 0.1, // 10% from the bottom
    paddingHorizontal: width * 0.05, // 5% of screen width for padding
    alignSelf: 'center', // Center text container
  },
  mainText: {
    fontSize: width * 0.08, // 8% of screen width for font size
    fontWeight: '600',
    color: '#fff',
    lineHeight: width * 0.1, // Line height relative to font size
    textAlign: 'center',
  },
  highlight: {
    color: 'red',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: width * 0.045, // 4.5% of screen width for font size
    color: '#bbb',
    marginTop: height * 0.02, // Dynamic margin-top
    lineHeight: width * 0.05, // Line height relative to font size
    textAlign: 'center',
  },
  logoContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  logoImage: {
    width: width * 0.6, // 60% of screen width
    height: width * 0.6, // Adjust height proportionally
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2C2C2C',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    height: 60,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    width: '90%',
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    left: '24%',
    width: '12%',
    height: 50,
  },
});
