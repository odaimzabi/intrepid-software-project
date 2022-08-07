import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./modules/first-page/FirstPage";
import AppBar from "./modules/first-page/components/AppBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./themes";
import { Provider } from "react-redux";
import store from "./redux";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />

          <Router>
            <Routes>
              <Route path="/" element={<FirstPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
