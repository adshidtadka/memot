import React from "react";
import { StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import firebase from "firebase";
import { NavigationScreenProp } from "react-navigation";

import CircleButton from "./../elements/CircleButton";

interface MemoEditScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

class MemoEditScreen extends React.Component<MemoEditScreenProps, object> {
  state = {
    body: "",
    key: ""
  };
  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      body: params.body,
      key: params.key
    });
  }
  handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();
    db.collection(`users/${currentUser.uid}/memos`)
      .doc(this.state.key)
      .update({
        body: this.state.body,
        createdOn: newDate
      })
      .then(() => {
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          body: this.state.body,
          key: this.state.key,
          createdOn: newDate
        });
        navigation.goBack();
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
            this.setState({
              body: text
            });
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

export default MemoEditScreen;
