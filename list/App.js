import React from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput } from 'react-native';



 export default class App extends React.Component {
  render() {
    return (
      <View style={styles.a}>
        <Text>  № | ☑ | Товара | €,₽,$ | количество | шт,упк,г,мл |</Text>
        </View>
    );
  }
}

 const styles = StyleSheet.create({
    a: {
    flex: 0,
    backgroundColor: 'ffd700',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 75,
  },
});
