// @ts-check

import React, { Component } from "react";
import SwipeablePanel from "rn-swipeable-panel";
import { SQLite } from "expo-sqlite";
import { CalculatorInput } from 'react-native-calculator'

import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button,
  ScrollView,
  number,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,

} from "react-native-table-component";
import { CheckBox, } from "react-native-elements";

const db = SQLite.openDatabase("db.db");


const sql = (query: string, args: (string | number)[] = []) =>
  new Promise(
    (
      resolve: (x: {
        insertId?: number,
        rowsAffected: number,
        rows: Array<{
          [column: string]: any
        }>
      }) => void,
      reject
    ) =>
      db.transaction(tx =>
        tx.executeSql(
          query,
          args,
          (tx, result) => resolve(result),
          (tx, err) => reject(err)
        )
      )
  );

sql(
 "CREATE TABLE if not exists receipt (id	INTEGER NOT NULL, items	TEXT NOT NULL, price	NUMERIC, quatity	TEXT DEFAULT 1, unit	INTEGER, sum	NUMERIC, date	REAL);"
 ).then(
  x => console.log("table created"),
  x => console.error("failed to create a table", x)
);

sql(
  "insert into receipt (id,items) values (1,'kolbasa');"
  ).then(
   x => console.log("table add,x"),
   x => console.error("failed to add a table", x)
 );

sql(`select * from items where done = 1;`).then(
  x => console.warn("success", x.rowsAffected),
  x => console.log("error", x)
);

export default function ExampleFour() {
  const [editingItemNumber, setEditingItemNumber] = React.useState();
  const [items, setItems] = React.useState([
    { checked: false, price: 36.8, title: "Молоко" },
    { checked: false, price: 180, title: "Авокадо" },
    { checked: false, price: 75, title: "Картофель" }
  ]);
  const toggleCheckbox = i => {
    let item = items[i];
    const newItems = [...items];
    newItems[i] = { ...item, checked: !item.checked };
    setItems(newItems);
  };
  /**
   * @param {string} title
   */
  const onSubmit = title => {
    const newItems = [...items];
    newItems.push({ checked: false, price: 0, title });
    setItems(newItems);
  };
  const tableHead = ["№", "☑", "Товар", "цена"];
  const tableData = items.map((item, i) => [
    i + 1,
    <CheckBox checked={item.checked} onPress={() => toggleCheckbox(i)} />,
    <Text style={styles.text} onPress={() => setEditingItemNumber(i)}>
      {item.title}
    </Text>,
    <Text style={styles.text}>{item.price}</Text>
  ]);
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      <ScrollView>
        {
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
        }
      </ScrollView>
      <View style={styles.total}>
        <Text style={styles.totaltxt}> итого: 328,8 ₽ </Text>
      </View>
      <UselessTextInput onSubmit={onSubmit} />
      <View style={styles.btn}>
        <Text style={styles.btnText}>касса</Text>
      </View>
      <SwipeablePanel
        isActive={editingItemNumber !== undefined}
        onClose={() => {
          setEditingItemNumber(undefined);
        }}
      >
        {editingItemNumber !== undefined ? (
          <Text style={styles.text}>
            № {editingItemNumber + 1}: {items[editingItemNumber].title}
          </Text>
        ) : null}
           <Text style={styles.text}>Цена</Text>
        <CalculatorInput
          onChange={ number }
          fieldTextStyle={{ fontSize: 24 }}
          fieldContainerStyle={{ height: 36 }}
        />
      </SwipeablePanel>
    </View>
  );
}

function UselessTextInput({ onSubmit }) {
  const [text, setText] = React.useState("");
  const submitAndClear = () => {
    setText("");
    onSubmit(text);
  };
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
