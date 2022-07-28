import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import Axios from '../../axios.js';

export const getQuestion = createAsyncThunk('question/get',async (number,{rejectWithValue}) => {
    try{
        const response = await Axios.get(`/question/${number}`); 
        return response.data;   
    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data);
    }
});

export const submitTest = createAsyncThunk('question/submit',async (_,{rejectWithValue,getState}) => {
    try{
        const state = getState();
        const name = state.testReducer.name;
        const answers = state.testReducer.answers;
        const d = {  answers , name };        
        const response = await Axios.post('/test',d);
        return response.data;
    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data);
    }
} )

const testReducer = createSlice({
    name : "question",
    initialState : {
        name : '',
        question : {},
        answers : [],
        result : {},
        loading : false,
        error : ''
    },
    reducers : {
        addAnswer : (state,action) => {
            console.log(action.payload);
            state.answers.push(action.payload);
        },
        addName : (state,action) => {
            state.name = action.payload;
        }
    },
    extraReducers : {
        [getQuestion.fulfilled] : (state,action) => {
            state.loading = false;
            state.question = action.payload._doc;
        },
        [getQuestion.pending] : (state,action) => {
            state.loading = true
        },
        [getQuestion.rejected] : (state,action) => {
            state.loading = false;
            state.error = 'Cannot fetch question';
        },
        [submitTest.fulfilled] : (state,action) => {
            state.result = action.payload;
            state.loading = false;
        },
        [submitTest.pending] : (state,action) => {
            state.loading = true;
        },
        [submitTest.rejected] : (state,action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { addAnswer , addName } = testReducer.actions;

export default testReducer.reducer;