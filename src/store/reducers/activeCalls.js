import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActive: false, 
}

export const activeCalls = createSlice({
  name: 'activeCalls',
  initialState,
  reducers: {
    updateCalls: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
  },
})
// Action creators are generated for each case reducer function
export const { updateCalls } = activeCalls.actions

export default activeCalls.reducer



/* 
activeTask
{
    contactId: '06a41dc8-997a-4285-a208-27c90d8b2944',
    initialContactId: 'c20cb76d-1862-41eb-8541-fc9b86827aa1',
    type: 'chat',
    state: {
      type: 'connected',
      timestamp: '2022-12-24T21:16:19.711Z'
    },
    queue: {
      queueARN: 'arn:aws:connect:us-east-1:039289871235:instance/78e878e8-2ffd-4183-b1a8-8ca60d65a9ad/queue/b5c6ce6e-ed86-48c5-a3a5-fb7ae25d1500',
      name: 'BasicQueue',
      queueId: 'arn:aws:connect:us-east-1:039289871235:instance/78e878e8-2ffd-4183-b1a8-8ca60d65a9ad/queue/b5c6ce6e-ed86-48c5-a3a5-fb7ae25d1500'
    },
    queueTimestamp: null,
    connections: [
      {
        connectionId: '90731a8b-71d9-4764-ab48-caf3bca65e1a',
        endpoint: {
          endpointARN: null,
          type: 'agent',
          name: null,
          phoneNumber: null,
          agentLogin: null
        },
        state: {
          type: 'connected',
          timestamp: '2022-12-24T21:16:19.711Z'
        },
        type: 'agent',
        initial: false,
        chatMediaInfo: {
          chatAutoAccept: false,
          connectionData: '{"ConnectionAuthenticationToken":"QVFJREFIZzI0N0RNMnY2aVBPWXdGaHBzL1Bib0tZSWVZN2VhWEJyUTcwOG5rdnY5c2dHbWtRRXQ1MlAyaG9kR1pLSUFLdWNXQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNazk0T2JWeVMzWmcwTFdpTkFnRVFnQ3VVUjBIcitIR3RnQ2t0UVNQUVdTVHJST1gvbE5DUjRZK0ljSGhZN3QyNHRNTGJjbFNzL0c2eS9MNGo6Onk2ZWhHT1hNMFhhNndpVGQ3NEsyM3BqYTg4VHNIMjhBOTl4RDZ6OWFlMnM4NWJtaUVHUWlLemFqUkZmZzJOcCtTWmtRaTI4L084RTFnbWVJUGVRTVFVZlMwd0dueWNBY0MyNjhuZFl0dkZZTU5KWDROeGFMSGFLM3UzU2JrcGZNMzRGTm0zUkZjU205TGRESmVrZ1VTSDlMTStRdmwweStpTzI4T1hCd2ovTnRxSk5KdXBSQmZvUU1GWUpqY05jMWNlQmM3RDJVcmszS3VDc1dudGl5VTJtY1ByTjloL0ozUHJJZFR3PT0=","Expiry":"2022-12-31T21:16:14.628Z"}',
          customerName: null
        },
        mute: null,
        forcedMute: null,
        quickConnectName: null,
        monitorStatus: null,
        address: {
          endpointARN: null,
          type: 'agent',
          name: null,
          phoneNumber: null,
          agentLogin: null
        }
      },
      {
        connectionId: 'd00dc58c-71ff-4f4e-8f53-1e605cf87e14',
        state: {
          type: 'connected',
          timestamp: '2022-12-24T21:16:19.711Z'
        },
        type: 'inbound',
        initial: true,
        chatMediaInfo: {
          chatAutoAccept: null,
          connectionData: null,
          customerName: 'Customer'
        },
        mute: null,
        forcedMute: null,
        quickConnectName: null,
        monitorStatus: null
      }
    ],
    attributes: {
      'Distribute by percentage': {
        name: 'Distribute by percentage',
        value: '8%'
      }
    },
    contactDuration: '5',
    name: null,
    description: null,
    initiationMethod: null,
    contactFeatures: {
      attachmentsEnabled: false,
      messagingMarkdownEnabled: true,
      multiPartyConferenceEnabled: null
    },
    status: {
      type: 'connected',
      timestamp: '2022-12-24T21:16:19.711Z'
    }
  }


*/