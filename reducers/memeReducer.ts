  
import {Reducer, AnyAction} from "redux";
import { MemeEntity } from "../model/entity";
import { MemeConstants } from "../constants/memeConstants";
import { MemesLoadSuccessAction } from "../actions/memeActions";

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
        case MemeConstants.MEMES_LOAD:
            return {...state, loading: true, error: false};
        case MemeConstants.MEMES_LOAD_SUCCESS: {
            const payload = (<MemesLoadSuccessAction>action).payload;
            const { memes } = payload;
            return {...state,
                loading: false,
                error: false,
                memes
            };
        }
        case MemeConstants.MEMES_LOAD_FAILURE:
            return {...state, loading: false, error: true};
        default:
            return state;
    }
};