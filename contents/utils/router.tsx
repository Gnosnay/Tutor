import React, { createContext, useContext, useReducer } from "react";
import { type ReactElement } from "react";

const PagesDispatchContext = createContext(null);

function pagesReducer(state, action) {
    switch (action.type) {
        case 'nextPage':
            return [...state, action.page];
        case 'prevPage':
            state.pop()
            return [...state];
        default:
            throw new Error();
    }
}

export interface Router {
    nextPage: (page: ReactElement) => void,
    prevPage: () => void,
}

export const useRouter = (): Router => {
    const dispatch = useContext(PagesDispatchContext);
    return {
        'nextPage': (page) => {
            dispatch({ type: 'nextPage', page: page });
        },
        'prevPage': () => {
            dispatch({ type: 'prevPage' });
        }
    }
}

export function useRouterDispatch() {
    return useContext(PagesDispatchContext);
}

export function RouterContainer({ children }) {
    const [pages, dispatch] = useReducer(pagesReducer, []);

    return (
        <PagesDispatchContext.Provider value={dispatch}>
            {pages.length == 0 ? children : pages[pages.length - 1]}
        </PagesDispatchContext.Provider>
    );
}