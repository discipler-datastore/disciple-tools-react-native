class DiscipleAPI {

var base_url = 'http://mobfup.wpdevcloud.com';

    getToken() {
        var data = fetch( base_url + "/wp-json/jwt-auth/v1/token",
                {method: 'POST',
                 headers: {
                    'Content-Type': 'application/json'
                    },
                 body: json.stringify({
                    username: config.username,
                    password: config.password
                    })
                }
              )
        .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    }
    
    getAllContacts() {

    }

    getContactById() {

    }
    
}
