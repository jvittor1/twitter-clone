import { logout } from "@/services/login-service";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useUser } from "@/context/user-context";
import { useTweet } from "@/context/tweet-context";
import { useNavigate } from "react-router-dom";

export default function SideBarButtonsComponent() {
  const { setUser } = useUser();
  const { setTweet } = useTweet();
  const navFunction = useNavigate();

  const logoutHandler = () => {
    logout(navFunction, setUser, setTweet);
  };
  return (
    <div className="space-y-8">
      <Button className="w-full rounded-full" variant={"secondary"}>
        Tweet
      </Button>
      <Separator orientation="horizontal" className="bg-zinc-700" />
      <Button
        className="w-full rounded-full border border-zinc-800 hover:bg-zinc-800"
        variant={"default"}
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  );
}
