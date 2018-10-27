import { takeEvery, put, call, fork, take, cancel } from 'redux-saga/effects';
import * as types from './constants';
import * as Api from '../../services/api';

function* getUserDetailsCall() {
  // yield put({type: globals.ADD_LOADER});
  // // See example in containers/HomePage/sagas.js
  try {
    const userDetails = yield call(Api.userDetailsApi);
    yield put({ type: types.GET_USER_ACTION_SUCCESS, userDetails });
    // yield put({type: globals.REMOVE_LOADER});
  } catch (error) {
    yield put({ type: types.GET_USER_ACTION_FAILURE, error });
    // yield put({type: globals.REMOVE_LOADER});
  }
}

function* getUserMatchDetailsCall({userId}) {
  // yield put({type: globals.ADD_LOADER});
  // // See example in containers/HomePage/sagas.js
  try {
    console.log("saga user:", userId);
    const userMatchDetails = yield call(Api.userMatchDetailsApi, userId);
    yield put({ type: types.GET_MATCHES_ACTION_SUCCESS, userMatchDetails });
    // yield put({type: globals.REMOVE_LOADER});
  } catch (error) {
    yield put({ type: types.GET_USER_ACTION_FAILURE, error });
    // yield put({type: globals.REMOVE_LOADER});
  }
}


function* getUserFilterDetailsCall(jsonObject) {
  // yield put({type: globals.ADD_LOADER});
  // // See example in containers/HomePage/sagas.js
  try {
    const userFilterDetails = yield call(Api.userFilterDetailsApi, jsonObject);
    yield put({ type: types.GET_FILTER_SUCCESS, userFilterDetails });
    // yield put({type: globals.REMOVE_LOADER});
  } catch (error) {
    yield put({ type: types.GET_FILTER_FAILURE, error });
    // yield put({type: globals.REMOVE_LOADER});
  }
}

function* applyFilter({userId, data}){
  try{
    console.log("saga", data);
    const result = yield call(Api.applyFilter, userId, data);
    yield put({type: types.APPLY_FILTER_SUCCESS, result});
  } catch(error){
    yield put({type: types.APPLY_FILTER_FAILURE, error});
  }
}

function* watchUserMatchDetailsRequest() {
  yield takeEvery(types.GET_MATCHES_ACTION_REQUEST, getUserMatchDetailsCall);
}
function* watchUserDetailsRequest() {
  console.log("Anythong")

  yield takeEvery(types.GET_USER_ACTION_REQUEST, getUserDetailsCall);
}
function* watchUserFilterDetailsRequest() {
  yield takeEvery(types.GET_FILTER_REQUEST, getUserFilterDetailsCall);
}
function* watchApplyFilter() {
  yield takeEvery(types.APPLY_FILTER_REQUEST, applyFilter);
}

export function *appSaga() {
  const watcherUserDetailsRequest = yield fork(watchUserDetailsRequest);
  const watcherUserMatchDetailsRequest = yield fork(watchUserMatchDetailsRequest);
  const watcherUserFilterDetailsRequest = yield fork(watchUserFilterDetailsRequest);
  yield fork(watchApplyFilter);
  // yield cancel(watcherUserDetailsRequest);
  // yield cancel(watcherUserMatchDetailsRequest);
  // yield cancel(watcherUserFilterDetailsRequest);

}
