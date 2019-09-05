import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Appbar from "./src/components/Appbar";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import MemoListScreen from "./src/screens/MemoListScreen";
import MemoDetailScreen from "./src/screens/MemoDetailScreen";
import MemoEditScreen from "./src/screens/MemoEditScreen";

const AppNavigator = createStackNavigator({
  Home: {
    screen: MemoListScreen,
    navigationOptions: {
      headerTitle: "Memot",
      headerStyle: {
        backgroundColor: "#265366"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
});

export default createAppContainer(AppNavigator);
