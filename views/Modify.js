import React, {useRef, useState, useEffect} from 'react';
import {Card, HelperText, TextInput, Button} from 'react-native-paper';
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
} from 'react-native';
import PropTypes from 'prop-types';
import {Video} from 'expo-av';
import {uploadsUrl} from '../utils/variables';
import {Controller, useForm} from 'react-hook-form';
import {useHeaderHeight} from '@react-navigation/elements';
import {useTag} from '../hooks/ApiHooks';

const Modify = ({route}) => {
  const {
    file_id: fileId,
    title,
    description,
    filename,
    media_type: mediaType,
  } = route.params;
  const video = useRef(null);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    defaultValues: {title: title, description: description},
    mode: 'onBlur',
  });
  const {getAndFilterAllTagsByFileId} = useTag();
  const [locationTags, setLocationTags] = useState([]);

  const loadFilterdTags = async () => {
    try {
      const tags = await getAndFilterAllTagsByFileId(fileId);
      setLocationTags(tags);
    } catch (error) {
      console.error('loadFilterTagsError', error);
    }
  };

  useEffect(() => {
    loadFilterdTags();
  }, []);

  const modifyFile = () => {
    console.log('Modifyfile');
  };
  const height = useHeaderHeight();

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
          <Card
            mode="contained"
            style={{
              borderRadius: '0',
            }}
          >
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
                <View style={styles.cardTagContainer}>
                  {locationTags &&
                    locationTags?.map((tag, index) => {
                      return (
                        <Card key={index} style={styles.cardTag}>
                          <Text variant="titleSmall" style={styles.cardTagText}>
                            {'#' + tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </Text>
                        </Card>
                      );
                    })}
                </View>
                <Card.Content>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleSubmit(modifyFile)}
                  >
                    Upload
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
    height: 250,
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
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginRight: 18,
  },
  cardTagText: {
    color: '#DAA520',
  },
});

Modify.propTypes = {
  route: PropTypes.object,
};

export default Modify;
