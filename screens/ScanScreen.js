import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }
    getCameraPermissions = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status === 'granted',
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        })
    }
    handleBarCodeScanned = async ({ type, data }) => {
        const { buttonState } = this.state
        if (buttonState === "clicked") {
            this.setState({
                scanned: true,
                scannedData: ''
            })
        } else if (buttonState === "normal"){
            this.setState({
                scanned: false,
                scannedData: ''
            })
        }
    }
    render() {
        const buttonState = this.state.buttonState
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        if (buttonState === "clicked" && hasCameraPermissions) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}/>
            )
        } else if (buttonState === "normal") {
            return (
                <View style={styles.container}>
                    <View>
                        <Image
                            source={require("../assets/barcodescanner.jpg")}
                            style={{ width: 200, height: 200 }} />
                    </View>
                    <TouchableOpacity
                        style={styles.scanbutton}
                        onPress={this.getCameraPermissions()}
                        title="Barcode Scanner">
                        <Text style={styles.buttonText}>
                            Scan QR Code
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    scanButton: {
        backgroundColor: '#2169F3',
        padding: 10,
        margin: 10,
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})