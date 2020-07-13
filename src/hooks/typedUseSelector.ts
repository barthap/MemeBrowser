import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../reducers';

// Typescript implementation for Redux useSelector()
const typedUseSelector: TypedUseSelectorHook<RootState> = useSelector;
export default typedUseSelector;