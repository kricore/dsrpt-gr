import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { fetchFeed, returnFeed } from '../../helpers/fetchFeed'
import { action, runInAction, observable } from 'mobx';
import { observer } from 'mobx-react';
import ListItem from './baseListItem';


@observer
export default class BaseList extends Component {
    
    @observable hasLoaded = false;
    data = [];

    componentDidMount(){
        this.getPosts();
    }

    async getPosts(){
        const wasLoaded = await fetchFeed(this.props.uri);
        if(wasLoaded){
            runInAction( () => {
                this.data = wasLoaded;
                this.hasLoaded = true;
            });
        }
    }
    
    /**
     * Get the keys for the itteration
     */
    _keyExtractor = (item, index) => item.id;

    /**
     * Itterate through the items
     * @param item
     */
    _renderItem = ({item}) => {
        // Content Checks
        const hasImage = item.better_featured_image;
        const excerpt = item.excerpt;

        return(
            <ListItem 
                id={item.id}
                title={item.title.rendered}
                prefix={this.props.prefix}
                content={excerpt ? item.excerpt.rendered : item.content.rendered}
                image={hasImage ? item.better_featured_image.media_details.sizes.medium.source_url : false}
            />
        )
    }
    
    render(){
        return(
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