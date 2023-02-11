import React, {useContext, useRef, useState} from 'react';
import {
  Card,
  HelperText,
  TextInput,
  Button,
  IconButton,
} from 'react-native-paper';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Keyboard,
  View,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import {Video} from 'expo-av';
import {uploadsUrl} from '../utils/variables';
import {Controller, useForm} from 'react-hook-form';
import {useHeaderHeight} from '@react-navigation/elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Modify = ({route, navigation}) => {
  const {
    file_id: fileId,
    title,
    description,
    filename,
    media_type: mediaType,
  } = route.params;

  const video = useRef(null);
  const allData = JSON.parse(description);
  const descriptionData = allData.description;
  const locationTagsData = allData.tags;
  const [locationTags, setLocationTags] = useState(locationTagsData);
  const {modifyMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      title: title,
      description: descriptionData,
      locationTag: locationTags.join(','),
    },
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const height = useHeaderHeight();

  const modifyFile = async (modifyFile) => {
    setLoading(true);
    const locationTags = modifyFile.locationTag
      .split(',')
      .map((tag) => tag.trim().toLowerCase());
    const formattedFile = {
      title: modifyFile.title,
      description: JSON.stringify({
        description: modifyFile.description,
        tags: locationTags,
      }),
    };
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await modifyMedia(formattedFile, fileId, userToken);
      Alert.alert('Your media is modified successfully', result.message, [
        {
          text: 'Back to Home',
          onPress: () => {
            setUpdate(!update);
            navigation.navigate('Home');
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
      ]);
    } catch (error) {
      console.error('Modify media failed', error);
    } finally {
      setLoading(false);
    }
  };

  const tagRemoveOnPress = (tag) => {
    const newLocationTags = locationTags.filter(
      (tagElement) => tagElement !== tag
    );
    setLocationTags(newLocationTags);
    setValue('locationTag', newLocationTags.join(','));
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={height + 47}
          style={{flex: 1}}
          enabled
        >
          <Card mode="contained">
            {mediaType === 'image' ? (
              <Image
                source={{
                  uri: uploadsUrl + filename,
                }}
                resizeMode="cover"
                style={styles.image}
              />
            ) : (
              <Video
                ref={video}
                style={{height: 250}}
                source={{uri: uploadsUrl + filename}}
                useNativeControls
                resizeMode="contain"
                isLooping
                onError={(error) => {
                  console.error('videoError', error);
                }}
              />
            )}
            <View style={styles.formContainer}>
              <View style={styles.form}>
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
                        multiline
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
                    minLength: {
                      value: 5,
                      message: 'Title min length is 5 characters',
                    },
                    onChange: (event) =>
                      setLocationTags(event.target.value.split(',')),
                  }}
                  render={({field: {onBlur, onChange}}) => (
                    <>
                      <TextInput
                        style={styles.input}
                        label="Location Tag (separate wtih ,)"
                        mode="outlined"
                        textColor="#212121"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={locationTags.join(',')}
                        error={errors.description && errors.description.message}
                      />
                      {errors.description && errors.description.message ? (
                        <HelperText type="error" visible={true}>
                          {errors.description.message}
                        </HelperText>
                      ) : null}
                    </>
                  )}
                  name="locationTag"
                />

                <View style={styles.cardTagContainer}>
                  {locationTags &&
                    locationTags?.map((tag, index) => {
                      const trimmedTag = tag.trim();
                      return (
                        <Card key={index} style={styles.cardTag}>
                          <Text variant="titleSmall" style={styles.cardTagText}>
                            {'#' +
                              trimmedTag.charAt(0).toUpperCase() +
                              trimmedTag.slice(1)}
                          </Text>
                          <IconButton
                            icon="close-thick"
                            size={8}
                            style={{
                              position: 'absolute',
                              right: -29,
                              top: -27,
                            }}
                            iconColor="white"
                            containerColor="#bf2c2c"
                            onPress={() => tagRemoveOnPress(tag)}
                          />
                        </Card>
                      );
                    })}
                </View>
                <Card.Content>
                  <Button
                    mode="contained"
                    style={styles.button}
                    loading={loading}
                    disabled={
                      errors.title || errors.description || errors.locationTag
                    }
                    onPress={handleSubmit(modifyFile)}
                  >
                    Modify
                  </Button>
                </Card.Content>
              </View>
            </View>
          </Card>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: 150,
  },
  input: {
    marginHorizontal: 8,
    marginTop: 8,
  },
  formContainer: {
    height: '100%',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    margin: 20,
  },
  cardTagContainer: {
    paddingTop: 8,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cardTag: {
    backgroundColor: '#2C3539',
    padding: 15,
    marginVertical: 15,
    marginRight: 15,
    position: 'relative',
  },
  cardTagText: {
    color: '#DAA520',
  },
});

Modify.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Modify;
