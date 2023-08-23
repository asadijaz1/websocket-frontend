import AnotherComponent from "./AnotherComponent";
import MainComponent from "./MainComponent";
import { NotificationProvider } from "./services/NotificationContext";

function App() {
  return (
    <div>
      <NotificationProvider>
        <MainComponent />
        <AnotherComponent />
      </NotificationProvider>
    </div>
  );
}

export default App;
