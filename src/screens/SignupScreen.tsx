import React from "react";
import { StyleSheet, View, TextInput, Text, TouchableHighlight } from "react-native";
import firebase from "firebase";
import { StackActions, NavigationActions, NavigationScreenProp } from "react-navigation";

interface SignupScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

class SignupScreen extends React.Component<SignupScreenProps, object> {
  state = {
    email: "",
    password: ""
  };
  handleSubmit() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch(() => {});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>メンバー登録</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={text => {
            this.setState({ password: text });
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#c70f66">
          <Text style={styles.buttonTitle}>送信する</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 24,
    backgroundColor: "#fff"
  },
  input: {
    backgroundColor: "#ddd",
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    marginBottom: 24
  },
  button: {
    backgroundColor: "#e31676",
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center"
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18
  }
});

export default SignupScreen;
