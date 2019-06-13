import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cell
} from 'react-native-table-component';

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['№', '☑', 'Товар', 'цена'],
      tableData: [
        ['1', '☑', 'молоко', '73.8 ₽' ],
        ['2', '☑', 'авокадо', '180 ₽' ],
        ['3', '☑', 'Картофель', '75 ₽' ],
      ];
      const products = [
    {id: 1, name: "молоко"},
    {id: 2, name: "авокадо"},
    {id: 3, name: "Картофель"}
];
const tableData = products.map(({id, name}) => [id, '☑️', name, '73.8 ₽' ]),
    }
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>касса</Text>
        </View>
      </TouchableOpacity>
    );

    return (
     <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} flexArr={[0.35, 0.35, 1.25, 0.75]} style={styles.head} textStyle={styles.text}/>
              <TableWrapper style={styles.row}>
          <Rows data={state.tableData} flexArr={[0.35, 0.35, 1.25, 0.75]} style={styles.Row} textStyle={styles.text}/>
              </TableWrapper>
        </Table>
       <UselessTextInput/>
         <View style={styles.total}>
          <Text style={styles.totaltxt}> итого: 328,8 ₽ </Text>
         </View>
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>касса</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }
}


function UselessTextInput() {
  const [text, setText] = React.useState("например: молоко");
  return (
    <View>
      <TextInput
        style={styles.text}
        onChangeText={text => setText(text)}
        value={text}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, paddingTop: 20, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: {fontSize: 20, margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { flex: 0, height: 40, backgroundColor: '#78B7BB',  borderRadius: 5},
  btnText: { fontSize: 25, textAlign: 'center', color: '#fff' },
  total: {flex: 0, height: 40, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'blue'},
  totaltxt: { fontSize: 20, textAlign: 'center', color: '#fff' },
});
