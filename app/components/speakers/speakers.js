import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { action, runInAction, observable } from 'mobx';
import { observer } from 'mobx-react';
import BaseList from '../models/baselist';

export default class Speakers extends Component {
    
    render(){
        return(
            <BaseList uri="https://www.newsit.gr/wp-json/wp/v2/posts" prefix="speakers" />
        )
    }

}