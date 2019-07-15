import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  submitAndClear
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Cell
} from "react-native-table-component";
import { CheckBox } from "react-native-elements";

export default function ExampleFour() {
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const tableHead = ["№", "☑", "Товар", "цена"];
  const tableData = [
    [
      "1",
      <CheckBox checked={checked} onPress={() => setChecked(!checked)} />,
      "Молоко",
      "73,8 ₽"
    ],
    [
      "2",
      <CheckBox checked={checked2} onPress={() => setChecked2(!checked2)} />,
      "Авокадо",
      "180 ₽"
    ],
    [
      "3",
      <CheckBox checked={checked3} onPress={() => setChecked3(!checked3)} />,
      "Картофель",
      "75 ₽ "
    ]
  ];
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderColor: "transparent" }}>
        <Row
          data={tableHead}
          flexArr={[0.35, 0.35, 1, 0.75]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.row}>
          <Rows
            data={tableData}
            flexArr={[0.26, 0.45, 1, 0.75]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
      <UselessTextInput />
      <View style={styles.total}>
        <Text style={styles.totaltxt}> итого: 328,8 ₽ </Text>
      </View>
      <View style={styles.btn}>
        <Text style={styles.btnText}>касса</Text>
      </View>
      <Text>Hello, world!</Text>
      <CheckBox
        title="Click Here"
        checked={checked1}
        onPress={() => setChecked1(!checked1)}
      />
    </View>
  );
}

function UselessTextInput() {
  const [text, setText] = React.useState("");
  return (
    <View>
      <TextInput
        style={styles.find}
        onChangeText={text => setText(text)}
        value={text}
        placeholder='введите например: Молоко'
        clearButtonMode="always"
      />
      <Button
        onPress={submitAndClear}
        title="добавить"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 20, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#808B97" },
  text: { margin: 6, fontSize: 18 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  btn: { flex: 0, height: 40, backgroundColor: "#78B7BB", borderRadius: 5 },
  btnText: { fontSize: 25, textAlign: "center", color: "#fff" },
  total: {
    flex: 0,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "blue"
  },
  totaltxt: { fontSize: 20, textAlign: "center", color: "#fff" },
  find: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    fontSize: 14,
    textAlign: "center"
  }
});
