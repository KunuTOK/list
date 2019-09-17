// @ts-check

import React, { Component } from "react";
import SwipeablePanel from "rn-swipeable-panel";
import { SQLite } from "expo-sqlite";
import { CalculatorInput } from "react-native-calculator";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Switch
} from "react-native";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import { CheckBox } from "react-native-elements";

const db = SQLite.openDatabase("db.db");

const sql = (query: string, args: (string | number)[] = []) =>
  new Promise(
    (
      resolve: (x: {
        insertId?: number,
        rowsAffected: number,
        rows: { length: number, item: (index: number) => any }
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
  "CREATE TABLE if not exists receipt (id	INTEGER NOT NULL, items	TEXT, price	NUMERIC, quantity	TEXT DEFAULT 1, unit	INTEGER, sum	NUMERIC, date	REAL);"
).then(
  x => console.log("table created"),
  x => console.error("failed to create a table", x)
);

export default function ExampleFour() {
  const [editingItemNumber, setEditingItemNumber] = React.useState();
  const [hiddenDel, setHiddenDel] = React.useState(true);

  let deleteButtonTitle = "";
if(hiddenDel) {
        deleteButtonTitle =  "удалить товар"
    }
    else {
        deleteButtonTitle =  "хватит удалять"
    }
console.log(deleteButtonTitle)

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    console.log("onmount");
    sql(`select * from receipt;`).then(
      x => {
        const rows = [];
        for (let step = 0; step < x.rows.length; step++) {
          rows.push(x.rows.item(step));
        }
        console.warn("get rows", rows);
        console.log(rows.length);
        setItems(
          rows.map(item => {
            console.warn("item", item);
            return {
              checked: false,
              sum: item.sum || 0,
              title: item.items,
              price: item.price,
              quantity: item.quantity
            };
          })
        );
      },
      x => console.log("error", x)
    );
  }, []);

  const toggleCheckbox = i => {
    let item = items[i];
    const newItems = [...items];
    newItems[i] = {
      ...item,
      checked: !item.checked
    };
    setItems(newItems);
  };
  const deleteItem = i => {
    let item = items[i];
    let newItems = [...items];
    console.log(items)
    newItems.splice(i, 1);
    sql("DELETE FROM receipt  WHERE items = ?", [item.title]).then(
      x => console.log(item.title, "title del", x),
      x => console.error("failed to del a title", x)
    );
    setItems(newItems);
  };
  /**
   * @param {string} title
   */
  const onSubmit = title => {
    sql("insert into receipt (id,items) values (1,?)", [title]).then(
      x => console.log("table add", x),
      x => console.error("failed to add a table", x)
    );
    const newItems = [...items];
    newItems.push({
      checked: false,
      sum: 0,
      title
    });
    setItems(newItems);
  };
  const tableHead = ["№", "☑", "Товар", "цена"];
  const tableData = items.map((item, i) => [
    i + 1,
    <CheckBox checked={item.checked} onPress={() => toggleCheckbox(i)} />,
    <Text style={styles.text} onPress={() => setEditingItemNumber(i)}>
      {item.title}
    </Text>,
    <Text style={styles.text}>{item.sum}</Text>, 
    <CheckBox checked={true}
    center
    iconRight
    iconType='material'
    checkedIcon='clear'
    uncheckedIcon='add'
    checkedColor='red'
    onPress={() => deleteItem (i)}
  />
  ]);
  const y = items.map(x => x.sum);
  const Sum = y.reduce((sum, current) => sum + current, 0);

  const updateItemquantity = i => {
    let item = items[i];
    const newItems = [...items];
    newItems[i] = {
      ...item,
      quantity: !item.quantity
    };
    setItems(newItems);
  };
  const onSubmit1 = quantity => {
    sql("UPDATE receipt SET quantity = ? WHERE items = ?", [quantity]).then(
    x => console.log("add", x.rows),
    x => console.error("failed to add", x)
    );
    const newquantity= [...items];
    newquantity.push({
    });
    setItems(newquantity);
  };
  const onSubmit2 = price => {
    sql("UPDATE receipt SET price = ? WHERE items = ?", [
      price
    ]).then(
    x => console.log(" add", x.rows),
    x => console.error("failed to add", x)
    );
    const newPrice = [...items];
    newPrice.push({
      price
    });
    setItems(newPrice);
  };
  const quantity = items.map(x => x.quantity);
  const price = items.map(x => x.price);

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          <Table
            borderStyle={{
              borderColor: "transparent"
            }}
          >
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
        <Text style={styles.totaltxt}> итого: {Sum} </Text>
      </View>
      <UselessTextInput onSubmit={onSubmit} />
      <View style={styles.btn}>
      <Button
        onPress={() => setHiddenDel(!hiddenDel)}
        title={deleteButtonTitle}
        color="red"
      />
             </View>
      <SwipeablePanel
        isActive={editingItemNumber !== undefined}
        onClose={() => {
          setEditingItemNumber(undefined);
        }}
      >
        {editingItemNumber !== undefined ? (
          <Text style={styles.text}>
            № {editingItemNumber + 1}: {items[editingItemNumber].title}{" "}
            {items[editingItemNumber].sum}
          </Text>
        ) : null}
        <Text style={styles.text}>количество {quantity}</Text>
        <UselessTextInput1 onSubmit1={onSubmit1} />
        <Text style={styles.text}>цена за единицу товара {price}</Text>
        <UselessTextInput2 onSubmit2={onSubmit2} />
        <CalculatorInput
          fieldTextStyle={{
            fontSize: 24
          }}
          fieldContainerStyle={{
            height: 36
          }}
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

function UselessTextInput1({ onSubmit1 }) {
  const [text, setText] = React.useState("");
  const submitAndClear = () => {
    setText("");
    onSubmit1(text);
  };
  return (
    <View>
      <TextInput
        style={styles.find}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="количество"
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

function UselessTextInput2({ onSubmit2 }) {
  const [text, setText] = React.useState("");
  const submitAndClear = () => {
    setText("");
    onSubmit2(text);
  };
  return (
    <View>
      <TextInput
        style={styles.find}
        onChangeText={text => setText(text)}
        value={text}
        placeholder="цена за единицу товара"
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
