import { all, takeEvery, call, put } from "redux-saga/effects";
import { MemeConstants } from "../constants/memeConstants";
import { MemeRepository } from "../model/repository";
import { MemeActions } from "../actions/memeActions";


const watchLoadMemes = function*() {
    yield takeEvery(MemeConstants.MEMES_LOAD, function*() {
        try {
            const memes = yield call(MemeRepository.getAll);
            yield put(MemeActions.loadSuccess(memes));
        } catch(e) {
            yield put(MemeActions.loadFailure());
        }        
    });
}

export function* memeSaga() {
    yield all([
        watchLoadMemes()
    ]);
}