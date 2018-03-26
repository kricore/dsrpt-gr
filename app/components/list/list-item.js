import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native';
import { Link } from 'react-router-native';
import HTMLView from 'react-native-htmlview';

export default class ListItem extends Component {

    constructor(props){
        super(props);
    }

    /**
     * Properly render images from the HTML content so we can 
     * add proper have proper dimensions
     * @param {*} node 
     * @param {*} index 
     */
    renderNode(node, index) {
        if (node.name == 'img') {
            const { width } = Dimensions.get('window');
            const { src } = node.attribs;
            const imageHeight = (width / 100) * 56;
            return (
                <Image
                    key={index}
                    style={{ width: (width - 40), height: imageHeight, marginBottom: 20 }}
                    source={{ uri: src }} 
                />
            );
        }
    }

    render() {      
        return(
            <View style={styles.article}>
                <Link to={`/news/` + this.props.id}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </Link>
                <HTMLView
                    value={this.props.content}					
                    stylesheet={htmlStyles}	
                    renderNode={this.renderNode}
                    onLinkPress={(url) => console.log('clicked link: ', url)}
                />
            </View>
        )
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
        marginBottom: 20
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