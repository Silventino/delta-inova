import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import TextInput from './TextInput'
import {StyleSheet, View, Image, TouchableHighlight, KeyboardAvoidingView, Button, Text, TouchableOpacity, CameraRoll, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';

// import RNFetchBlob from 'rn-fetch-blob'

// async function requestCameraPermission() {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           'title': 'Cool Photo App Camera Permission',
//           'message': 'Cool Photo App needs access to your camera ' +
//                      'so you can take awesome pictures.'
//         }
//       )
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the camera")
//       } else {
//         console.log("Camera permission denied")
//       }
//     } catch (err) {
//       console.warn(err)
//     }
// }



export default class ListScreen extends Component {
    static navigationOptions = {
    //     // header: null,
        title: 'Empresas Cadastradas',
    };

    constructor(props){
        super(props);
        
        this.state = {
            empresas: {},
            img: require('../images/company_icon.png'),
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
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            const source2 = { uri: 'data:image/jpeg;base64,' + response.data };
            console.log(source);
            // console.log(response.uri);
            // console.log(key);
            this.setState({
                img: source,
            });

            // this.uploadImageToFirebase(cnpj);

            }
        });
    }

    // uploadImageToFirebase(cnpj){
    //     RNFetchBlob.fetch('POST', "https://delta-inova.firebaseio.com/empresas/" + cnpj + ".json", {
    //         'header': JSON.stringify({
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }),
    //         'Content-Type' : 'application/octet-stream',
    //         // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
    //         // Or simply wrap the file path with RNFetchBlob.wrap().
    //     }, RNFetchBlob.wrap(this.state.img))
    //     .then((res) => {
    //         console.log(res.text())
    //     })
    //     .catch((err) => {
    //         // error handling ..
    //     })
    // }

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
                        <TouchableHighlight key={key+"view"} style={styles.card} onPress={()=>{ this.getUserImage(key) }}>
                            <View style={styles.row} >
                                <Image key={key+"img"} style={styles.imgCard} source={require('../images/company_icon.png')}/>
                                <Text key={key+"nome"}>{this.state.empresas[key]['nome']}</Text>
                            </View>
                        </TouchableHighlight>

                    )
                })
            }
            <Image source={this.state.img} style={{width:70, height:70}}/>
        </View>
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
        marginBottom: 10,
        justifyContent: 'center'
    },
    row:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',

    }

});