import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Camera} from 'expo-camera';
import {useState} from 'react';
import {Button} from 'react-native-paper';
import {useRef} from 'react';
const CameraShow = () => {
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState(null);
  const camera = useRef(null);

  const capturePhoto = async () => {
    try {
      const photo = await camera.current.takePictureAsync();
      setTakenPhoto(photo);
    } catch (error) {
      console.error('takingPictureError', error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(data) => {
          camera.current = data;
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => capturePhoto()}
          >
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CameraShow;
