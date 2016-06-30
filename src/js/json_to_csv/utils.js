/**
 * Utils for JsonToCsv
 */
import _ from 'underscore';
import BabyParse from 'babyparse';

// Extracts Room,Room ID,User ID from data
export function extractUserData(data) {
  const USER_CSV_FIELDS = ['Room', 'Room ID', 'User ID'];
  const csvData = [];

  _.mapObject(data, (roomTypeData, roomType) => {
    _.mapObject(roomTypeData.rooms, (roomData, room) => {
      _.mapObject(roomData.users, (userVal, user) => {
        csvData.push([roomType, room, user]);
      });
    });
  });

  return BabyParse.unparse({ fields: USER_CSV_FIELDS, data: csvData });
}

// Extracts Room ID,User ID,Message from data
export function extractMessageData(data) {
  const MESSAGES_CSV_FIELDS = ['Room ID', 'User ID', 'Message'];
  const csvData = [];

  _.mapObject(data, (roomTypeData, roomType) => {
    _.mapObject(roomTypeData.rooms, (roomData, room) => {
      _.each(roomData.messages, ({ message, userId }) => {
        csvData.push([room, userId, message]);
      });
    });
  });

  return BabyParse.unparse({ fields: MESSAGES_CSV_FIELDS, data: csvData });
}
