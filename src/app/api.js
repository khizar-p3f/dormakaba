import  config from '../aws-exports'
export const getTopCallRequest = async() => {


    const query = `
    query ListTransferToTeams(
      $filter: ModelTransferToTeamsFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listTransferToTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          from
          to
          status
          requestedTime
          transferredTime
          id
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `;

    const variables = {
        filter: {
            status: {
                eq: "Requested",
            },
        },

    };

    //Get the top record from the list

    const options = {
       
        method: "POST",
        headers: {
            "x-api-key": config.aws_appsync_apiKey,
        },
        body: JSON.stringify({ query, variables }),
    };

    const request = new Request(config.aws_appsync_graphqlEndpoint, options);

    try {
        const response = await fetch(request);
        const json = await response.json();
        console.log("Response from the API: ", json);
        return json;
    } catch (error) {
        console.log("Error calling API: ", error);
        return error;
    }
}
