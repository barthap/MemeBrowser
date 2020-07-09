import {
    MemeConstants, MEMES_LOAD,
    MEMES_LOAD_FAILURE,
    MEMES_LOAD_SUCCESS,
    ADD_MEMES,
    DELETE_MEME
} from "../constants/memeConstants";

import {Action, ActionCreator} from "redux";
import { MemeEntity } from "../model/entity";


/************************* LOAD ************************************ */
export interface MemesLoadAction extends Action{
    type: MEMES_LOAD;
}

export interface MemesLoadSuccessAction extends Action{
    type: MEMES_LOAD_SUCCESS;
    payload: {
        memes: MemeEntity[]
    }
}
export interface MemesLoadFailureAction extends Action{
    type: MEMES_LOAD_FAILURE;
}

export type MemeAction = MemesLoadAction | MemesLoadSuccessAction | MemesLoadFailureAction;

const load: ActionCreator<MemesLoadAction> = () => ({ type: MemeConstants.MEMES_LOAD });
const loadFailure: ActionCreator<MemesLoadFailureAction> = () => ({ type: MemeConstants.MEMES_LOAD_FAILURE });
const loadSuccess = (memes: MemeEntity[]): MemesLoadSuccessAction => ({
    type: MemeConstants.MEMES_LOAD_SUCCESS,
    payload: {
        memes
    }
});

/************************* ADD ************************************ */

export interface AddMemesAction extends Action {
    type: ADD_MEMES;
    payload: {
        memes: MemeEntity[]
    }
}
export interface AddMemesSuccessAction extends Action {
    type: MEMES_LOAD_SUCCESS;
    payload: { newMemes: MemeEntity[]; };
}
export interface AddMemesFailureAction extends Action {
    type: MEMES_LOAD_FAILURE;
}
const add: ActionCreator<AddMemesAction> = (memes: MemeEntity[]) => ({ type: MemeConstants.ADD_MEMES, payload: {memes} });
const addFailure: ActionCreator<AddMemesFailureAction> = () => ({ type: MemeConstants.ADD_MEMES_FAILURE });
const addSuccess: ActionCreator<AddMemesSuccessAction> = (newMemes: MemeEntity[]) => ({
    type: MemeConstants.ADD_MEMES_SUCCESS,
    payload: { newMemes }
});

//DELETION
export interface DeleteMemeAction extends Action {
    type: DELETE_MEME;
    payload: { assetId: string };
}
const deleteMeme: ActionCreator<DeleteMemeAction>  = (assetId: string) => ({ type: MemeConstants.DELETE_MEME, payload: {assetId}});

export const MemeActions = {
    load, loadFailure, loadSuccess,
    add, addFailure, addSuccess,
    deleteMeme
};