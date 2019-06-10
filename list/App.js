import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button
} from "react-native";

export default () => {
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
};

function UselessTextInput() {
  const [text, setText] = React.useState("введите текст");
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
        onChangeText={text => setText(text)}
        value={text}
      />
    </View>
  );
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
