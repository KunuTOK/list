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
      <Text> № | ☑ | Товар | цена | количество | шт,упк,г,мл |</Text>
        <Text
        style={{
          flex: 0,
        // height: 20,
        width: 380,
          //borderColor: "gray",
          alignItems: "center",
          justifyContent: "center"
        }}> № | ☑ | Картофель | 15 ₽ | 5 | кг |</Text>
        <Text> № | ☑ | молоко | 36,9 ₽ | 2 | упк |</Text>
        <Text> № | ☑ | авокадо | 60 ₽ | 3 | шт |</Text>
        <UselessTextInput />
        <Button
          onPress={true}
          title="добавить"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
          <Text> итого: 328,8 ₽ </Text>
    </View>);
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
          alignItems: "stretch",
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
    alignItems: "stretch",
    justifyContent: "center",
//    borderWidth: 2,
//    flexDirection: "row",
    height: 200,
    width: 380,
  }
});
