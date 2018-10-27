/*
 *
 * App actions
 *
 */

import * as types from './constants';

export function defaultAction() {
  return {
    type: types.DEFAULT_ACTION,
  };
}

export function getUser() {
  return {
    type: types.GET_USER_ACTION_REQUEST,
  };
}

export function getMatches(userId) {
  console.log("userID:", userId);
  return {
    type: types.GET_MATCHES_ACTION_REQUEST,
    userId
  };
}

export function applyFilter(userId, data) {
  console.log("hello", data);
  return {
    type: types.APPLY_FILTER_REQUEST,
    userId,
    data,
  };
}