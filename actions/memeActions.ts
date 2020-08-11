import { Action, ActionCreator } from 'redux';
import {
  MemeConstants,
  MEMES_LOAD,
  MEMES_LOAD_FAILURE,
  MEMES_LOAD_SUCCESS,
  ADD_MEMES,
  DELETE_MEME,
  UPDATE_MEME,
} from '../src/constants/memeConstants';

import { MemeEntity } from '../src/model/entity';

/** *********************** LOAD ************************************ */
export interface MemesLoadAction extends Action {
  type: MEMES_LOAD;
}

export interface MemesLoadSuccessAction extends Action {
  type: MEMES_LOAD_SUCCESS;
  payload: {
    memes: MemeEntity[];
  };
}
export interface MemesLoadFailureAction extends Action {
  type: MEMES_LOAD_FAILURE;
}

export type MemeAction = MemesLoadAction | MemesLoadSuccessAction | MemesLoadFailureAction;

const load: ActionCreator<MemesLoadAction> = () => ({
  type: MemeConstants.MEMES_LOAD,
});
const loadFailure: ActionCreator<MemesLoadFailureAction> = () => ({
  type: MemeConstants.MEMES_LOAD_FAILURE,
});
const loadSuccess = (memes: MemeEntity[]): MemesLoadSuccessAction => ({
  type: MemeConstants.MEMES_LOAD_SUCCESS,
  payload: {
    memes,
  },
});

/** *********************** ADD ************************************ */

export interface AddMemesAction extends Action {
  type: ADD_MEMES;
  payload: {
    memes: MemeEntity[];
  };
}
export interface AddMemesSuccessAction extends Action {
  type: MEMES_LOAD_SUCCESS;
  payload: { newMemes: MemeEntity[] };
}
export interface AddMemesFailureAction extends Action {
  type: MEMES_LOAD_FAILURE;
}
const addMemes: ActionCreator<AddMemesAction> = (memes: MemeEntity[]) => ({
  type: MemeConstants.ADD_MEMES,
  payload: { memes },
});
const addMemesFailure: ActionCreator<AddMemesFailureAction> = () => ({
  type: MemeConstants.ADD_MEMES_FAILURE,
});
const addMemesSuccess: ActionCreator<AddMemesSuccessAction> = (newMemes: MemeEntity[]) => ({
  type: MemeConstants.ADD_MEMES_SUCCESS,
  payload: { newMemes },
});

// UPDATE
export interface UpdateMemeAction extends Action {
  type: UPDATE_MEME;
  payload: { meme: MemeEntity };
}
const updateMeme: ActionCreator<UpdateMemeAction> = (updated: MemeEntity) => ({
  type: MemeConstants.UPDATE_MEME,
  payload: { meme: updated },
});

// DELETION
export interface DeleteMemeAction extends Action {
  type: DELETE_MEME;
  payload: { assetId: string };
}
const deleteMeme: ActionCreator<DeleteMemeAction> = (assetId: string) => ({
  type: MemeConstants.DELETE_MEME,
  payload: { assetId },
});

export const MemeActions = {
  load,
  loadFailure,
  loadSuccess,
  add: addMemes,
  addFailure: addMemesFailure,
  addSuccess: addMemesSuccess,
  updateMeme,
  deleteMeme,
};
