import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

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
]


const Statistics = () => {
  return (
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
  );
}

const styles = StyleSheet.create({
  statisticsContainer:{
    flex:1,
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
})

export default Statistics;
