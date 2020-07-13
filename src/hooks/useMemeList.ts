import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { MemeState } from '../reducers/memeReducer';
import typedUseSelector from './typedUseSelector';
import { MemeActions } from '../../actions/memeActions';

export default function useMemeList(
    reload: boolean = true
): [MemeState, () => void, (filterText: string) => void] {
    const state: MemeState = typedUseSelector((s) => s.memes);
    const [items, setItems] = useState(state.memes);

    const dispatch = useDispatch();
    const dispatchReload = () => dispatch(MemeActions.load());
    const setFilter = (filterText: string) => {
        if (filterText.length < 1) setItems(state.memes);
        else
            setItems(
                state.memes.filter((meme) => {
                    const ft = filterText.toLowerCase();
                    if (
                        meme.name != null &&
                        meme.name.toLowerCase().indexOf(ft) >= 0
                    )
                        return true;
                    return (
                        meme.content != null &&
                        meme.content.toLowerCase().indexOf(ft) >= 0
                    );
                })
            );
    };

    useEffect(() => {
        if (reload) {
            dispatchReload();
        }
    }, []);

    return [{ ...state, memes: items }, dispatchReload, setFilter];
}
