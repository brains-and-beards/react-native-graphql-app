import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const dogQuery = gql`
  query {
    dogs {
      name
      type
    }
  }
`;

const DogComponent = graphql(dogQuery)(props => {
  return !props.data.dogs ? (
    <Text>Loading...</Text>
  ) : (
    <Text>{props.data.dogs[0].name}</Text>
  );
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://eu1.prisma.sh/natalia-majkowska/dogs-service/dev',
    headers: {
      authorization: 'YOUR_TOKEN' // on production you need to store token in storage or in redux persist, for demonstration purposes we do this like that
    }
  }),
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Be ready for:</Text>
          <DogComponent />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
