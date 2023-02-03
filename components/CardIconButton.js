import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

const CardIconButton = ({data}) => {
  const [clickHeart, setClickHeart] = useState(false);
  return (
    <View style={styles.cardIconStatus}>
      <IconButton
        icon={clickHeart ? 'heart' : 'heart-outline'}
        size={30}
        iconColor="#E0E0E0"
        onPress={() => setClickHeart(!clickHeart)}
      />
      <Text>100</Text>
      <IconButton
        icon="comment-outline"
        size={30}
        iconColor="#E0E0E0"
        onPress={() => console.log('comment button pressed')}
      />
      <Text>100</Text>
      <IconButton
        icon="star-outline"
        size={35}
        iconColor="#E0E0E0"
        onPress={() => console.log('star button pressed')}
      />
      <Text>100</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardIconStatus: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
CardIconButton.propTypes = {
  data: PropTypes.object,
};

export default CardIconButton;
