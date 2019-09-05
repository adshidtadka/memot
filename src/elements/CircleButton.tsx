import React from "react";
import { StyleSheet, View, Text } from "react-native";

class CircleButton extends React.Component {
  render() {
    const { style, color } = this.props;
    let bgColor = "#e31676";
    let textColor = "#fff";
    if (color === "white") {
      bgColor = "#fff";
      textColor = "#e31676";
    }
    return (
      <View style={[styles.CircleButton, style, { backgroundColor: bgColor }]}>
        <Text style={[styles.CircleButtonTitle, { color: textColor }]}>{this.props.children}</Text>
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
    fontSize: 32,
    lineHeight: 32
  }
});

export default CircleButton;
