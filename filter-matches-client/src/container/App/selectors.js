import { createSelector } from 'reselect';

const selectUserDomain = () => (state) => state.get("userDetails");
const selectUserMatch = () => (state) => state.get("userMatchDetails");

const makeSelectUser = () => createSelector(
    selectUserDomain(),
    (subState) => subState()
);

export default makeSelectUser;

export {
 selectUserDomain,
 makeSelectUser,
 selectUserMatch
};