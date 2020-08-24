import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../core/redux';

// Typescript implementation for Redux useSelector()
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useTypedSelector;
