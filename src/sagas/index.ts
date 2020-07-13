import { all } from 'redux-saga/effects';
import memeSaga from './memeSaga';

export default function* rootSaga() {
    yield all([memeSaga()]);
}
