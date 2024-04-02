import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const TokenCookie = localStorage.getItem("token");

    const getSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/sessions/current",
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
