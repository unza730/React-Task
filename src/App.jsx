import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";

// import { hot } from 'react-hot-loader/root'
function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Main />
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default (App);
