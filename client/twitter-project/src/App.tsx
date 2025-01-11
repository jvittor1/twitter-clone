import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
