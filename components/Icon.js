import { StyleSheet, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

const IconImage = () => {
  return (
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
  );
}

const styles = StyleSheet.create({
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
export default IconImage;
