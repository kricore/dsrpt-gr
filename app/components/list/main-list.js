import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { action, runInAction, observable } from 'mobx';
import { observer } from 'mobx-react';
import ListItem from './list-item';

@observer
export default class List extends Component {

    @observable hasLoaded = false;
    data = [];

    componentDidMount(){
        this.fetchFeed('https://www.newsit.gr/wp-json/wp/v2/posts');
    }

    /**
     * Fetch the feed asynchrously
     * @param {*} feed 
     */
    async fetchFeed(feed) {
        try{
            const response = await fetch(feed);
            const json = await response.json();
            this.data = json;
    
            runInAction( () => {
                this.hasLoaded = true;
            });
        } catch(e) {
            throw e;
        }
    }

    _renderItem = ({item}) => (
        <ListItem 
            id={item.id}
            title={item.title.rendered}
            content={item.excerpt.rendered}
        />
    )

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View>
                {this.hasLoaded &&
                    <View>
                        <Text style={styles.title}>The List</Text>
                        <FlatList 
                            data={this.data}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                }
                {!this.hasLoaded &&
                <ActivityIndicator size="large" color="#0000ff" />
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        padding: 20,
        marginTop: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});