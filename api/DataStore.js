import fetch from 'react-native';

export class DataStore {
    static base_url = 'http://mobfup.wpdevcloud.com';

    static async getTokenAsync(config) {
        const response = await fetch(base_url + "/wp-json/jwt-auth/v1/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json.stringify({
                username: config.username,
                password: config.password
            })
        });

        const dataJson = JSON.parse(response);
        return dataJson["token"];
    }
    
    static async getAllContactsAsync(authToken) {
        const response = await fetch(base_url + "/wp-json/dt/v1/contacts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        });

        const dataJson = JSON.parse(response);
        const contacts = [];

        contactsArray = dataJson["contacts"];
        if (!contactsArray.isArray())
            throw new Error("Server returned a non-array for list of all contacts.");

        contactsArray.forEach(contactJson => {
            contacts.push(new Contact(
                contactJson["post_title"], // name
                contactJson["overall_status"], // status
                contactJson["seeker_path"], 
                contactJson["milestones"], // name
                contactJson["assigned_to"]["name"], // assignedTo
                contactJson["locations"], // locations
                contactJson["groups"] // name
            ));
        });

        return contactsArray;
    }

    static async getContactByIdAsync(authToken, contactId) {
        // TODO: Finish implementing.
        const response = await fetch(base_url + "/wp-json/dt/v1/contact/" + contactId.toString(), {
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
