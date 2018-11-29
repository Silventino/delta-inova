import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import TextInput from './TextInput'
import {StyleSheet, View, Image, TouchableHighlight, KeyboardAvoidingView, Button, Text, TouchableOpacity} from 'react-native';

export default class FormScreen extends Component {
    static navigationOptions = {
        header: null,
        // title: 'Welcome',
    };

    constructor(props){
        super(props);

        this.state = {
 
        };
        
    }

    render() {
        return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../images/logo_white.png')}
            />

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Registration')}>
                <Text style={styles.txtButton}>Registrar Empresa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('List')}>
                <Text style={styles.txtButton}>Listar Empresas</Text>
            </TouchableOpacity>
            

        </View>
        );
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
    logo: {
        height: 140,
        resizeMode: 'contain',
        margin: 20,
        marginBottom: 40
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
    }

});