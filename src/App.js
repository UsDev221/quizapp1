import "./App.css";
import Card from "./components/Card";
import Home from "./components/Home";
import Results from "./components/Results";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/quiz" element={<Card />} />
            <Route exact path="/results" element={<Results />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
