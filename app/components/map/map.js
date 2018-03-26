import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
//import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps';
import { MapView } from 'expo';

export default class MapComponent extends Component {

    constructor(props){
        super(props);
    }

    imageMaxWidth = Dimensions.get('window');

    render(){
        return(
            <MapView
                style={{ flex: 1, width: this.imageMaxWidth.width, height: 300, marginTop: 10 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >
                 <MapView.Marker 
                    coordinate={{ latitude: 37.78925, longitude: -122.4334 }}
                    title="My Marker"
                    description="Some description"
                />
            </MapView>
        )
    }

}