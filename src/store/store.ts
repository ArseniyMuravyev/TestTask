import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from "react-redux";
import testReducer, {
	loadState,
	saveState,
} from "../features/test-slice/slice";

const rootReducer = combineReducers({
	test: testReducer,
});

const persistedState = loadState();

const store = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
});

store.subscribe(() => {
	saveState({
		test: store.getState().test,
	});
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
