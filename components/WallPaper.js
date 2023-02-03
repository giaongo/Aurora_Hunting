import { ImageBackground, View, StyleSheet } from "react-native";

const WallPaper = () => {
    return (
			<View>
				<ImageBackground 
          source={{uri: 'http://placekitten.com/g/200/300'}} 
          resizeMethod='auto'
          style={styles.image} 
        />
			</View>
    );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'50%',
    opacity:'0.5'
  }
})
export default WallPaper;