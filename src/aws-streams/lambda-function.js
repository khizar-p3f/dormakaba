const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

exports.handler = (event, context, callback) => {
    let connect = new AWS.Connect();

    const customerName = event.name;
    const customerPhoneNumber = event.number;
    const policynumber = event.policynumber;
    const renewaldate = event.renewaldate;
    const renewalamount = event.renewalamount;
    const product = event.product;

    let params = {
        "InstanceId": 'bc83e5db-b0ea-4c92-a4df-5b7d994869fa',
        "ContactFlowId": '691daa67-96e2-4c7a-96ac-6a093835e3b3',
        "SourcePhoneNumber": '+18447110802',
        "DestinationPhoneNumber": customerPhoneNumber,
        "Attributes": {
            'name': customerName,
            'policynumber': policynumber,
            'renewaldate': renewaldate,
            'renewalamount': renewalamount,
            'product': product
        }

    }

    connect.startOutboundVoiceContact(params, function (error, response) {
            if (error) {
                console.log(error)
                callback(error, null);
            } else {
                console.log('Initiated an outbound call with Contact Id ' + JSON.stringify(response.ContactId));
                callback(null, response);
            }
        }
    );


};