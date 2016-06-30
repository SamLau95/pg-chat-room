const ROOT_URL = 'https://research-chat-room.firebaseio.com';
// const ROOT_URL = `ws://127.0.1:5000`;
const STUDIES_URL = `${ROOT_URL}/studies`;
const CONSTANTS_URL = `${ROOT_URL}/constants`;
const USER_AUTH_URL = `${ROOT_URL}/user_auth`;

const DEFAULT_ROOM_VALUES = {
  usersPerRoom: '3',
  maxWaitingTime: 300000,
  roomOpenTime: 180000,
  password: 'password',
  altPassword: 'altpassword',
  messages: {},
};

const MESSAGE_TYPES = {
  system: 'System',
  confederate: 'Confederate',
};

function permissionDeniedMessage(err, auth) {
  return `${err.toString()} | Send Sam your UID:
    ${auth.uid} if you believe this is an error.`;
}

export default {
  ROOT_URL,
  STUDIES_URL,
  CONSTANTS_URL,
  USER_AUTH_URL,
  DEFAULT_ROOM_VALUES,
  MESSAGE_TYPES,
  permissionDeniedMessage,
};


