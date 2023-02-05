import { FlatList, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Avatar, Divider, IconButton, List, MD3Colors, Text } from "react-native-paper";
import AvatarImage from "../components/Avatar";
import Grid from "../components/Grid";
import IconImage from "../components/Icon";
import Imagebackground from "../components/Imagebackground";
import Statistics from "../components/Statistics";


const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Imagebackground/>
      <AvatarImage/>
      <Text variant="headlineMedium" style={styles.username}>Username</Text>
      <Statistics />
      <IconImage/>
      <Grid />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    width:'100%',
  },
  username:{
    position:'absolute',
    color:'black',
    fontWeight:'800',
    top:'30%',
  },
})
export default Profile;


