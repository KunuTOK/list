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
  const [items, setItems] = React.useState([
    {checked: false, price: 36.8},
    {checked: false, price: 180},
    {checked: false, price: 75}
]);
const toggleCheckbox = (i) => {
  let item = items[i];
  const newItems = [...items]
  newItems[i] = {...item, checked: !item.checked}
  setItems(newItems)
}
  const tableHead = ["№", "☑", "Товар", "цена"];
  const tableData = [
    [
      "1",
      <CheckBox
        checked={items[0].checked}
        onPress={() => toggleCheckbox(0)}
      />,
      "Молоко",
      <Text style={styles.text}>{items[0].price}</Text>
    ],
    [
      "2",
      <CheckBox
        checked={items[1].checked}
        onPress={() => toggleCheckbox(1)}
      />,
      "Авокадо",
      <Text style={styles.text}>{items[1].price}</Text>
    ],
    [
      "3",
      <CheckBox
        checked={items[2].checked}
        onPress={() => toggleCheckbox(2)}
      />,
      "Картофель",
      <Text style={styles.text}>{items[2].price}</Text>
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
        placeholder="введите например: Молоко"
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
