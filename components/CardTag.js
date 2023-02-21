import React from 'react';
import PropTypes from 'prop-types';
import {Text, IconButton, Card} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CardTag = ({tags, hasRemoveBtn = false, tagRemoveOnPress = null}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardTagContainer}>
      {tags &&
        tags?.map((tag, index) => {
          return (
            <Card
              key={index}
              style={styles.cardTag}
              onPress={() => navigation.navigate('Weather', tags)}
            >
              <Text variant="titleSmall" style={styles.cardTagText}>
                {'#' + tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Text>
              {hasRemoveBtn ? (
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
              ) : null}
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
    marginVertical: 10,
    marginRight: 15,
    position: 'relative',
  },
  cardTagText: {
    color: '#DAA520',
  },
});
CardTag.propTypes = {
  tags: PropTypes.array,
  hasRemoveBtn: PropTypes.bool,
  tagRemoveOnPress: PropTypes.func,
};

export default CardTag;
