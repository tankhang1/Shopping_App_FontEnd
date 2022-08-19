import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/screen/Home';
import Product from './components/screen/Product';
import MyCart from './components/screen/MyCart';
export default function App() {
  const Stack= createNativeStackNavigator();
  //headerShown là tắt header đầu mỗi trang
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown:false}}
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Product" component={Product}/>
        <Stack.Screen name="MyCart" component={MyCart}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
