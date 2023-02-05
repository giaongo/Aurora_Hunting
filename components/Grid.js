import { FlatList, Image, StyleSheet, View, Text } from "react-native";
import { Divider } from "react-native-paper";



// Sample Data
const northernLights = [
  { id: 1,image: 'https://pixabay.com/get/gbfc7bcba130986226ebbc01f52f7cc7cd7da4b4910fb44ae30e99a9af2b8fbe2e61090991db9450c74cccd7194d62ad8f86ae418f70f606082b5d705ede6562b5d40d7b5f91a120726efda5c8a39988f_640.jpg' },
  { id: 2,image: 'https://pixabay.com/get/g1d45d716bc23e4533f1e615a5f5c8122d3a713baf927b44b98f8bd46d01250c5847145431d4a74edc09e59378559ccdf73645e96884e46a03f13f7713d4b62e4c233788b31887a7c0836db4b599232fc_640.jpg' },
  { id: 3,image: 'https://pixabay.com/get/g69604c2e7c6d9625bb5f965faccf0d92dc0f5e54d5ce9bb12e2ffb945e054cedc6acedbe71acff95ee6b9b2393ea2d360ddc361c71288f2bb4e5e38538ce59bd57e8c78efa05d6251f8c4334d49f1ad8_640.jpg' },
  { id: 4,image: 'https://pixabay.com/get/ga9c30004cf132fbb53061d6fca5575da420ba4bfdd38249eb6b4c931eab25ad7f0ec99249480c341a6137bde9d61dd63aba29f80467457ed5b3fab1fb799e151b6b089526bbc0fb1c551e7a43817d5a4_640.jpg' },
  { id: 5,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
  { id: 6,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
  { id: 7,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
  { id: 8,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
  { id: 9,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
  { id: 10,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
  { id: 11,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
  { id: 12,image: 'https://pixabay.com/get/gad8892eaffe1002dadff3dbcf5783c5282fd103dffdcebbdfdcffe44de3bc97cbdfdcecd7fa0d9530ac0ea03c8dc9f8b6055d5a8d734fbfcc0c305daa77f8b4c86ff897ad2afa524853434a6b7084a8d_640.jpg' },
];

const Grid = () => {
  return (
    <View style={styles.background}>

    <FlatList
      data={northernLights}
      renderItem={({item}) => <Image source={{uri: item.image}} style={styles.image} />}
      numColumns={3}
    />
  </View>
);
};

const styles = StyleSheet.create({
  background: {
    flex: 3,
    top:'30%'
  },
  image:{
    height:100,
    width:'33.3%',
    borderWidth:0.5
  }
})

export default Grid;

