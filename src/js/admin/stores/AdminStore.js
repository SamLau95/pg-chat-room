import alt from '../alt';
import Firebase from 'firebase';

import AdminActions from '../actions/AdminActions';
import { ROOT_URL, CONSTANTS_URL } from '../../constants';

const ROOT_FB = new Firebase(ROOT_URL);
console.log(ROOT_FB);

class AdminStore {
  constructor() {
    this.bindActions(AdminActions);

    this.auth = null;
    this.selectedStudy = null;
    this.studies = null;
    this.fb = ROOT_FB;
    this.constantsFb = null;
  }

  listenForStudies(studies) {
    this.studies = studies;
  }

  setAuth(auth) {
    this.auth = auth;
  }

  setSelectedStudy(study) {
    this.selectedStudy = study;
    this.constantsFb = new Firebase(`${CONSTANTS_URL}/${study}`);
  }

  static get(attr) {
    return this.getState()[attr];
  }
}

export default alt.createStore(AdminStore, 'AdminStore');
