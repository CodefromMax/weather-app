import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, ActivityIndicator} from 'react-native';
import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';
import * as Location from 'expo-location';
const img = require('./assets/background.jpg')
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';


export default function App() {

  const[input,setInput] = useState(""); // Type
  const[input1,setInput1] = useState("");
  const [data,setData] = useState({})

  const fetchDataHandler = useCallback(() => {
    setInput("");

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${API_KEY}`)
    .then(res => res.json()).then(location1 => { 
      if(location1[0]!= undefined){
      fetchDataFromApi(location1[0].lat, location1[0].lon);
    }
  })
  },[])

  const fetchZipHandler = useCallback(() => {
    setInput1("");
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${input1}&appid=${API_KEY}`)
    .then(res => res.json()).then(location1 => { 
      if(location1[0]!= undefined){
      fetchDataFromApi(location1.lat, location1.lon);
      
    }
  })
  },[])
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("43.6532", "-79.3832")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}
    `)
    .then(res => res.json()).then(data => {
    console.log(data)
    setData(data)
    })
  }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source = {img} style = {styles.simage}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon} /> 
        <TextInput placeholder = "Enter city name" 
        onChangeText={text => setInput(text)} 
        value = {input}
        placeholderTextColor = {'#000'}
        style = {styles.textInput}
        onSubmitEditing = {fetchDataHandler} />
        <TextInput placeholder = "ZIP Code,Country" 
        onChangeText={text => setInput1(text)} 
        value = {input1}
        placeholderTextColor = {'#000'}
        style = {styles.textInput}
        onSubmitEditing = {fetchZipHandler} />
        <WeatherScroll weatherData = {data.daily}/>
      </ImageBackground>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  simage: {
    flex:1, 
    sresizeMode: "cover", 
    justifyContent: "center"
  },

  textInput:{
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8e00'

  }
});
