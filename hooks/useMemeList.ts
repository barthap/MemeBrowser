import { MemeState } from "../reducers/memeReducer";
import { useDispatch } from "react-redux";
import { typedUseSelector } from "./typedUseSelector";
import { useEffect } from "react";
import { MemeActions } from "../actions/memeActions";


export function useMemeList(reload: boolean = true): [MemeState, () => void] {
    const state: MemeState = typedUseSelector(s => s.memes);
    const dispatch = useDispatch();
    const dispatchReload = () => dispatch(MemeActions.load());

    useEffect(() => {
        if(reload) {
            dispatchReload();
        }

    }, []);

    return [state, dispatchReload];
}