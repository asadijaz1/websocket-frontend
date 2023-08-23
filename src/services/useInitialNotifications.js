// useInitialNotifications.js

import { useEffect, useContext } from 'react';
import WebSocketInstance from './NotificationWebSocket';
import { NotificationContext } from './NotificationContext';

export default function useInitialNotifications() {
  const { setNotifications, setComments } = useContext(NotificationContext);

  const fetchNotifications = (type, data) => {
    if (type === 'get-notification') {
      // Handle fetched notifications
      setNotifications(data.notifications);
    } else if (type === 'notification-read') {
      setNotifications(data.notifications);
    } else if (type === 'new-notification') {
      setNotifications(data.notifications);
    } else if (type === 'get-comments') {
      setComments(data);
    } else if (type === 'new-comments') {
      setComments(data);
    }
    // ... handle other types of notifications similarly
  };

  const markNotificationRead = (notificationId) => {
    WebSocketInstance.markNotificationRead(notificationId);
  };

  useEffect(() => {
    WebSocketInstance.connect();
    const waitForSocketConnection = (callback) => {
      setTimeout(() => {
        if (WebSocketInstance.state() === 1) {
          console.log('Socket connection is made.');
          callback();
        } else {
          console.log('Waiting for connection with socket notification...');
          waitForSocketConnection(callback);
        }
      }, 100);
    };
    waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks('get-notification', (noti) => {
        fetchNotifications('get-notification', noti);
      });
      WebSocketInstance.addCallbacks('notification-read', (noti) =>
        fetchNotifications('notification-read', noti)
      );
      WebSocketInstance.addCallbacks('new-notification', (noti) =>
        fetchNotifications('new-notification', noti)
      );
      WebSocketInstance.addCallbacks('get-comments', (noti) => {
        fetchNotifications('get-comments', noti);
      });
      WebSocketInstance.addCallbacks('new-comments', (noti) =>
        fetchNotifications('new-comments', noti)
      );
      WebSocketInstance.fetchNotifications('get-notification');
      WebSocketInstance.fetchComment('get-comments');
    });
  }, [setNotifications]);

  return {
    fetchNotifications,
    sendNotification: (message) => WebSocketInstance.sendNotification(message),
    sendComment: (message) => WebSocketInstance.sendComment(message),

    markNotificationRead,
  };
}
