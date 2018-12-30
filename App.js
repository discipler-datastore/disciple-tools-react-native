import React from 'react';

import { StyleSheet, Platform, Image, Text, View, ScrollView, FlatList } from 'react-native';
import DataStore from './api/DataStore';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.token = "";
    }

    async componentDidMount() {
        await getToken();
        await this.getAllContacts();
    }

    async getToken() {
        const token = await DataStore.getTokenAsync({
            username: "eg",
            password: "worthyisthelamb"
        });
        this.token = token;
    }

    async getAllContacts() {
        const contacts = await DataStore.getAllContactsAsync(this.token);
        this.contacts = contacts;

        this.forceUpdate();
    }

    async getContact(contactName, contactId) {
        const contacts = await DataStore.getContactByIdAsync(this.token, contactName, contactId);
        this.contacts = contacts;

        this.forceUpdate();
    }

    renderAllContacts(item) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>Location: {item.locations && item.locations.length ? item.locations.join(", ") : "unknown"}</Text>
                <Text style={styles.subtitle}>Status: {item.status}</Text>
            </View>
        );
    }

    renderContactComment(comment) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.title}>Author: {comment.author}</Text>
                <Text style={styles.subtitle}>Comment: {comment.content} </Text>
            </View>
        );
    }

    renderContact(contact) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.title}>Name: {contact.name}</Text>
                <ScrollView>
                <FlatList
                    data={contact.comments}
                    renderItem={({item}) => this.renderContactComment(item)}
                />
                </ScrollView>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
            <Text/>
            <Text style={styles.welcome}>Find A Disciple</Text>
            <FlatList
                data={this.contacts}
                renderItem={({item}) => this.renderContact(this.getContact("Nina Kalb", 67))}
                // renderItem={({item}) => this.renderAllContacts(item)}
            />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        height: 120,
        marginBottom: 16,
        marginTop: 64,
        padding: 10,
        width: 135,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modules: {
        margin: 20,
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    },
    itemContainer: {
        margin: 20,
        backgroundColor: '#0d97a6',
        padding: 5,
        borderRadius: 10
    },
    title: {
        color: "#ffffff",
        fontSize: 24
    },
    subtitle: {
        color: "#ffffff",
        fontSize: 18
    }
});
