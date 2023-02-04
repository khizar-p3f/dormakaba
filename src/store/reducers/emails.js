import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  isLoaded: false,
  data: [],
  body: {}

}

export const emails = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    updateEmails: (state, action) => {
      return {
        ...state,
        isLoaded: true,
        data: action.payload

      }
    },
    LoadEmail: (state, action) => {
      let id = action.payload.id
      let body = action.payload.body
      return {
        ...state,
        body: {
          ...state.body,
          [id]: body
        }

      }
    },

  },
})

//generate randomid ?


// Action creators are generated for each case reducer function
export const { updateEmails,LoadEmail } = emails.actions

export default emails.reducer