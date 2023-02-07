import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Divider, IconButton, List, MD3Colors, Text, Button } from "react-native-paper";
import AvatarImage from "../components/Avatar";
import Grid from "../components/Grid";
import Imagebackground from "../components/Imagebackground";
import Statistics from "../components/Statistics";

const Profile = () => {
  return (
      <ScrollView style={styles.container}>
        <Imagebackground/>
        <AvatarImage/>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>Username</Text>
        </View>
        <Statistics />
        <View style={styles.buttonEditProfileContainer}>
          <Button
            mode="contained"
            onPress={() => console.log('Edit Profile')}
            dark={true}
            buttonColor={'#6adc99'}>
            Edit Profile
          </Button>
        </View>
        <View style={styles.buttonLogOutContainer}>
          <Button
            mode="contained"
            onPress={() => console.log('Log out')}
            dark={true}
            buttonColor={'#6adc99'}>
            Log out
          </Button>
        </View>
        <Grid />
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    backgroundColor:'#212121',
  },
  usernameContainer:{
    position:'absolute',
    alignItems: 'center',
    left:0,
    right:0,
    top:180
  },
  username:{
    fontSize:25,
    color:'black',
    fontWeight:'800'
  },
  buttonEditProfileContainer:{
    position:'absolute',
    left:0,
    right:0,
    top:275,
  },
  buttonLogOutContainer:{
    position:'absolute',
    left:0,
    right:10,
    alignItems:'flex-end',
    top:25
  }

})
export default Profile;


