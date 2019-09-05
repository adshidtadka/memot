import React from "react";
import { StyleSheet, View } from "react-native";
import firebase from "firebase";

import MemoList from "../components/MemoList";
import CircleButton from "./../elements/CircleButton";

// this.props.navigation.navigate("MemoEdit");

class MemoListScreen extends React.Component {
  handlePress() {
    const { params } = this.props.navigation.state;
    console.log(params);
    const db = firebase.firestore();
    db.collection(`users/${params.currentUser.user.uid}/memos`)
      .add({
        body: "test memo",
        createdOn: "2017-12-12"
      })
      .then(docRef => {
        console.log(docRef.id);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <MemoList navigation={this.props.navigation} />
        <CircleButton name="plus" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fffdf6"
  }
});

export default MemoListScreen;
