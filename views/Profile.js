import { Image, ImageBackground, StyleSheet, View, Text } from "react-native";
import WallPaper from "../components/WallPaper";

const Profile = () => {
    return (
      <>
        <View style={styles.container}>
          <ImageBackground 
            source={{uri: 'http://placekitten.com/g/200/300'}} 
            resizeMethod='auto'
            style={styles.backgroundImg} 
          />
          <Image 
            source={{uri: 'https://placedog.net/500'}}
            style={styles.image}
          />
          <Text style={styles.username}>Username goes here</Text>
        </View>
        <View>

        </View>


      </>
    );
}
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  backgroundImg: {
    flex: 1,
    width:'100%',
    height:'50%',
    opacity:'0.5'
  },
  image: {
    height:150,
    width:150,
    borderRadius: 100,
    position:'absolute',
    top:'10%'
  },
  username: {
    position:'absolute'
  }

})

export default Profile;