import { FlatList, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Avatar, Divider, IconButton, List, MD3Colors, Text } from "react-native-paper";
import Grid from "../components/Grid";

const DATA = [
  {
    number: '20',
    content: 'Favourites',
  },
  {
    number: '10',
    content: 'Comments',
  },
  {
    number: '9',
    content: 'Posts',
  },
];


const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{uri:'http://placekitten.com/g/200/300'}}
        resizeMethod='auto'
        style={styles.backgroundImg}
      />
      <Avatar.Image
        source={{uri: 'https://placedog.net/500'}}
        style={styles.avatar}
        size={120}
      />
      <Text variant="headlineMedium" style={styles.username}>Username</Text>
      <View style={styles.statisticsContainer}>
          {DATA.map((item) => {
            return(
            <View style={styles.statisticsColumn}>
              <Text style={styles.statisticsNumber}>{item.number}</Text>
              <Text style={styles.statisticsContent}>{item.content}</Text>
            </View>
            )
          })}
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconRow}>
          <IconButton
            icon={'google'}
            iconColor={MD3Colors.error100}
            size={40}
            onPress={() => console.log('pressed')}
            style={styles.icon}
          />
          <IconButton
            icon={'facebook'}
            iconColor={MD3Colors.error100}
            size={40}
            onPress={() => console.log('pressed')}
            style={styles.icon}
          />
          <IconButton
            icon={'twitter'}
            iconColor={MD3Colors.error100}
            size={40}
            onPress={() => console.log('pressed')}
            style={styles.icon}
          />
        </View>
      </View>
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
  backgroundImg: {
    flex:1,
    width:'100%',
    height:425,
    opacity:'0.5',
  },
  avatar: {
    position:'absolute',
    top:'15%'
  },
  username:{
    position:'absolute',
    color:'black',
    fontWeight:'800',
    top:'30%',
  },
  statisticsContainer:{
    width:"100%",
    position:'absolute',
    flexDirection:'row',
    justifyContent:"space-evenly",
    top:'40%',
  },
  statisticsColumn:{
    flexDirection:'column',
    alignItems:'center'
  },
  statisticsNumber:{
    fontSize:25,
    fontWeight:'800',

  },
  statisticsContent:{
    fontSize:20,
    fontWeight:'800'
  },
  iconContainer:{
    position:'absolute',
    width:'100%',
    top:'50%',
  },
  iconRow:{
    flexDirection:"row",
    justifyContent:'space-around',
  },
  icon:{
    backgroundColor:'#18f297'
  },
})
export default Profile;


