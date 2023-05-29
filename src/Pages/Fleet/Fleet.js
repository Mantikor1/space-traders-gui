import { useContext } from "react";
import AuthContext from "../../Components/AuthContext";

export default function Fleet() {
  const { authToken } = useContext(AuthContext);
  console.log(authToken);
  return <h1>Fleet</h1>;
}
