import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";

const AvatarImage = () => {
  return (
    <View style={styles.container}>
      <Avatar.Image
      source={{uri: 'https://placedog.net/500'}}
      size={135}
    />
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    alignItems:'center',
    left:0,
    right:0,
    top:50
  },

})
export default AvatarImage;
