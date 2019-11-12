import _ from 'lodash'

export function updateUser(state, payload) {
  return {
    ...state,
    users: _.filter(state.users, ['id', payload.id]).push(payload),
  }
}

export function addUser(state, payload) {
  if (!payload.id)
    payload.id = state.nextUserIdCounter;
  return {
    ...state,
    nextUserIdCounter: state.nextUserIdCounter + 1,
    users: state.users.push(payload),
  }
}

export function deleteUser(state, payload) {
  return {
    ...state,
    users: _.filter(state.users, ['id', payload]),
  }
}