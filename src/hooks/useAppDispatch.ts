import { useDispatch } from "react-redux";
import store from "state-management/store";

/**
 * This is Custom hook that has type of Store dispatch so we don't need to define type all the time
 */

type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;
export default useAppDispatch;
