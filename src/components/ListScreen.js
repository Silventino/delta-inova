import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import TextInput from './TextInput'
import {StyleSheet, View, Image, TouchableHighlight, ScrollView, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';



export default class ListScreen extends Component {
    static navigationOptions = {
    //     // header: null,
        title: 'Empresas Cadastradas',
    };

    constructor(props){
        super(props);
        
        this.state = {
            empresas: {},
            img: require('../images/grupodelta-logo.png'),
        };
        
    }

    componentDidMount(){
        this.queryAPI();
        // requestCameraPermission();
        // this.getPhotos();
        // this.getUserImage();
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
                const source = { uri: `data:image/png;base64,`+response.data };
            
                // You can also display the image using data:
                const source2 = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source);
                console.log(response.data);
                // console.log(source);
                this.setState({
                    img: source,
                });

                this.uploadImageToFirebase(cnpj, source['uri']);
            }
        });
    }

    uploadImageToFirebase(cnpj, imagem){
        fetch("https://delta-inova.firebaseio.com/empresas/" + cnpj + "/image.json",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(imagem)
        })
        .then(function(res){ this.queryAPI() })
        .catch(function(res){ console.log(res) })

    }


    queryAPI(){
        fetch('https://delta-inova.firebaseio.com/empresas.json')
            .then(response => response.json())
            .then((json) => {
                console.log(json)
                if(json != null){
                    this.setState({empresas: json})
                }
            });
    }
    
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
            {
                Object.keys(this.state.empresas).map((key, index)=>{
                    return (
                        <TouchableHighlight key={key+"view"} style={styles.card} onPress={()=>{ this.getUserImage(key) }}>
                            <View style={styles.center}>
                                <Image key={key+"img"} style={styles.imgCard} source={{uri: this.state.empresas[key]['image']}}/>
                                <Text key={key+"nome"} style={{fontSize:18}}>{this.state.empresas[key]['nome']}</Text>
                                <Text key={key+"cnpj"}>CNPJ: {key}</Text>
                            </View>
                        </TouchableHighlight>

                    )
                })
            }
        </ScrollView>
        );
    }

    // getPhotos = () => {
    //     CameraRoll.getPhotos({
    //       first: 20,
    //       assetType: 'All'
    //     })
    //     .then(r => this.setState({ photos: r.edges }))
    // }
    
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
        // alignItems: 'center',
        backgroundColor: '#2da1d2',
        padding: 10
    },
    imgCard: {
        height: 150,
        width: 150,
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
        marginBottom: 10,
        justifyContent: 'center'
    },
    row:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    center:{
        alignItems: 'center',
        justifyContent: 'center',
    }

});