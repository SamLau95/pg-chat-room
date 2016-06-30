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

const DataDisplay = ({ onSelectOption, displayOption, data }) => {
  let csv;
  if (displayOption === USERS) {
    csv = extractUserData(data);
  } else if (displayOption === MESSAGES) {
    csv = extractMessageData(data);
  } else {
    csv = NO_DATA_MSG;
  }

  return (<div>
    <form>
      <input type="radio" value={USERS}
        id="users"
        checked={displayOption === USERS}
        onChange={onSelectOption} />
      <label style={{display: 'inline'}} htmlFor="users">Users</label>
      <input type="radio" value={MESSAGES}
        id="messages"
        checked={displayOption === MESSAGES}
        onChange={onSelectOption} />
      <label style={{display: 'inline'}} htmlFor="messages">Messages</label>
    </form>

    <pre>{csv}</pre>;
  </div>);
};

DataDisplay.propTypes = {
  onSelectOption: PropTypes.func.isRequired,

  displayOption: PropTypes.string.isRequired,
  data: dataShape.isRequired,
};

class JSONToCSV extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { studyList, displayOption, error, data,
      onSelectOption } = this.props;
    let selectedOption;

    return (<div>
      <h1>Get Data from Study</h1>

      <form onSubmit={(e) => this.props.onSelectStudy(e, selectedOption)}>
        <select ref={node => selectedOption = node}>
          {_.map(studyList,
            (s) => <option value={s} key={s}>{s}</option>)}
        </select>
        <br />
        <button name="submit">Submit</button>
      </form>

      <br />

      {error}

      {data && <DataDisplay
        onSelectOption={onSelectOption}
        displayOption={displayOption}
        data={data}
      />}
    </div>);
  }
}

JSONToCSV.propTypes = {
  // Data
  studyList: PropTypes.array.isRequired,
  study: PropTypes.string.isRequired,
  displayOption: PropTypes.string.isRequired,
  error: PropTypes.string,
  data: dataShape,

  // Callbacks
  onMount: PropTypes.func.isRequired,
  onSelectStudy: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  onMount: () => dispatch(fetchStudyList()),
  onSelectStudy: (e, selectedOption) => {
    e.preventDefault();
    dispatch(setStudyAndStartFetch(selectedOption.value));
  },
  onSelectOption: (e) => dispatch(setDisplayOption(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JSONToCSV);
