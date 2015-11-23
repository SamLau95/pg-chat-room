import alt from '../alt';

import { getAttributeFromUrlParams } from '../util';

const STUDY_REGEX = /study=(\w+)/;

class StudyActions {
  constructor() {
    this.generateActions('updateConfig');
  }

  initStudy() {
    const study = getAttributeFromUrlParams(STUDY_REGEX);
    if (!study) { throw new Error('Missing study in url!'); }

    this.dispatch(study);
  }

  loadConfig(configFb) {
    this.dispatch();
    return new Promise((resolve, reject) => {
      configFb.once('value', snapshot => {
        const config = snapshot.val();
        if (!config) { reject(new Error('Study not recognized.')); }

        this.actions.updateConfig(config);
        resolve(config);
      });
    });
  }
}

export default alt.createActions(StudyActions);
