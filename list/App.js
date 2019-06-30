import React from "react";
import { 
  StyleSheet, 
  Text,
  View } from "react-native";
import { CheckBox } from "react-native-elements";
import {
  Table,
  Row,
} from "react-native-table-component";

export default class ExampleFour extends Component { 
  constructor(props) {
    super(props);   
  this.state = {
  a: ["f", "f", "f"]};  
  };
}

render() {  
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <Table>
        <Row 
        data={this.state.a}
        flexArr={[1, 1, 1]}
        />
      </Table> 
      <CheckBox
      checked={checked}
      onPress={() => setChecked(!checked)}
      />
     <Text> Hello, world!</Text>      
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

// Примечание: hello world взято у себя для проверки раотоспособности. добавлен только CheckBox вот от сюда https://react-native-training.github.io/react-native-elements/docs/checkbox.html#checkedtitle
