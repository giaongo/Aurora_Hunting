import React from 'react';
import PropTypes from 'prop-types';
import {Text, Card} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const CardTag = ({tags}) => {
  return (
    <View style={styles.cardTagContainer}>
      {tags &&
        tags?.map((tag, index) => {
          return (
            <Card key={index} style={styles.cardTag}>
              <Text variant="titleSmall" style={styles.cardTagText}>
                {'#' + tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Text>
            </Card>
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
    padding: 10,
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
