// MainComponent.js

import React from 'react';
import useInitialNotifications from './services/useInitialNotifications';
import { useNotificationContext } from './services/NotificationContext';

function MainComponent() {
  const { notifications, sendNotification, markNotificationRead } =
    useInitialNotifications();
  const { notifications: contextNotifications } = useNotificationContext();
console.log(contextNotifications)
  const handleMarkRead = (notificationId) => {
    markNotificationRead(notificationId);
  };

  return (
    <div>
      <button onClick={sendNotification}>Send Notification</button>
      <h1>Main Component</h1>
      {contextNotifications[1]?.length > 0 ? (
        <ul>
          {contextNotifications[1].map((notification, index) => (
            <li key={index}>
              {notification.text}{' '}
              {!notification.read && (
                <button onClick={() => handleMarkRead(notification.id)}>
                  Mark Read
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
}

export default MainComponent;
