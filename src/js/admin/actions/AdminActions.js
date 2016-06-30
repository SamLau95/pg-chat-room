import alt from '../alt';
import Firebase from 'firebase';

import {
  ROOT_URL, STUDIES_URL, permissionDeniedMessage } from '../../constants';

const ROOT_FB = new Firebase(ROOT_URL);
const STUDIES_FB = new Firebase(STUDIES_URL);

class AdminActions {
  constructor() {
    this.generateActions('selectJsonToCsv',
      'setSelectedStudy');
  }

  // This only allows admins to auth through
  listenForAuth() {
    ROOT_FB.onAuth((auth) => {
      ROOT_FB.child('admins').once('value')
        .then(() => this.dispatch(auth))
        .catch((err) => this.actions.setAuthError(err, auth));
    });
  }

  setAuthError(err, auth) {
    this.dispatch(permissionDeniedMessage(err, auth));
  }

  logout() {
    ROOT_FB.unauth();
  }

  listenForStudies() {
    STUDIES_FB.on('value', snapshot => {
      const studies = snapshot.val() || [];
      this.dispatch(studies);
    });
  }

  unlistenForStudies() {
    STUDIES_FB.off();
  }

  setStudies(studies) {
    STUDIES_FB.set(studies);
  }
}

export default alt.createActions(AdminActions);
