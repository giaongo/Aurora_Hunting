import React, {useCallback, useContext, useState} from 'react';
import {
  Card,
  IconButton,
  Text,
  TextInput,
  HelperText,
  Button,
} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {Video} from 'expo-av';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {appId} from '../utils/variables';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

const Upload = ({navigation}) => {
  const [mediaFile, setMediaFile] = useState(null);
  const {update, setUpdate} = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const video = React.useRef(null);
  const {
    control,
    formState: {errors},
    handleSubmit,
    reset,
    trigger,
  } = useForm({
    defaultValues: {title: '', description: '', locationTag: ''},
    mode: 'onBlur',
  });

  const resetForm = () => {
    setMediaFile(null);
    reset();
  };
  const pickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      console.log(result);
      if (!result.canceled) {
        setMediaFile(result.assets[0]);
        trigger();
      }
    } catch (error) {
      console.error('Media Upload error', error);
    }
  };

  const uploadFile = async (uploadData) => {
    setLoading(true);
    const formData = new FormData();
    const locationTags = uploadData.locationTag
      .split(',')
      .map((tag) => tag.trim().toLowerCase());

    formData.append('title', uploadData.title);
    formData.append(
      'description',
      JSON.stringify({
        description: uploadData.description,
        tags: locationTags,
      })
    );

    const mediaFileName = mediaFile.uri.split('/').pop();
    let mediaFileExt = mediaFileName.split('.').pop();
    if (mediaFileExt === 'jpg') mediaFileExt = 'jpeg';
    const mimeType = mediaFile.type + '/' + mediaFileExt;
    formData.append('file', {
      uri: mediaFile.uri,
      name: mediaFileName,
      type: mimeType,
    });
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const mediaUploadResult = await postMedia(formData, userToken);

      const tagsUploadResult = await postTag(
        mediaUploadResult.file_id,
        appId + '_mediafile',
        userToken
      );

      tagsUploadResult.length &&
        Alert.alert(
          'Your media is uploaded successfully',
          'File id: ' + mediaUploadResult.file_id,
          [
            {
              text: 'Back to Home',
              onPress: () => {
                setUpdate(!update);
                navigation.navigate('Home');
              },
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]
        );

      Alert.alert(
        'Your media is uploaded successfully',
        'File id: ' + mediaUploadResult.file_id,
        [
          {
            text: 'Back to Home',
            onPress: () => {
              setUpdate(!update);
              navigation.navigate('Home');
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      console.error('uploadFileError', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetForm();
      };
    }, [])
  );
  return (
    <ScrollView style={styles.uploadScreen}>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Card mode="contained" style={{borderRadius: 0}}>
            <View style={styles.cardUploadContainer}>
              {mediaFile && (
                <View
                  style={{position: 'absolute', right: 0, top: 0, zIndex: 10}}
                >
                  <IconButton
                    icon="close-thick"
                    size={22}
                    iconColor="white"
                    containerColor="#bf2c2c"
                    onPress={() => setMediaFile(null)}
                  />
                </View>
              )}
              {!mediaFile ? (
                <View style={styles.cardUpload}>
                  <IconButton
                    icon="cloud-upload-outline"
                    size={70}
                    iconColor="#212121"
                    onPress={pickFile}
                  />
                  <Text style={{color: '#212121'}}>
                    Drop image/video file here
                  </Text>
                </View>
              ) : mediaFile.type === 'image' ? (
                <Image
                  source={{
                    uri: mediaFile?.uri || 'https://placekitten.com/200/300',
                  }}
                  style={{height: '100%'}}
                />
              ) : (
                <Video
                  ref={video}
                  style={{height: '100%'}}
                  source={{uri: mediaFile?.uri}}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onError={(error) => {
                    console.error('videoError', error);
                  }}
                />
              )}
            </View>

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'required',
                },
                minLength: {
                  value: 3,
                  message: 'Title min length is 3 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    style={styles.input}
                    label="Title"
                    mode="outlined"
                    textColor="#212121"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    error={errors.title && errors.title.message}
                  />
                  {errors.title && errors.title.message ? (
                    <HelperText type="error" visible={true}>
                      {errors.title.message}
                    </HelperText>
                  ) : null}
                </>
              )}
              name="title"
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'required',
                },
                minLength: {
                  value: 5,
                  message: 'Title min length is 5 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    style={styles.input}
                    label="Description"
                    mode="outlined"
                    textColor="#212121"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    error={errors.description && errors.description.message}
                  />
                  {errors.description && errors.description.message ? (
                    <HelperText type="error" visible={true}>
                      {errors.description.message}
                    </HelperText>
                  ) : null}
                </>
              )}
              name="description"
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'required',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    style={styles.input}
                    label="Address Tag (separate wtih commas)"
                    mode="outlined"
                    textColor="#212121"
                    placeholder="Eg: Pohjoisranta 22, Rovaniemi, Finland"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.locationTag && errors.locationTag.message}
                  />
                  {errors.locationTag && errors.locationTag.message ? (
                    <HelperText type="error" visible={true}>
                      {errors.locationTag.message}
                    </HelperText>
                  ) : null}
                </>
              )}
              name="locationTag"
            />

            <Card.Content style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={styles.button}
                disabled={
                  !mediaFile ||
                  errors.title ||
                  errors.description ||
                  errors.locationTag
                }
                onPress={handleSubmit(uploadFile)}
                loading={loading}
              >
                Upload
              </Button>
              <Button mode="outlined" style={styles.button} onPress={resetForm}>
                Reset
              </Button>
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  uploadScreen: {
    backgroundColor: '#121212',
  },
  cardUploadContainer: {
    height: 200,
    borderWidth: 3,
    borderStyle: 'dashed',
    marginHorizontal: 16,
    marginTop: 16,
    borderColor: '#212121',
  },
  cardUpload: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  button: {
    width: 150,
    margin: 16,
  },
});
Upload.propTypes = {
  navigation: PropTypes.object,
};
export default Upload;
