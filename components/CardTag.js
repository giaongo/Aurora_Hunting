import React from 'react';
import PropTypes from 'prop-types';
import {Text, Card} from 'react-native-paper';
import {StyleSheet} from 'react-native';
const CardTag = ({tag}) => {
  return (
    <Card style={styles.cardTagContainer}>
      <Text style={styles.cardTagText}>{tag}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardTagContainer: {
    backgroundColor: '#2C3539',
    borderRadius: 10,
    padding: 8,
    marginTop: 8,
    marginRight: 8,
  },
  cardTagText: {
    color: '#DAA520',
  },
});
CardTag.propTypes = {
  tag: PropTypes.string,
};

export default CardTag;
