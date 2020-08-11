import { all, takeEvery, call, put } from 'redux-saga/effects';
import { MemeConstants } from '../constants/memeConstants';
import MemeRepository from '../model/repository';
import { MemeActions, AddMemesAction, DeleteMemeAction, UpdateMemeAction } from '../../actions/memeActions';

const watchLoadMemes = function* () {
  yield takeEvery(MemeConstants.MEMES_LOAD, function* () {
    try {
      const memes = yield call(MemeRepository.getAll);
      yield put(MemeActions.loadSuccess(memes));
    } catch (e) {
      yield put(MemeActions.loadFailure());
    }
  });
};

const watchAddMemes = function* () {
  yield takeEvery(MemeConstants.ADD_MEMES, function* (action: AddMemesAction) {
    try {
      const addedMemes = yield call(MemeRepository.addNewMemes, action.payload.memes);
      yield put(MemeActions.addSuccess(addedMemes));
    } catch (e) {
      console.warn(e);
      yield put(MemeActions.addFailure());
    }
  });
};

const watchUpdateMemes = function* () {
  yield takeEvery(MemeConstants.UPDATE_MEME, function* (action: UpdateMemeAction) {
    yield call(MemeRepository.updateMeme, action.payload.meme);
  });
};

const watchDeleteMemes = function* () {
  yield takeEvery(MemeConstants.DELETE_MEME, function* (action: DeleteMemeAction) {
    yield call(MemeRepository.removeMeme, action.payload.assetId);
  });
};

export default function* memeSaga() {
  yield all([watchLoadMemes(), watchAddMemes(), watchUpdateMemes(), watchDeleteMemes()]);
}
