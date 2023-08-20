import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const getMedicine = createAsyncThunk(
    'medicine/getMedicine',
    async () => {
        try {
            const response = await axios.get('http://34.125.245.208/application/');
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
)


const initialState = {
    isLoading: false,
    medicines: [],
}

const medicinesSlice = createSlice({
    name: 'medicine',
    initialState: initialState,
    reducers: {
        getMedicine(state, action) {
            state.medicines.push(action.payload)
        },
    },
    extraReducers: {
        [getMedicine.fulfilled]: (state, action) => {
            state.isLoading = false
            state.medicines = action.payload.map((el) => {
                return {
                    id: el,
                    name: el,
                }
            })
        },
    },
})

export default medicinesSlice.reducer
export const medicinesActions = medicinesSlice.actions

