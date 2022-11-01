import { useDispatch } from "react-redux";
import store from "state-management/store";

type AppDispatch = typeof store.dispatch;
const useAppDispatch: () => AppDispatch = useDispatch;
export default useAppDispatch;
