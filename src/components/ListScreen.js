import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import TextInput from './TextInput'
import {StyleSheet, View, Image, TouchableHighlight, KeyboardAvoidingView, Button, Text, TouchableOpacity} from 'react-native';

export default class ListScreen extends Component {
    static navigationOptions = {
    //     // header: null,
        title: 'Empresas Cadastradas',
    };

    constructor(props){
        super(props);
        
        this.state = {
            empresas: {}
        };
        
    }

    componentDidMount(){
        this.queryAPI()
    }

    queryAPI(){
        fetch('https://delta-inova.firebaseio.com/empresas.json')
            .then(response => response.json())
            .then((json) => {
                this.setState({empresas: json})
                console.log(this.state.empresas["123456789"]["nome"])
            });
    }
    
    render() {
        return (
        <View style={styles.container}>
            {
                Object.keys(this.state.empresas).map((key, index)=>{
                    return (
                        <View key={key+"view"} style={styles.card}>
                            <Image key={key+"img"} style={styles.imgCard} source={require('../images/company_icon.png')}/>
                            <Text key={key+"nome"}>{this.state.empresas[key]['nome']}</Text>
                        </View>

                    )
                })
            }
        </View>
        );
    }
    
    generateList(){
        var list;
        for(var key in this.state.empresas){
            list +=(<Text>{this.state.empresas[key]}</Text>)
        }
        return list;
    }

}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: '#2da1d2',
        padding: 10
    },
    imgCard: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    button:{
        padding:5,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: DEVICE_WIDTH/2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    card:{
        width: DEVICE_WIDTH -40,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius:10,
        padding: 10,
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: 'center'
    }

});