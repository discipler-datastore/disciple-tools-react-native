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
        const dataJson = await response.json();
        const token = dataJson["token"];

        return token;
    }

    static async getAllContactsAsync(authToken) {
        const response = await fetch(DataStore.base_url + "/wp-json/dt/v1/contacts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        });

        const dataJson = await response.json();
        const contacts = [];

        contactsArray = dataJson["contacts"];
        contactsArray.forEach(contactJson => {
            contacts.push({
                name: contactJson["post_title"],
                status: contactJson["overall_status"],
                seekerPath: contactJson["seeker_path"],
                faithMilestones: contactJson["milestones"],
                assignedTo: contactJson["assigned_to"]["name"],
                locations: contactJson["locations"],
                groups: contactJson["groups"] 
            });
        });

        return contacts;
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
