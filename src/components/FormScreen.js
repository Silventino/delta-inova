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
        cnpj: "",
        nome: "",
        };
        
        this.updateCNPJ = this.updateCNPJ.bind(this)
        this.updateNome = this.updateNome.bind(this)
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={require('../images/grupodelta-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.txtCadastro}>
                    Cadastro de Empresa
                </Text>
                <TextInput 
                    placeholder="Nome da Empresa"
                    secureTextEntry={false}
                    autoCorrect={true}
                    onChangeText = {this.updateNome}

                />
                <TextInput 
                    placeholder="CNPJ"
                    secureTextEntry={false}
                    autoCorrect={true}
                    onChangeText = {this.updateCNPJ}

                />
                <TouchableOpacity style={styles.btnSubmit} onPress={() => this.registerInFirebase(this.state.cnpj, this.state.nome)}>
                    <Text style={styles.txtButton}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    registerInFirebase(){
        if(this.state.cnpj == "" || this.state.nome == ""){
            return
        }
        console.log(this.state.nome);
        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        //     .then(response => response.json())
        //     .then(json => console.log(json));
        
        fetch("https://delta-inova.firebaseio.com/empresas/" + this.state.cnpj + ".json",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({nome: this.state.nome})
            })
            .then(function(res){ console.log(res) })
            .catch(function(res){ console.log(res) })
    }

    updateCNPJ(cnpjTxt){
        this.setState({cnpj : cnpjTxt});
    }
    updateNome(txt){
        this.setState({nome : txt});
    }

}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2da1d2',
      },
    card: {
        width: DEVICE_WIDTH -40,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius:10,
        padding: 10
    },
    logo: {
        height: 120,
        resizeMode: 'contain',
        margin: 20,
        marginBottom: 10
    },
    btnSubmit:{
        padding:5,
        backgroundColor: '#2da1d2',
        borderRadius: 20,
        width: DEVICE_WIDTH/2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    txtButton:{
        color: '#fff'
    },
    txtCadastro:{
        fontSize: 18,
        marginBottom: 10,

    }
});