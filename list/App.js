import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button
} from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.a}>
        <Text> № | ☑ | Товара | €,₽,$ | количество | шт,упк,г,мл |</Text>
        <UselessTextInput />
        <Button
          onPress={true}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "введите текст" };
  }

  render() {
    return (
      <View>
        <TextInput
          style={{
            height: 30,
            borderColor: "gray",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "space betwen"
          }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  a: {
    flex: 0,
    backgroundColor: "ffd700",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    borderWidth: 2
  }
});
