export const createProfile=()=>{
    return {"FirstName":"Khizar ","LastName":"Ahmed","Gender":"MALE","PartyType":"INDIVIDUAL","BirthDate":"1986-09-07","AccountNumber":"9715463636","EmailAddress":"khizaras@gmail.com","MailingAddress":{"Address1":"102","Address2":"big street","Country":"IN","PostalCode":"600005","City":"Chennai","Province":"Tamil Nadu"},"PhoneNumber":"+919715463636","DomainName":"amazon-connect-P3fusion-uat"}
}

const tasksEndpoints=[
    {
        "endpointARN": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/73174441-536b-48a7-87dd-ff45406eee52",
        "endpointId": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/73174441-536b-48a7-87dd-ff45406eee52",
        "type": "agent",
        "name": "Jim",
        "phoneNumber": null,
        "agentLogin": null,
        "queue": null
    },
    {
        "endpointARN": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/245c9d61-c8fc-4f4e-9414-ea94b22c52e9",
        "endpointId": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/245c9d61-c8fc-4f4e-9414-ea94b22c52e9",
        "type": "agent",
        "name": "Supervisor",
        "phoneNumber": null,
        "agentLogin": null,
        "queue": null
    }
]
const taskTemplate=[
    {
        "Arn": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/task-template/0d82df03-9a49-43d6-a38c-707075e424e0",
        "CreatedTime": 1661515621.589,
        "Description": "Loss History",
        "Id": "0d82df03-9a49-43d6-a38c-707075e424e0",
        "LastModifiedTime": 1661515621.589,
        "Name": "Loss History",
        "Status": "ACTIVE"
    },
    {
        "Arn": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/task-template/0f6dbec0-4caa-4e25-bd61-1cef93899acb",
        "CreatedTime": 1661515495.04,
        "Description": "Address Change",
        "Id": "0f6dbec0-4caa-4e25-bd61-1cef93899acb",
        "LastModifiedTime": 1661515495.04,
        "Name": "Address Change",
        "Status": "ACTIVE"
    },
    {
        "Arn": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/task-template/0db3b826-c940-4611-b8b3-dd54e104fe9c",
        "CreatedTime": 1661515344.353,
        "Description": "Add additional building to existing insurance",
        "Id": "0db3b826-c940-4611-b8b3-dd54e104fe9c",
        "LastModifiedTime": 1661515344.353,
        "Name": "Add Building",
        "Status": "ACTIVE"
    }
]

const tasktemplates=[
    {
        "name": "Loss History",
        "description": "Loss History",
        "id": "0d82df03-9a49-43d6-a38c-707075e424e0",
        "fields": [
            {
                "Description": "The name of the task",
                "Id": {
                    "Name": "Task name"
                },
                "SingleSelectOptions": null,
                "Type": "NAME"
            },
            {
                "Description": "The description of the task",
                "Id": {
                    "Name": "Description"
                },
                "SingleSelectOptions": null,
                "Type": "DESCRIPTION"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Delivery method"
                },
                "SingleSelectOptions": [
                    "Email",
                    "Fax",
                    "Postal Mail"
                ],
                "Type": "SINGLE_SELECT"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Number of Years"
                },
                "SingleSelectOptions": null,
                "Type": "NUMBER"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Lines of Coverage be shown in the report?"
                },
                "SingleSelectOptions": null,
                "Type": "BOOLEAN"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Comments"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT_AREA"
            },
            {
                "Description": "The queue to assign the task to",
                "Id": {
                    "Name": "Assign to"
                },
                "SingleSelectOptions": null,
                "Type": "QUICK_CONNECT"
            },
            {
                "Description": "The scheduled time to complete the task",
                "Id": {
                    "Name": "Schedule"
                },
                "SingleSelectOptions": null,
                "Type": "SCHEDULED_TIME"
            }
        ]
    },
    {
        "name": "Add Building",
        "description": "Add additional building to existing insurance",
        "id": "0db3b826-c940-4611-b8b3-dd54e104fe9c",
        "fields": [
            {
                "Description": "The name of the task",
                "Id": {
                    "Name": "Task name"
                },
                "SingleSelectOptions": null,
                "Type": "NAME"
            },
            {
                "Description": "The description of the task",
                "Id": {
                    "Name": "Description"
                },
                "SingleSelectOptions": null,
                "Type": "DESCRIPTION"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Account Number"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Contact First Name"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Contact Last Name"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Account Status"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Building Type"
                },
                "SingleSelectOptions": [
                    "Newly Purchased Building",
                    "Newly Constructed Building"
                ],
                "Type": "SINGLE_SELECT"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Address of Location"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT_AREA"
            },
            {
                "Description": "The queue to assign the task to",
                "Id": {
                    "Name": "Assign to"
                },
                "SingleSelectOptions": null,
                "Type": "QUICK_CONNECT"
            },
            {
                "Description": "The scheduled time to complete the task",
                "Id": {
                    "Name": "Schedule"
                },
                "SingleSelectOptions": null,
                "Type": "SCHEDULED_TIME"
            }
        ]
    },
    {
        "name": "Address Change",
        "description": "Address Change",
        "id": "0f6dbec0-4caa-4e25-bd61-1cef93899acb",
        "fields": [
            {
                "Description": "The name of the task",
                "Id": {
                    "Name": "Task name"
                },
                "SingleSelectOptions": null,
                "Type": "NAME"
            },
            {
                "Description": "The description of the task",
                "Id": {
                    "Name": "Description"
                },
                "SingleSelectOptions": null,
                "Type": "DESCRIPTION"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Select type of Address Change"
                },
                "SingleSelectOptions": [
                    "Billing Address Change",
                    "General Correspondence",
                    "911 Address Change"
                ],
                "Type": "SINGLE_SELECT"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Effective Date"
                },
                "SingleSelectOptions": null,
                "Type": "DATE_TIME"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "New Address"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT_AREA"
            },
            {
                "Description": "",
                "Id": {
                    "Name": "Reason for Address Change"
                },
                "SingleSelectOptions": null,
                "Type": "TEXT_AREA"
            },
            {
                "Description": "The queue to assign the task to",
                "Id": {
                    "Name": "Assign to"
                },
                "SingleSelectOptions": null,
                "Type": "QUICK_CONNECT"
            },
            {
                "Description": "The scheduled time to complete the task",
                "Id": {
                    "Name": "Schedule"
                },
                "SingleSelectOptions": null,
                "Type": "SCHEDULED_TIME"
            }
        ]
    }
]