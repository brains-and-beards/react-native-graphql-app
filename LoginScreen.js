import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://mysterious-harbor-82544.herokuapp.com'
  }),
  cache: new InMemoryCache()
});

const signUp = gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export class LoginScreen extends Component {
  state = {
    password: '',
    name: '',
    email: '',
    resultRegister: '',
    resultLogin: ''
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Mutation mutation={signUp}>
            {(signUpMutation, { data }) => (
              <View>
                <Text style={styles.welcome}>Register user:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ name: text })}
                  value={this.state.name}
                  placeholder="name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.type}
                  placeholder="email"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ password: text })}
                  value={this.state.type}
                  secureTextEntry={true}
                  placeholder="password"
                />
                <Button
                  onPress={() => {
                    signUpMutation({
                      variables: {
                        email: this.state.email,
                        name: this.state.name,
                        password: this.state.password
                      }
                    })
                      .then(res => {
                        console.log(
                          '​LoginScreen -> res.data.login.token',
                          res.data.signUp.token
                        );
                        this.setState({
                          resultRegister: 'SUCCESS',
                        });

                        return res;
                      })
                      .catch(err => <Text>{err}</Text>);
                  }}
                  title="Register user"
                />
                <Text>{this.state.resultRegister}</Text>
              </View>
            )}
          </Mutation>
          <Mutation mutation={login}>
            {(loginMutation, { data }) => (
              <View>
                <Text style={styles.welcome}>Login user:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.type}
                  placeholder="email"
                />

                <TextInput
                  style={styles.input}
                  onChangeText={text => this.setState({ password: text })}
                  value={this.state.type}
                  secureTextEntry={true}
                  placeholder="password"
                />
                <Button
                  onPress={() => {
                    loginMutation({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    })
                      .then(res => {
                        console.log(
                          '​LoginScreen -> res.data.login.token',
                          res.data.login.token
                        );
                        this.setState({
                          resultLogin: 'SUCCESS',
                        });

                        return res;
                      })
                      .catch(err => {
                        console.log('​LoginScreen -> err', err);
                        return <Text>{err}</Text>;
                      });
                  }}
                  title="Login user"
                />
                <Text>{this.state.resultLogin}</Text>
              </View>
            )}
          </Mutation>
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
  input: {
    height: 30,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    padding: 1
  }
});
