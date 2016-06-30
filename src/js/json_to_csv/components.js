import _ from 'underscore';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  fetchStudyList, setStudyAndStartFetch, setDisplayOption,
} from './actions';
import { extractUserData, extractMessageData } from './utils';

const USERS = 'USERS';
const MESSAGES = 'MESSAGES';

const NO_DATA_MSG = 'No data available for this study.';

const dataShape = PropTypes.objectOf(PropTypes.shape({
  rooms: PropTypes.objectOf(PropTypes.shape({
    createdAt: PropTypes.number.isRequired,
    messages: PropTypes.objectOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
      userId: PropTypes.oneOfType(
        [PropTypes.string, PropTypes.number]).isRequired,
    })),
  })),
  users: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
}));

const DataDisplay = ({ displayOption, data }) => {
  let csv;
  if (displayOption === USERS) {
    csv = extractUserData(data);
  } else if (displayOption === MESSAGES) {
    csv = extractMessageData(data);
  } else {
    csv = NO_DATA_MSG;
  }

  return <pre>{csv}</pre>;
};

DataDisplay.propTypes = {
  displayOption: PropTypes.string.isRequired,
  data: dataShape.isRequired,
};

class JSONToCSV extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchStudyList());
  }

  render() {
    const { studyList, displayOption, data, dispatch } = this.props;
    let studySelect;

    return (<div>
      <h1>Get Data from Study</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        dispatch(setStudyAndStartFetch(studySelect.value));
      }}>
        <select ref={node => studySelect = node}>
          {_.map(studyList,
            (s) => <option value={s} key={s}>{s}</option>)}
        </select>
        <br />
        <button name="submit">Submit</button>
      </form>

      <br />
      {data && <form>
        <input type="radio" value={USERS}
          id="users"
          checked={displayOption === USERS}
          onChange={(e) => dispatch(setDisplayOption(e.target.value))} />
        <label style={{display: 'inline'}} htmlFor="users">Users</label>
        <input type="radio" value={MESSAGES}
          id="messages"
          checked={displayOption === MESSAGES}
          onChange={(e) => dispatch(setDisplayOption(e.target.value))} />
        <label style={{display: 'inline'}} htmlFor="messages">Messages</label>
      </form>}

      {data && <DataDisplay displayOption={displayOption} data={data} />}
    </div>);
  }
}

JSONToCSV.propTypes = {
  studyList: PropTypes.array.isRequired,
  study: PropTypes.string.isRequired,
  displayOption: PropTypes.string.isRequired,
  data: dataShape,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(JSONToCSV);
