import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
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
  const tableHead = ["№", "☑", "Товар", "цена", "количество", "шт,упк,г,мл"];
  const tableData = [
    ["1", "☑", "молоко", "36,9 ₽", "2", "упк"],
    ["2", "☑", "авокадо", "60 ₽", "3", "шт"],
    ["3", "☑", "Картофель", "15 ₽ ", "5", "кг"]
  ];
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderColor: "transparent" }}>
        <Row
          data={tableHead}
          flexArr={[0.35, 0.35, 1, 0.75, 0.75, 0.55]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.row}>
          <Rows
            data={tableData}
            flexArr={[0.35, 0.35, 1, 0.75, 0.75, 0.55]}
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
        checked={checked}
        onPress={() => setChecked(!checked)}
      />
    </View>
  );
}

function UselessTextInput() {
  const [text, setText] = React.useState("например: молоко");
  return (
    <View>
      <TextInput
        style={styles.find}
        onChangeText={text => setText(text)}
        value={text}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 20, backgroundColor: "#fff" },
  head: { height: 30, backgroundColor: "#808B97" },
  text: { margin: 6 },
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
    justifyContent: "space-between"
  }
});
