import { RootStateType } from "./Store";
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";

export const useTypeSelector: TypedUseSelectorHook<RootStateType> = useReduxSelector;
