/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as types from './constants';

const initialState = fromJS({});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.DEFAULT_ACTION:
      return state;

    case types.GET_MATCHES_ACTION_REQUEST:
      return state;
    case types.GET_MATCHES_ACTION_SUCCESS:
      return state.set('userMatchDetails',action.userMatchDetails);
    case types.GET_MATCHES_ACTION_FAILURE:
      return state;
      
    case types.GET_USER_ACTION_REQUEST:
      return state;
    case types.GET_USER_ACTION_SUCCESS:
    return state.set('userDetails',action.userDetails);
    case types.GET_USER_ACTION_FAILURE:
      return state;
    
    case types.GET_FILTER_REQUEST:
      return state;
    case types.GET_FILTER_SUCCESS:
    return state.set('filterDetails',action.filterDetails);
    case types.GET_FILTER_FAILURE:
      return state;
    
    case types.APPLY_FILTER_REQUEST:
      console.log("actions", action);
      return state.set("loading", true);
    case types.APPLY_FILTER_SUCCESS:
      return state.set("loading", false).set("userMatchDetails", action.result);
    case types.APPLY_FILTER_FAILURE:
      return state.set("loading", false);
    default:
      return state;
  }
}

export default appReducer;
