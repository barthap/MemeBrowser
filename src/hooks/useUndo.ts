import { useDispatch } from 'react-redux';

export default function useUndo(undoActionName = 'UNDO') {
  const dispatch = useDispatch();
  const dispatchUndo = () => dispatch({ type: undoActionName });
  return [dispatchUndo];
}
