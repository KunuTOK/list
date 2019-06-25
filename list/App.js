import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
      <CheckBox title="Click Here" checked={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

// Примечание: hello world взято у себя для проверки раотоспособности. добавлен только CheckBox вот от сюда https://react-native-training.github.io/react-native-elements/docs/checkbox.html#checkedtitle
