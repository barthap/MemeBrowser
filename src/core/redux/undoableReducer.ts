import { Reducer, AnyAction } from '@reduxjs/toolkit';

type UndoableReducer = <S, A extends AnyAction>(
  reducer: Reducer<S, any>,
  undoActionName?: string,
) => Reducer<{ past: S[]; present: S }, A>;

const undoable: UndoableReducer = (reducer, undoActionName = 'UNDO') => {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
  };

  return function (state = initialState, action) {
    const { past, present } = state;

    switch (action.type) {
      case undoActionName:
        if (past.length < 1) {
          return state;
        }
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
        };
      default:
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
        };
    }
  };
};

export default undoable;
