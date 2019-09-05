import React from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import fontAwsome from "../../assets/fonts/fa-solid-900.ttf";
import { createIconSet } from "@expo/vector-icons";

const CustomIcon = createIconSet(
  {
    pencil: "\uf303",
    plus: "\uf067"
  },
  "FontAwsome",
  fontAwsome
);

class CircleButton extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentWillMount() {
    await Font.loadAsync({
      FontAwsome: fontAwsome
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    const { name, style, color } = this.props;
    let bgColor = "#e31676";
    let textColor = "#fff";
    if (color === "white") {
      bgColor = "#fff";
      textColor = "#e31676";
    }
    return (
      <View style={[styles.CircleButton, style, { backgroundColor: bgColor }]}>
        {this.state.fontLoaded ? (
          <CustomIcon name={this.props.name} style={[styles.CircleButtonTitle, { color: textColor }]} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CircleButton: {
    position: "absolute",
    right: 32,
    bottom: 32,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  CircleButtonTitle: {
    fontFamily: "FontAwsome",
    fontSize: 24,
    lineHeight: 32
  }
});

export default CircleButton;
