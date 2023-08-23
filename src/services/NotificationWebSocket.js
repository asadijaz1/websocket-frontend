class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    const path = 'ws://localhost:8080'; // Replace with your WebSocket server endpoint
    this.socketRef = new WebSocket(path);

    this.socketRef.onopen = () => {
      console.log('WebSocket open');
    };

    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log('WebSocket closed, reopening...');
      this.connect();
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.type;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    const callback = this.callbacks[command];

    if (typeof callback === 'function') {
      callback(parsedData); // Invoke the callback with parsed data
    }

    // ... handle other notification types
  }

  fetchNotifications() {
    this.sendMessage({ route: '/notification', type: 'get-notification' });
  }

  markNotificationRead(notificationId) {
    this.sendMessage({
      route: '/notification',
      type: 'notification-read',
      postId: 1, // Replace with the actual postId
      notificationId: notificationId,
    });
  }

  sendComment(message) {
    this.sendMessage({
      route: '/comment',
      type: 'new-comment',
      comment: message,
      postId: 1,
    });
  }

  fetchComment() {
    this.sendMessage({ route: '/comment', type: 'get-comments', postId: 1 });
  }

  sendNotification(message) {
    this.sendMessage({
      route: '/notification',
      type: 'new-notification',
      notification: `postId id   `,
      postId: 1,
    });
  }



  addCallbacks(command, callback) {
    this.callbacks[command] = callback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify(data));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();
export default WebSocketInstance;
