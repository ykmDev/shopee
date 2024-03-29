import React from "react";
import "https://code.jquery.com/jquery-3.7.1.min.js"
import "./assets/js/slick.min.js"
// import "./assets/js/common.js"
import { MantineProvider } from "@mantine/core";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
