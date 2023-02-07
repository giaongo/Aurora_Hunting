import React, {useState} from 'react';
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
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

const Upload = () => {
  const [mediaFile, setMediaFile] = useState(null);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {title: '', description: '', locationTag: ''},
    mode: 'onBlur',
  });

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
      }
    } catch (error) {
      console.error('Media Upload error', error);
    }
  };

  const uploadFile = async (uploadData) => {
    console.log('upload data', uploadData);
  };

  return (
    <ScrollView style={styles.uploadScreen}>
      <TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Card mode="contained" style={{borderRadius: '0'}}>
            <View style={styles.cardUploadContainer}>
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
                <Text>Video</Text>
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
                    label="Location Tag (separate wtih commas)"
                    mode="outlined"
                    textColor="#212121"
                    placeholder="(Eg: Pohjoisranta, Rovaniemi) "
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
                  errors.title || errors.description || errors.locationTag
                }
                onPress={handleSubmit(uploadFile)}
              >
                Upload
              </Button>
              <Button mode="outlined" style={styles.button}>
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
    backgroundColor: '#212121',
  },
  cardUploadContainer: {
    height: 190,
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

export default Upload;
