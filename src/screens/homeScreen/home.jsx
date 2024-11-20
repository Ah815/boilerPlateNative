import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
    </View>
  );
};

HomeScreen.options = ({ navigation }) => ({
  title: 'Home',
  headerRight: () => (
    <Icon
      name="bell"
      size={wp('6%')} 
      color="black"
      onPress={() => navigation.navigate('Notifications')}
      style={styles.icon}
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'), 
  },
  text: {
    fontSize: wp('6%'),
    textAlign: 'center',
  },
  icon: {
    marginRight: wp('2.5%'),
  },
});

export default HomeScreen;
