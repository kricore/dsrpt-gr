import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import HTMLView from 'react-native-htmlview'
import { runInAction, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class BaseItem extends Component {

    constructor(props){
        super(props);

        this.renderNode = this.renderNode.bind(this);
    }
    
    @observable hasLoaded = false;
    @observable hasError = false;
    data = [];
    imagePath = '';
    imageMaxWidth = 320;
    imageAspectRatio = 56;

    componentDidMount(){
       this.fetchFeed(this.props.match.url);
       this.setEnforcedImageRatio();
    }

    /** 
     * Set an enforce 16/9 image ratio depending on the device's width
    */
    setEnforcedImageRatio(){
        this.imageMaxWidth  = Dimensions.get('window');
        this.imageMaxWidth  = this.imageMaxWidth.width - 40;
        this.imageMaxHeight = (this.imageMaxWidth / 100) * 56;
    }

    /**
     * Fetch the post's data and then get the image
     * Based on WP's API
     * @param {*} id 
     */
    async fetchFeed(url){
        if(url){
            try{
                const response = await fetch(`http://disrupt2018.btwbox.com/wp-json/wp/v2` + url);
                const json = await response.json();
                this.data = json;

                runInAction( () => {
                    this.hasLoaded = true;
                });

            } catch(e){
                // Fail and show a message
                throw e;
            }
        } else {
            runInAction( () => {
                this.hasError = true;
            });
        }
    }

    /**
     * Properly render images from the HTML content so we can 
     * add proper have proper dimensions
     * @param {*} node 
     * @param {*} index 
     */
    renderNode(node, index) {
        if (node.name == 'img') {
            const { src } = node.attribs;
            return (
                <Image
                    key={index}
                    style={{ width: this.imageMaxWidth, height: this.imageMaxHeight, marginBottom: 20 }}
                    source={{ uri: src }} 
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.article}>
                {this.hasLoaded &&
                <View>
                    <Text style={styles.title}>
                        {this.data.title.rendered}
                    </Text>
                    
                    {this.data.better_featured_image !='' &&
                    <Image
                        key={this.props.match.params.id}
                        style={{ width: this.imageMaxWidth, height: this.imageMaxHeight, marginBottom: 20 }}
                        source={{ uri: this.data.better_featured_image.media_details.sizes.medium.source_url }} 
                    />
                    }
                     <HTMLView
                         value={this.data.content.rendered}					
                         stylesheet={htmlStyles}	
                         renderNode={this.renderNode}
                         onLinkPress={(url) => console.log('clicked link: ', url)}
                     />
                </View>
                }
                {!this.hasLoaded &&
                <ActivityIndicator size="large" color="#0000ff" />
                }
            </View>  
        );
    }
}

const styles = StyleSheet.create({
    article: {
        padding: 20
    },
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    title: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20
    },
    content: {
        fontSize: 14
    }
});

const htmlStyles = StyleSheet.create({
    a: {
        fontWeight: '300',
        fontSize: 14
    },
    p:{
        fontSize: 14,
        marginBottom: 10
    },
    strong:{
        fontWeight:'bold',
        fontSize: 14
    },
    li:{
        fontSize: 14,
    },
    br: {
        display: 'none'
    }
});