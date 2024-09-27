import React, { createContext, useState, useReducer } from "react";
// import { data } from "../data/index.js";

export const MusicProvider = createContext();

// const initialState = {
//   data,
//   playlist: [],
// };

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_PLAYLIST":
            const existingSong = state.playlist.find(
                (song) => song.id === action.payload.id
            );
            if (existingSong) {
                return {
                    ...state,
                    playlist: state.playlist.map((song) =>
                        song.id === action.payload.id ? { ...song, quantity: song.quantity + 1 } : song
                    ),
                };
            } else{
                return {
                    ...state,
                    playlist: [...state.playlist, { ...action.paylod, quantity: 1 }]
                }
            }
            case "REMOVE_FROM_PLAYLIST":
                return {
                    ...state,
                    playlist: state.playlist.filter((song) => song.id !== action.payload),
                };
            case "UPDATE_QUANTITY":
                return {
                    ...state,
                    playlist: state.playlist.map((song) => 
                    song.id === action.payload.id 
                    ? { ...song, quantity: action.payload.quantity } 
                    : song
                )
                }
            default:
                return state;
    }
}

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ContextProvider.Provider value={{ state, dispatch }}>
            {children}
        </ContextProvider.Provider>
    )
}
