let AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
    let email = event.email;
    let phone = event.phone;
    let role = event.role;
    cognito_idp.adminCreateUser({
        UserPoolId: process.env.UserPoolId_cognitoHotspaceVendor,
        Username: `${email}`,
        DesiredDeliveryMediums: ["EMAIL", "SMS"],
        ForceAliasCreation: true,
        TemporaryPassword: "12345678",
        UserAttributes: [{
            Name: "custom:role",
            Value: `${role}`
        }, {
            Name: "email",
            Value: `${email}`
        }, {
            Name: "phone_number",
            Value: `${phone}`
        }, {
            Name: "email_verified",
            Value: true
        }],
        ValidationData: []
    }, function (error, data) {
        if (error) {
            console.log(error)
            // implement error handling logic here
            throw error;
        }
        // your logic goes within this block
        console.log(data);
    });
    cognito_idp.adminCreateUser({
        UserPoolId: process.env.UserPoolId_cognitoaaa,
        Username: "andun@adroitlogic.com",
        DesiredDeliveryMediums: ["SMS"],
        ForceAliasCreation: false,
        TemporaryPassword: "1234567@!sdd!A",
        UserAttributes: [],
        ValidationData: []
    }, function (error, data) {
        if (error) {
            // implement error handling logic here
            throw error;
        }
        // your logic goes within this block
    });


    callback(null, { "message": "Successfully executed" });
}