import React from 'react'
import {View, ScrollView,Image,Text,StyleSheet} from 'react-native'
import FutureForecast from './FutureForecast'
import moment from 'moment-timezone'

const WeatherScroll = ({weatherData}) => {
  return (
    <ScrollView horizontal = {true} style = {styles.scrollView}>
        <FutureForecast data = {weatherData}/>
    </ScrollView>
  )
}


    


const styles = StyleSheet.create({
   
    scrollView: {
        flex:0.4,
        backgroundColor: '#fefbd8',
        padding:30
    },

})


export default WeatherScroll
