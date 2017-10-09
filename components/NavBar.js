import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class NavBar extends Component {
    render() {
        return (
            <View style={styles.navbar}>
                <Text>Menu</Text>
                <Text>List-TMP</Text>
                <Text>Busca</Text>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50
    }
})