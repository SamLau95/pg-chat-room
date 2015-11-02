import React from 'react';

const USER_ID_FIELD = 'user_id=${e://Field/CHATROOM%20ID}';

const nameToUrl = (roomName) => {
  return `https://samlau95.github.io/pg-chat-room?` +
    `room=${roomName}&${USER_ID_FIELD}`;
};

export default class UrlGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', url: '' };
  }

  _handleChange(e) {
    this.setState({ name: e.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({ url: nameToUrl(this.state.name) });
  }

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <h3>Generate a chatroom URL for a given room.</h3>

          <input type="text"
            value={this.state.name}
            onChange={this._handleChange.bind(this)}
            placeholder="Room name" />

          <button name="submit">Generate</button>
        </form>

        <div>{this.state.url}</div>
      </div>
    );
  }
}
