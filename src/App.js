import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import PublicOnlyRoute from "./Routes/PublicOnlyRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import Question from "./components/Question/Question";
import Answer from "./components/Answer/Answer";
import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <PublicOnlyRoute exact path="/" component={LandingPage} />
          <PublicOnlyRoute
            exact
            path="/registration"
            component={Registration}
          />
          <PublicOnlyRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/question" component={Question} />
          <PrivateRoute exact path="/answer" component={Answer} />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
