// SignInScreen.js
import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignInScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSignIn = async () => {
    try {
      const loginResponse = await axios.post('https://selu383-sp24-p03-g03.azurewebsites.net/api/authentication/login', {
        username: username,
        password: password,
      });

      if (loginResponse.status === 200) {
        const userDataResponse = await axios.get('https://selu383-sp24-p03-g03.azurewebsites.net/api/authentication/me');
        setUserData(userDataResponse.data);
        setUsername('');
        setPassword('');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleLogout = async () => {
    try {
      const logoutResponse = await axios.post('https://selu383-sp24-p03-g03.azurewebsites.net/api/authentication/logout');
      if (logoutResponse.status === 200) {
        setUserData(null);
        setUsername('');
        setPassword('');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      {userData && (
        <View> 
          <Text style={styles.loginText}>Hello {userData.userName} !</Text>
        </View>
      )}
      <View style={styles.buttonSpace}></View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginText: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
  },

  buttonSpace: {
    height: 30,
  },

});

export default SignInScreen;
