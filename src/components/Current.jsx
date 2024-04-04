import axios from "axios";
import { useEffect, useState } from "react";
import { END_POINTS } from "./endPoints";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const TokenCookie = localStorage.getItem("token");

    const getSession = async () => {
      try {
        console.log(document.cookie);
        const response = await axios.get(
          `${END_POINTS.URL()}/api/sessions/current`,
          {
            withCredentials: true,
          }
        );
        console.log("response: ", response.data);
        setUser(response.data.payload.user);
        console.log("user: ", user);
      } catch (error) {
        console.log(error);
      }
    };

    if (TokenCookie) {
      getSession();
    }
  }, []);

  return (
    <>
      {user ? (
        <div>Bienvenido, {user.first_name}!</div>
      ) : (
        <div>Iniciando sesión...</div>
      )}
    </>
  );
}

export default Dashboard;
