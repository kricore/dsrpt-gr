import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native';
import { Link } from 'react-router-native';
import HTMLView from 'react-native-htmlview';

export default class ListItem extends Component {

    constructor(props){
        super(props);

        this.renderNode = this.renderNode.bind(this);
    }

    imageMaxWidth = 320;
    imageMaxHeight = 190;

    componentDidMount(){
        this.setEnforcedImageRatio();
    }

    setEnforcedImageRatio(){
        this.imageMaxWidth  = Dimensions.get('window');
        this.imageMaxWidth  = this.imageMaxWidth.width - 40;
        this.imageMaxHeight = (this.imageMaxWidth / 100) * 56;
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
        console.log(this.imageMaxWidth)
        console.log(this.imageMaxHeight)
        return(
            <View style={styles.article}>
                <Link to={`/` + this.props.prefix + `/` + this.props.id}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </Link>
                {this.props.image &&
                <Link to={`/` + this.props.prefix + `/` + this.props.id}>
                    <Image
                        key={this.props.id}
                        source={{ uri: this.props.image}}
                        style={{ width: this.imageMaxWidth, height: this.imageMaxHeight, marginBottom: 20 }}
                    />
                </Link>
                }
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