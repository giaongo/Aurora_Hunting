import {ImageBackground, StyleSheet} from 'react-native';

const Imagebackground = () => {
  return (
    <ImageBackground
      source={{uri: 'http://placekitten.com/g/200/300'}}
      resizeMethod="auto"
      style={styles.backgroundImg}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    width: '100%',
    height: 350,
    opacity: 0.5,
  },
});
export default Imagebackground;
