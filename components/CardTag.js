import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text, Card} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useTag} from '../hooks/ApiHooks';
import {appId} from '../utils/variables';

const CardTag = ({dataId}) => {
  const [locationTags, setLocationTags] = useState(null);
  const {getAllTagsByFileId} = useTag();

  const loadAllTagsByFileId = async () => {
    const allTags = await getAllTagsByFileId(dataId);
    const regex = new RegExp(`${appId}_location_`, 'g');
    const locationTags = allTags
      .filter((tagData) => tagData.tag.match(regex))
      .map((tagData) => tagData.tag.split('_').pop());

    setLocationTags(locationTags);
  };

  useEffect(() => {
    loadAllTagsByFileId();
  }, []);

  return (
    <View style={styles.cardTagContainer}>
      {locationTags?.map((tag, index) => {
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
  dataId: PropTypes.number,
};

export default CardTag;
