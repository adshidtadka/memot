import React from "react";
import { StyleSheet, View, TextInput, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { StackActions, NavigationActions, NavigationScreenProp } from "react-navigation";
import * as SecureStore from "expo-secure-store";

import Loading from "../elements/Loading";

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

class LoginScreen extends React.Component<LoginScreenProps, object> {
  state = {
    email: "",
    password: "",
    isLoading: true
  };
  navigateToHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Home" })]
    });
    this.props.navigation.dispatch(resetAction);
  }
  async componentDidMount() {
    const email = await SecureStore.getItemAsync("email");
    const password = await SecureStore.getItemAsync("password");
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ isLoading: false });
          this.navigateToHome();
        })
        .catch(() => {});
    } else {
      this.setState({ isLoading: false });
    }
  }
  handleChangeText(text: String) {
    this.setState({ email: text });
  }
  handleSubmit() {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.setState({ isLoading: false });
          SecureStore.setItemAsync("email", this.state.email);
          SecureStore.setItemAsync("password", this.state.password);
          this.navigateToHome();
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  handlePress() {
    this.props.navigation.navigate("Signup");
  }
  render() {
    return (
      <View style={styles.container}>
        <Loading text="ログイン中" isLoading={this.state.isLoading} />
        <Text style={styles.title}>ログイン</Text>
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
          <Text style={styles.buttonTitle}>ログインする</Text>
        </TouchableHighlight>
        <TouchableOpacity style={styles.signup} onPress={this.handlePress.bind(this)}>
          <Text style={styles.signupText}>メンバー登録する</Text>
        </TouchableOpacity>
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
    backgroundColor: "#eee",
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
  },
  signup: {
    marginTop: 16,
    alignSelf: "center"
  },
  signupText: {
    fontSize: 16
  }
});

export default LoginScreen;
