import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, TouchableHighlight, Modal} from 'react-native';

export default class Popup extends Component {
    render() {
        // console.log("OIA AQUI")
        // console.log(this.props.confirm);
        if(!this.props.confirm){
            return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.modalVisibility}
                onRequestClose={() => {
                    this.props.onButtonPress();
                }}>
                <View style={{flex: 1, backgroundColor: '#000', opacity: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#fff', borderRadius: 20, padding: 20, opacity: 1}}>
                        <Text id="1" style={{marginBottom: 20}}>Erro ao cadastrar empresa.</Text>
                        <Text id="2" style={{marginBottom: 20}}>{this.props.msg}</Text>

                        <TouchableHighlight
                            style={{backgroundColor: '#DA5250', alignItems:'center', flexDirection:'row', borderRadius: 20, justifyContent: 'center', padding: 10}}
                            onPress={() => {
                            this.props.onButtonPress(false);
                            }}>
                            <Text>Sair</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            );
        }
        else{
            return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisibility}
                    onRequestClose={() => {
                        this.props.onButtonPress();
                    }}>
                    <View style={{flex: 1, backgroundColor: '#000', opacity: 0.7, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: '#fff', borderRadius: 20, padding: 20, opacity: 1}}>
                            <Text style={{marginBottom: 20}}>Empresa Cadastrada com Sucesso!</Text>
    
                            <TouchableHighlight
                                style={{backgroundColor: '#00C773', alignItems:'center', flexDirection:'row', borderRadius: 20, justifyContent: 'center', padding: 10}}
                                onPress={() => {
                                    this.props.onButtonPress(true);
                                }}>
                                <Text>OK!</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            );
        }
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#1E80BE',
    width: DEVICE_WIDTH - 80,
    height: 40,
    paddingLeft: 20,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    marginBottom: 20
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
});