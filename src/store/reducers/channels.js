import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  isLoaded: false,
  activeChannels: [],
  data: [],
  tasks: []

}

export const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateChannels: (state, action) => {
      return {
        ...state,
        isLoaded: true,
        data: action.payload

      }
    },
    updateTasks: (state, action) => {
      console.log({ action });
      return {
        ...state,
        tasks: action.payload
      }
    },
    addNewChannel: (state, action) => {
      return {
        ...state,
        activeChannels: action.payload
      }

    }
  },
})
// Action creators are generated for each case reducer function
export const { updateChannels, addNewChannel, updateTasks } = channels.actions

export default channels.reducer