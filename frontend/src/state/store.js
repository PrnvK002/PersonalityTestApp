import { configureStore } from '@reduxjs/toolkit'
import testReducer from './reducers/testReducer';

const store = configureStore({
    reducer : {
        testReducer : testReducer
    }
});

export default store;