import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState, getGlobalState} = createGlobalState({
    login: false,
    login1: true
})

export {setGlobalState,useGlobalState, getGlobalState};