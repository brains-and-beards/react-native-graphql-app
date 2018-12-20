import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { LoginScreen } from './LoginScreen';
import { DogsScreen } from './DogsScreen';

export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <LoginScreen />
          <DogsScreen />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: 40
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
