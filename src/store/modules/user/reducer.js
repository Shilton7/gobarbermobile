import produce from 'immer';

//global
const INITIAL_STATE = {
  profileUser: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profileUser = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profileUser = action.payload.profileUser;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profileUser = null;
        break;
      }
      default:
    }
  });
}
