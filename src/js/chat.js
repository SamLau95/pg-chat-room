import '../styles/chat.scss';

import 'babel-polyfill';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import ChatApp from './chat/components/ChatApp';

// Don't swallow errors in promises
process.on('unhandledRejection', (error, promise) => {
  console.error('[UNHANDLED REJECTION] ', error.stack);
});

$(() => {
  ReactDOM.render(
    <ChatApp />,
    document.getElementById('chat-app')
  );
});
