import { Outlet } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <h1>This is the Navbar</h1>
      <Outlet />
    </>
  );
}
