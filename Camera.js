import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera';

import RNMlKit from 'react-native-firebase-mlkit';

export default class Camera extends Component {
  
  takePicture = async function() {
    // if (this.camera) {
    //   const options = { quality: 0.5, base64: true };
    //   const data = await this.camera.takePictureAsync(options);
    //   console.log(data.uri);
    // }
    const options = { quality: 0.5, base64: true, skipProcessing: true, forceUpOrientation: true };
    const data = await this.camera.takePictureAsync(options);
    // for on-device (Supports Android and iOS)
    const deviceTextRecognition = await RNMlKit.deviceTextRecognition(data.uri); 
    console.log('Text Recognition On-Device', deviceTextRecognition);
    // for cloud (At the moment supports only Android)
    // const cloudTextRecognition = await RNMlKit.cloudTextRecognition(data.uri);
    // console.log('Text Recognition Cloud', cloudTextRecognition);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})
