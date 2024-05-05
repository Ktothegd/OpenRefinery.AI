import { createContext, useEffect, useState } from "react";
import { authSubscribe } from "@junobuild/core";
import { Login } from "./Login";
import { Logout } from "./Logout";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // TODO: STEP_4_AUTH_SUBSCRIBE
    // const sub = () => undefined;
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? (
        <div>
          {children}
          <p>{console.log(user)}</p>
          <p>{user.key}</p>

          <Logout />
        </div>
      ) : (
        <Login />
      )}
    </AuthContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};
