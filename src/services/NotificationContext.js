// NotificationContext.js

import React, { createContext, useContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [comments, setComments] = useState([]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        comments,
        setComments,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to access the notification context
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
