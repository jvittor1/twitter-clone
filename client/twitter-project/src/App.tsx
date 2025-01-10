import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
      <Outlet />
    </div>
  );
}

export default App;
