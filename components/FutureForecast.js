import React from 'react'

import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'

const FutureForecast = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>

            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                     <FutureForecastItem key={idx} forecastItem={data}/>
                ))
                :
                <View/>
            }
          
            

        </View>
    )
}




const FutureForecastItem = ({forecastItem}) => {
    
        const img = {uri: 'http://openweathermap.org/img/wn/' + forecastItem.weather[0].icon +'@2x.png'}
        
        return (
            <View style = {styles.currentTempContainer}>
                <Image source = {img} style={styles.image}/>
                <View style = {styles.otherContainer}>
                    <Text style = {styles.day}>{moment(forecastItem.dt*1000).format('dddd')}</Text>
                    <Text style = {styles.temp}>Description: {forecastItem.weather[0].main}</Text>
                    <Text style = {styles.temp}>Max:  {forecastItem.temp.max}&#176;C</Text>
                    <Text style = {styles.temp}>Min:  {forecastItem.temp.min}&#176;C</Text>
                    <Text style = {styles.temp}>Wind_Speed:  {forecastItem.wind_speed} m/s</Text>
                    <Text style = {styles.temp}>Precipitation:  {forecastItem.rain?forecastItem.rain :0} mm</Text>
                    <Text style = {styles.temp}>Humidity:  {forecastItem.humidity}%</Text>
                </View>  
            </View>
        )
    
}



export default FutureForecast

const styles = StyleSheet.create({
   
    image: {
        width: 150,
        height: 150
    },

    FutureForecastItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#eee',
        borderWidth:1,
        padding: 15
    },

    day: {
        fontSize: 20,
        color:"white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "500",
        marginBottom: 15
    },

    temp: {
        fontSize: 16,
        color:"Black",
        fontWeight:"500",
        //justifyContent: 'space-between',
        flexDirection: 'row'
    },

    otherContainer: {
        paddingRight: 40
    }

})