import {View, Text, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../theme';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';

export default function SignUpScreen() {
  /*Process for change between page */
  const navigation = useNavigation();

  /*Process to add Firebase Authentication */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*Process for show/hide password */
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /*Process to add Firebase Authentication and make function access to Firebase */

  {
    /*Process password with character */
  }
  const handleSubmit = async () => {
    if (email && password) {
      // Check if the password meets your criteria (e.g., at least 6 characters)
      if (isPasswordValid(password)) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.log('Error:', err.message);
        }
      } else {
        Alert.alert('Password Requirements', 'Password must be at least 6 characters long.');
      }
    } else {
      Alert.alert('Missing Information', 'Please provide both email and password.');
    }
  };
  

  // Function to check if the password meets your requirements.
  const isPasswordValid = password => {
    // Process to make at least 8 characters {8,} and contains at least one digit, one uppercase letter, and one special character.
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <View className="flex">
        {/*Process for icon "ArrowLeft"*/}
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-3">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>

        {/*Process insert image*/}
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/signup.png')}
            style={{width: 165, height: 110}}
          />
        </View>
      </View>

      {/*Process for khung trắng dưới */}

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className="form space-y-2">

          <Text className="text-gray-700 ml-4">Email Address</Text>

          {/*Process for TextInput */}
          {/*Process for Email */}
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            /*Process before to add Firebase Authentication */
            /* value="duc@gmail.com" */

            /*Process to add Firebase Authentication */
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder="Enter Email"
          />

          <Text className="text-gray-700 ml-4">Password</Text>
          {/*Process for Password */}
          <View>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
              /*Process for show/hide password */
              secureTextEntry={!showPassword}
              /*Process before to add Firebase Authentication */
              /*value="test123"*/

              /*Process to add Firebase Authentication */
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder="Enter Password"
            />

            {/*Process show/hide for Password */}

            <TouchableOpacity
              style={{position: 'absolute', right: 16, top: 12}}
              onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={
                  showPassword
                    ? require('../assets/images/show.png')
                    : require('../assets/images/hide.png')
                }
                style={{flex: 1, marginTop: 9, width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>

          {/*Process function Box Sign Up */}
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            /*Process to add Firebase Authentication and make function access to Firebase */
            onPress={handleSubmit}>
            <Text className="font-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/*Process for make button choose method "Login In" */}
        <View className="flex-2 mt-3.5">
          <View className="flex-row justify-center">
            <Text className="text-gray-500 font-semibold">
              Already Have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold text-yellow-500 mx-1">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
