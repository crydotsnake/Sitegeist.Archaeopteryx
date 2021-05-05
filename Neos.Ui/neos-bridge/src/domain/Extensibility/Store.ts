import * as React from 'react';
import {useNeos} from './NeosContext';

export interface IState {
    cr?: {
        nodes?: {
            siteNode?: string
            documentNode?: string
        }
    }
}

export interface IStore {
    getState(): IState
    subscribe(listener: () => void): () => void
}

export function useSelector<R>(selector: (state: IState) => R): null | R {
    const neos = useNeos();
    const [result, setResult] = React.useState<null | R>(null);

    React.useEffect(() => {
        if (neos) {
            const state = neos.store.getState();
            const result = selector(state);

            setResult(result);

            return neos.store.subscribe(() => {
                const state = neos.store.getState();
                const result = selector(state);

                setResult(result);
            });
        }
    }, [neos]);

    return result;
}