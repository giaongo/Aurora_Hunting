import { StyleSheet } from "react-native";
import { List } from "react-native-paper";


// Sample Data
const itemData = [
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
  {
    uri:
            "https://pixabay.com/get/g8184de64e451a7d64c07edfe1e2a4c186233d042502da50fb20b05a277ececb801f1d5f2420db5604c874b4904d6af1ac6d72fc711a5b9a52fab8a9e2ad82b50e7bd05f815c08baf310de4742e791143_640.jpg"
  },
]
const ListItem = () => {
  return (
    <List.Item>
      <List.Image
        source={{uri: itemData.uri}}
        style={styles.image}
      />
    </List.Item>
  );
}

const styles = StyleSheet.create({
  image:{
    width:'33.3%',
    height:200
  }
})

export default ListItem;
