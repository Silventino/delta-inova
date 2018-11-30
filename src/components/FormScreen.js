import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import TextInput from './TextInput';
import {StyleSheet, View, Image, TouchableOpacity, Alert, Modal, Text, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Popup from './PopupInfo';

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
            modalVisibility: false,
            confirm: true,
            msg: "",
        };
        
        this.updateCNPJ = this.updateCNPJ.bind(this)
        this.updateNome = this.updateNome.bind(this)
    }

    render() {
        return (
        <View style={styles.container}>

            <Popup
                modalVisibility={this.state.modalVisibility}
                confirm={this.state.confirm}
                msg={this.state.msg}
                onButtonPress={(close)=>{
                    this.changeModalVisibility(false);
                    console.log("apertou o botao")
                    if(close){
                        console.log("goBack!");
                        this.props.navigation.goBack();
                    }
                }}
            />

            <ScrollView style={styles.card} contentContainerStyle={{alignItems: 'center'}} keyboardShouldPersistTaps="always">
                <Image
                    source={require('../images/grupodelta-logo-horizontal.png')}
                    style={styles.logo}
                />
                <Text style={styles.txtCadastro}>
                    Cadastro de Empresa:
                </Text>
                <TouchableOpacity onPress={() =>this.getUserImage()}>
                    <Image
                        source={this.state.img}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TextInput 
                    placeholder="Nome da Empresa"
                    secureTextEntry={false}
                    autoCorrect={true}
                    onChangeText = {this.updateNome}
                    type={"default"}
                />
                <TextInput 
                    placeholder="CNPJ"
                    secureTextEntry={false}
                    autoCorrect={true}
                    onChangeText = {this.updateCNPJ}
                    type={"numeric"}
                />
                <TouchableOpacity style={styles.btnSubmit} onPress={() => this.submit()}>
                    <Text style={styles.txtButton}>Enviar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        );
    }

    submit(){
        if(!this.checkIfFieldsAreComplete()){
            return
        }
        if(!this.checkIfCNPJIsValid()){
            return
        }
        // O upload para o BD foi feito dentro da funçao checkIfCNPJIsUnique por que ela é assincrona
        if(!this.checkIfCNPJIsUnique()){
            return
        }
    }

    changeModalVisibility(visibility){
        this.setState({modalVisibility: visibility});
    }

    checkIfCNPJIsValid(){
        var isnum = /^\d+$/.test(this.state.cnpj);
        if(isnum){
            if(this.state.cnpj.length != 14){
                this.showPopUp(false, "CNPJ deve ter 14 dígitos.");
                return false;
            }
            return true;
        }
        else{
            this.showPopUp(false, "CNPJ deve conter apenas números.");
            return false;
        }
    }



    getUserImage(){             
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

    showPopUp(confirm, msg){
        this.setState({confirm: confirm, modalVisibility: true, msg: msg})
    }

    showPopupBasedOnResult(res){
        if(res['status'] == 200){
            this.showPopUp(true, "");
        }
        else{
            this.showPopUp(false, "Erro ao gravar no banco de dados.");
        }
    }

    checkIfFieldsAreComplete(){
        if(this.state.cnpj == "" || this.state.nome == ""){
            // this.setState({confirm: false, modalVisibility: true});
            this.showPopUp(false, "Preencha os campos CNPJ e nome da empresa.");
            return false
        }
        return true
    }


    checkIfCNPJIsUnique(){
        fetch('https://delta-inova.firebaseio.com/empresas/' + this.state.cnpj +'.json')
            .then(response => response.json())
            .then((json) => {
                console.log(json)
                if(json != null){   
                    this.showPopUp(false, "CNPJ já cadastrado.");
                    return false;
                }
                else{
                    this.registerInFirebase();
                    return true;
                }
        });
    }

    registerInFirebase(){
        var image;
        if(this.state.imageWasUploaded){
            console.log("Noss");
            image = this.state.img;
        }
        else{
            console.log("Foiii");
            image = {uri: ""}
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
            .then((res) => this.showPopupBasedOnResult(res))
            .catch(function(res){ })
 
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
        padding: 10,
    },
    logo: {
        width: DEVICE_WIDTH - 80,
        height: ((DEVICE_WIDTH - 80)/4),
        resizeMode: 'center',
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
        fontSize: 20,
        marginBottom: 15,

    },
    img:{
        height: 150,
        width: 150,
        marginBottom:10,
        resizeMode: 'contain',

    }
});