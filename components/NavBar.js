import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Svg,{
    G,
    Path,
    Rect,
  } from 'react-native-svg';

export default class NavBar extends Component {
    render() {
        return (
            <View style={styles.navbar}>
                <Text style={styles.navBarTitle}>List-TMP</Text>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 65,
        backgroundColor: "#50D2C2",
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navBarTitle: {
        fontFamily: 'Monteserrat-Light',
        fontSize: 17,
        color: "#FFF",
    },
})