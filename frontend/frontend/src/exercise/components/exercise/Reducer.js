import React, { createContext , useReducer , useContext } from 'react';
import axios from 'axios'

// 초기상태 설정
const initialState = []

// 함수 설정

export async function gerFeed(page ,dispatch){
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/photos/${page+1}`
        );
        dispatch({ type: 'GET_NEW_FEED' , data: response.data})
    }catch(e){
        console.log('error')
    }
}

// 리듀서 
function getFeedReducer(state,action) {
    switch (action.type) {
        case 'GET_NEW_FEED':
            return{
                ...state,
                
            }
    }
}
