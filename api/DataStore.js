import React from 'react';

export default class DataStore {
    static base_url = 'http://mobfup.wpdevcloud.com';

    static async getTokenAsync(config) {
        let response;
        try {
            response = await fetch(DataStore.base_url + "/wp-json/jwt-auth/v1/token", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: config.username,
                    password: config.password
                })
            });
        } catch (error) {
            console.log(error);
            return;
        }

        const dataJson = JSON.parse(response);
        const token = dataJson["token"];

        console.log(token);
        return token;
    }

    static async getAllContactsAsync(authToken) {
        return [
            new Contact("Mohammad", "Active", "Contact Attempt Needed", [], "John", [], []),
            new Contact("Reza", "Waiting to be accepted", "Contact Established", [], "Mary", [], []),
            new Contact("Ali", "Waiting to be accepted", "First Meeting Scheduled", [], "Joseph", [], []),
            new Contact("Ahmed", "Waiting to be accepted", "First Meeting Scheduled", [], "David", [], []),
            new Contact("Zya", "Active", "Contact Established", [], "Daniel", [], []),
            new Contact("Mohammad", "Paused", "Contact Attempt Needed", [], "Alex", [], []),
            new Contact("Mohanad", "Closed", "Contact Attempt Needed", [], "Jon", [], []),
        ];

        // const response = await fetch(DataStore.base_url + "/wp-json/dt/v1/contacts", {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + authToken
        //     }
        // });

        // const dataJson = JSON.parse(response);
        // const contacts = [];

        // contactsArray = dataJson["contacts"];
        // if (!contactsArray.isArray())
        //     throw new Error("Server returned a non-array for list of all contacts.");

        // contactsArray.forEach(contactJson => {
        //     contacts.push(new Contact(
        //         contactJson["post_title"], // name
        //         contactJson["overall_status"], // status
        //         contactJson["seeker_path"],
        //         contactJson["milestones"], // name
        //         contactJson["assigned_to"]["name"], // assignedTo
        //         contactJson["locations"], // locations
        //         contactJson["groups"] // name
        //     ));
        // });

        // return contactsArray;
    }

    static async getContactByIdAsync(authToken, contactId) {
        // TODO: Finish implementing.
        const response = await fetch(DataStore.base_url + "/wp-json/dt/v1/contact/" + contactId.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        });

        const dataJson = JSON.parse(response);
        return dataJson["token"];
    }
}
