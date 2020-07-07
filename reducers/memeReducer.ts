  
import {Reducer, AnyAction} from "redux";
import { MemeEntity } from "../model/entity";

export interface MemeState {
    memes: MemeEntity[]
    error: boolean,
    loading: boolean
}

const initialState: MemeState = {
    memes: [],
    loading: false,
    error: false,
};

export const memeReducer: Reducer<MemeState, AnyAction> = (state: MemeState = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};