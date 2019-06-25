import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { CheckBox } from "react-native-elements";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, world!</Text>
        <CheckBox title="Click Here" checked={true} />
        <CheckBox center title="Click Here" checked={true} />
        <CheckBox
          center
          title="Click Here"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={true}
        />

        <CheckBox
          center
          title="Click Here to Remove This Item"
          iconRight
          iconType="material"
          checkedIcon="clear"
          uncheckedIcon="add"
          checkedColor="red"
          checked={true}
        />
        <CheckBox
          checkedIcon={<Image source={require("../list/image/checked.png")} />}
          uncheckedIcon={
            <Image source={require("../list/image/unchecked.png")} />
          }
          checked={true}
          onPress={() => this.setState({ checked: !true })}
        />
      </View>
    );
  }
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
