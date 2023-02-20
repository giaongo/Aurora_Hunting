import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';
import PropTypes from 'prop-types';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import {LinearGradient} from 'expo-linear-gradient';

const Test = ({route}) => {

  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  const test1= route.params;
  return (

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.test}
          duration={1500}
          isInteraction={false}
          shimmerColors={['#ebebeb', '#c5c5c5', '#ebebeb']}
        />

  )
}

const styles = StyleSheet.create({
  test: {
    width:'100%',
    height:500
  }
})


Test.propTypes = {
  route: PropTypes.object,
};
export default Test
