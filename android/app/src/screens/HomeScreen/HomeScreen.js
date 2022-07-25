import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, ScrollView, Text, View } from 'react-native';


const HomeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    const getMovies = async () => {
       try {
        const response = await fetch('http://192.168.0.193:8080/users/1');
        const json = await response.json();
        setData(json.password);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getMovies();
    }, []);
  
    return (
        <ScrollView style={styles.view}>
            <View style={{ flex: 1, padding: 24 }}>
                {isLoading ? <ActivityIndicator/> : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
            <Text>{item}</Text>
            )}
            />
            )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    }, 
    view: {
        flex: 1,
        backgroundColor: '#FFF9CA'
    },
});


export default HomeScreen