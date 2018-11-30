import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import TextInput from './TextInput'
import {StyleSheet, View, Image, TouchableHighlight, KeyboardAvoidingView, Button, Text, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';

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
        img: require('../images/picture.png'),
        imageWasUploaded: false,
        };
        
        this.updateCNPJ = this.updateCNPJ.bind(this)
        this.updateNome = this.updateNome.bind(this)
    }

    getUserImage(cnpj){             
        ImagePicker.showImagePicker(null, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // <Image source={{uri: `data:image/gif;base64,${encodedData}`}} />
                this.setState({imageWasUploaded: true})
                const source = { uri: `data:image/png;base64,`+response.data };
            
                // You can also display the image using data:
                const source2 = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source);
                console.log(response.data);
                // console.log(source);
                this.setState({
                    img: source,
                });

                // this.uploadImageToFirebase(cnpj, source['uri']);
            }
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <ScrollView style={styles.card} contentContainerStyle={{alignItems: 'center'}}>
                <Image
                    source={require('../images/grupodelta-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.txtCadastro}>
                    Cadastro de Empresa:
                </Text>
                <TouchableHighlight onPress={() =>this.getUserImage()}>
                    <Image
                        source={this.state.img}
                        style={styles.img}
                    />
                </TouchableHighlight>
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
                <TouchableHighlight style={styles.btnSubmit} onPress={() => this.registerInFirebase(this.state.cnpj, this.state.nome)}>
                    <Text style={styles.txtButton}>Enviar</Text>
                </TouchableHighlight>
            </ScrollView>
        </View>
        );
    }

    registerInFirebase(){
        if(this.state.cnpj == "" || this.state.nome == ""){
            return
        }
        console.log(this.state.nome);

        var image;
        if(this.state.imageWasUploaded){
            image = this.state.img;
        }
        else{
            image = ""
        }
        fetch("https://delta-inova.firebaseio.com/empresas/" + this.state.cnpj + ".json",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({nome: this.state.nome, image: image['uri']})
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
        padding:20
      },
    card: {
        width: DEVICE_WIDTH -40,
        backgroundColor: '#fff',
        borderRadius:10,
        padding: 10
    },
    logo: {
        height: 100,
        resizeMode: 'contain',
        margin: 20,
        marginBottom: 10,
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

    },
    img:{
        height: 150,
        width: 150,
        marginBottom:10,
        resizeMode: 'contain',

    }
});