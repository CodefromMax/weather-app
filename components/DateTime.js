import React, {useEffect, useState} from 'react';
import {View, Text,StyleSheet} from 'react-native';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const WeatherItem = ({title, value, unit}) => {
    return (
        <View style = {styles.weatherItem}>
            <Text style = {styles.weathertitle}>{title}</Text>
            <Text style = {styles.weathertitle}>{value}{unit}</Text>
        </View>
    )
}

const DateTime = ({current,timezone,lat,lon}) => {
    
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    
    useEffect (() => {
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
        
        }, 1000);
    }, [])
    return (
        <View style = {styles.container}>
            <View>
                <View>
                    <Text style = {styles.heading}>{time}</Text>
                </View>
                <View>
                    <Text style = {styles.subheading}>{date}</Text>
                </View>
                <View style = {styles.weather}>
                    <WeatherItem title = "Humidity  " value = {current ? current.humidity : ""} unit = " %"/>
                    <WeatherItem title = "Temperature  " value = {current ? current.temp : ""} unit = " &#176;C"/>
                    <WeatherItem title = "Wind Speed  " value = {current ? current.wind_speed : ""} unit = " m/s"/>
                    <WeatherItem title = "Description  " value = {current ? current.weather[0].main : ""}/>
                </View>
            </View>
            
            <View style = {styles.rightAlign}>
                <Text style = {styles.timezone} > {timezone}</Text>
                <Text style = {styles.latlong}> {lat}N  {lon}E</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 0.5,
        flexDirection:"row",
        justifyContent:"space-between",
        padding: 20

    },
    heading: {
        fontsize: 75,
        color:'black',
        fontWeight: '500'
    },
    subheading: {
        fontsize: 50,
        color: "black",
        fontWeight: '500'
    },
    rightAlign: {
        textAlign: 'right',
        marginTop: 85
    },
    timezone: {
        fontSize: 20,
        color: 'black'
    },
    latlong: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700'

    },
    weather: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 15,
        marginTop: 50
    },
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weathertitle: {
        color:'#eee',
        fontSize: 15,
        fontWeight: '300'
    }


})


export default DateTime
