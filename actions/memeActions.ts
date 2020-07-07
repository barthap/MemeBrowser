import {
    MemeConstants, MEMES_LOAD,
    MEMES_LOAD_FAILURE,
    MEMES_LOAD_SUCCESS
} from "../constants/memeConstants";

import {Action, ActionCreator} from "redux";
import { MemeEntity } from "../model/entity";

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

export const MemeActions = {
    load, loadFailure, loadSuccess
};