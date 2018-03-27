import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { action, runInAction, observable } from 'mobx';
import { observer } from 'mobx-react';
import BaseList from '../models/baselist';

export default class News extends Component {
    
    render(){
        return(
            <BaseList uri="http://disrupt2018.btwbox.com/wp-json/wp/v2/posts/" prefix="posts" />
        )
    }

}