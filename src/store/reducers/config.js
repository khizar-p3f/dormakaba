import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  templates: {
    isLoaded: false,
    data: []
  },
}

export const config = createSlice({
  name: 'config',
  initialState,
  reducers: {

    updateTemplates: (state, action) => {
      const id = action.payload.id
      return {
        ...state,
        templates: {
          isLoaded: true,
          data: action.payload.listTaskTemplates?.items,
        }

      }
    }
  },
})
// Action creators are generated for each case reducer function
export const { updateTemplates } = config.actions

export default config.reducer