import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import CardTag from './CardTag';
import CardIconButton from './CardIconButton';
import {uploadsUrl} from '../utils/variables';
const CardItem = ({data}) => {
  return (
    <Card style={styles.cardContainer} mode="contained">
      <Card.Title
        title="username"
        style={{color: '#f57b42'}}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={50}
            source={{uri: 'http://placekitten.com/200/300'}}
          />
        )}
      />
      <Card.Cover
        style={styles.cardImage}
        source={{uri: uploadsUrl + data.thumbnails.w160}}
      />
      <CardIconButton data={data} />
      <Text variant="titleLarge">{data.title}</Text>
      <Text varient="bodyMedium">{data.description}</Text>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingTop: 16,
        }}
      >
        <CardTag tag="#finland" />
        <CardTag tag="#espoo" />
        <CardTag tag="#vantaa" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#212121',
    flex: 1,
    marginBottom: 35,
    marginHorizontal: 30,
  },
  cardImage: {
    objectFit: 'cover',
  },
});

CardItem.propTypes = {
  data: PropTypes.object,
};

export default CardItem;
