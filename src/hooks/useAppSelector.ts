import { TypedUseSelectorHook, useSelector } from "react-redux";
import store from "state-management/store";
/**
 * This is Custom hook that has type of Store state so we don't need to define type all the time
 */
type RootState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
