import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const AvatarImage = () => {
  return (
    <Avatar.Image
      source={{uri: 'https://placedog.net/500'}}
      style={styles.avatar}
      size={120}
    />
  );
}

const styles = StyleSheet.create({
  avatar:{
    position:'absolute',
    top:'15%'
  }
})
export default AvatarImage;
