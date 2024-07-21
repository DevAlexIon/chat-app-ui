import debounce from "lodash/debounce";
import { AppDispatch } from "../store";
import { searchFriends } from "../store/slices/userSlice";

export const createDebouncedSearch = (dispatch: AppDispatch) =>
  debounce((query: string) => {
    dispatch(searchFriends(query));
  }, 300);
