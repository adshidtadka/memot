import React from "react";
import { StyleSheet, View, TextInput, KeyboardAvoidingView } from "react-native";
import firebase from "firebase";
import { NavigationScreenProp } from "react-navigation";

import CircleButton from "./../elements/CircleButton";

interface MemoCreateScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

class MemoCreateScreen extends React.Component<MemoCreateScreenProps, object> {
  state = {
    body: ""
  };
  handlePress() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    db.collection(`users/${currentUser.uid}/memos`)
      .add({
        body: this.state.body,
        createdOn: new Date()
      })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(() => {});
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={80}>
        <TextInput
          style={styles.memoEditInput}
          value={this.state.body}
          multiline
          onChangeText={text => {
            this.setState({ body: text });
          }}
        />
        <CircleButton name="check" onPress={this.handlePress.bind(this)} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  memoEditInput: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    fontSize: 16,
    textAlignVertical: "top"
  }
});

export default MemoCreateScreen;
