// AnotherComponent.js

import React from 'react';
import useInitialNotifications from './services/useInitialNotifications';
import { useNotificationContext } from './services/NotificationContext';

function AnotherComponent() {
  const { sendComment } = useInitialNotifications();
  const { comments } = useNotificationContext();
  console.log(comments);
  const list = () => {};
  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.comment.value;
    sendComment(newComment);
    event.target.comment.value = '';
  };
  return (
    <div>
      <h2>comments list</h2>
      <ul>
        {comments &&
          comments?.comments?.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type='text' name='comment' />
        <button type='submit'>Add Comment</button>
      </form>
      <button onClick={list}>list Comment</button>
    </div>
  );
}

export default AnotherComponent;
