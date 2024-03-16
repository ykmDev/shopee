import { Toaster } from "react-hot-toast";
import Routes from "./routes/Routes";

function App() {
  return (
    <div className="font-engFont h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#166534",
              color: "whitesmoke",
            },
          },
          error: {
            style: {
              background: "#991B1B",
              color: "whitesmoke",
            },
          },
        }}
      />

      <Routes />
    </div>
  );
}

export default App;
