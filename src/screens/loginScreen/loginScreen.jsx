import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLogin } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const { mutate: login, isLoading, error } = useLogin({
    onSuccess: (data) => {
      console.log('Login successful:', data);
      navigation.navigate('Home');
    },
  });

  const handleLogin = () => {
    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        editable={!isLoading}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          editable={!isLoading}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-slash'}
            size={wp('6%')} 
            color="grey"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error.message}</Text> : null}
      <Button
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: wp('5%'),
    backgroundColor: '#f8f9fa',
  },
  input: {
    height: hp('6%'),
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'), 
    backgroundColor: '#fff',
    fontSize: wp('4%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: wp('2%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'), 
  },
  passwordInput: {
    flex: 1,
    height: hp('6%'), 
    fontSize: wp('4%'), 
  },
  eyeIcon: {
    paddingHorizontal: wp('2%'),
  },
  error: {
    color: 'red',
    fontSize: wp('3.5%'), 
    marginBottom: hp('1%'), 
    textAlign: 'center',
  },
});
