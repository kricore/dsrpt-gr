import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Link } from 'react-router-native'

export default class Navigation extends Component {
    
    render() {

        return(
            <ScrollView style={{ backgroundColor: '#f1f1f1' }}>
                <View style={styles.nav}>
                    <Link onPress={() => { this.props.onItemSelected() }} to="/" style={styles.navItem}>
                        <Text>Home</Text>
                    </Link>
                    <Link onPress={() => { this.props.onItemSelected() }} to="/posts" style={styles.navItem}>
                        <Text>News</Text>
                    </Link>
                    <Link onPress={() => { this.props.onItemSelected() }} to="/map" style={styles.navItem}>
                        <Text>Map</Text>
                    </Link>
                    <Link onPress={() => { this.props.onItemSelected() }} to="/mentors" style={styles.navItem}>
                        <Text>Mentors</Text>
                    </Link>
                    <Link onPress={() => { this.props.onItemSelected() }} to="/speakers" style={styles.navItem}>
                        <Text>Speakers</Text>
                    </Link>
                    <Link onPress={() => { this.props.onItemSelected() }} to="/teams" style={styles.navItem}>
                        <Text>Teams</Text>
                    </Link>
                    <Link onPress={() => { this.props.onItemSelected() }} to="/eventora" style={styles.navItem}>
                        <Text>Eventora</Text>
                    </Link>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
    //   flexDirection: 'column',
    //   justifyContent: 'center',
      padding: 20,
      top: 20,
      left: 0,
      right: 0,
      backgroundColor: '#f1f1f1',
    },
    navItem: {
        padding: 20,
        flex:  1,
        alignItems: 'center'
    }
  });