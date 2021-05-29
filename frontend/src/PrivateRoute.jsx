import { Route, Redirect } from "react-router-dom";
import authService from "./services/authService";

export default function PrivateRoute({ component: Component, ...rest }) {
  const authenticatedUser = authService.getAuthenticatedUser();

  return (
    <Route
      {...rest}
      render={(props) => {
          if(authenticatedUser){
              return <Component {...props} />;
          }

          return <Redirect to="/"/>
      }}
    />
  );
}
