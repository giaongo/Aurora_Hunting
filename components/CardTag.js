import React from 'react';
import PropTypes from 'prop-types';
import {Text, Card, Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import CardIconButton from './CardIconButton';
import { useNavigation } from '@react-navigation/native';

const CardTag = ({tags}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardTagContainer} >
      {tags &&
        tags?.map((tag, index) => {
          return (
            <Button key={index} style={styles.cardTag} onPress={() => navigation.navigate('Weather', tags)} >
              <Text variant="titleSmall" style={styles.cardTagText}>
                {'#' + tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Text>
            </Button>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardTagContainer: {
    paddingTop: 8,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cardTag: {
    backgroundColor: '#2C3539',
    borderRadius: 10,
    marginTop: 5,
    marginRight: 5,
  },
  cardTagText: {
    color: '#DAA520',
  },
});
CardTag.propTypes = {
  tags: PropTypes.array,
};

export default CardTag;
