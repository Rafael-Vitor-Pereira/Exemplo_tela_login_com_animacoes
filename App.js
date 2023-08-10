import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, Keyboard, Alert } from 'react-native';

export default function App() {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30,
        useNativeDriver: false
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      })
    ]).start();
  }, []);

  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        useNativeDriver: false
      }),
    ]).start();
  }

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 50,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 50,
        useNativeDriver: false
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image source={require('./assets/logo.png')} style={{width: logo.x, height: logo.y}} />
      </View>

      <Animated.View style={[styles.container, {opacity: opacity, transform: [{translateY: offset.y}]}]}>
        <TextInput placeholder='E-mail' style={styles.input} autoCorrect={false} onChangeText={() => {}} />
        <TextInput placeholder='Senha' style={styles.input} autoCorrect={false} onChangeText={() => {}} />
        <TouchableOpacity style={styles.btnSubmit}><Text style={styles.submitText}>Acessar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}><Text style={styles.registerText}>Criar conta gratuita</Text></TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText: {
    color: '#FFF',
    fontSize: 18
  },
  btnRegister: {
    marginTop: 10
  },
  registerText: {
    color: '#FFF'
  }
});
