import React, { Component } from 'react';
import { View, WebView, Text, Dimensions } from 'react-native';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class Eventora extends Component {

    // Default height and width
    @observable width = 300;
    @observable height = 300;

    componentDidMount(){
        this.enforceWebViewRatio();
    }

    @action
    enforceWebViewRatio(){
        const dimensions  = Dimensions.get('window');
        this.width  = dimensions.width;
        this.height = dimensions.height - 25;
    }

    render(){
        return (
            <WebView
                source={{uri: 'https://www.eventora.com/en/Events/ecornell-onlinecourses'}}
                style={{marginTop: 0, width: this.width, height: this.height}}
            />
        )
    }
}