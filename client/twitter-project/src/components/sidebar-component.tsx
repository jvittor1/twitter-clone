import { useState } from "react";
import { IconType } from "react-icons/lib";
import { MdHome } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

interface SideBarItemProps {
  icon: IconType;
  text: string;
  selected?: boolean;
  onClick: () => void;
}

function SideBarItem({
  icon: Icon,
  text,
  selected,
  onClick,
}: SideBarItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full cursor-pointer items-center space-x-4"
    >
      <Icon
        className={`text-xl ${selected ? "text-blue-500" : "text-zinc-500"}`}
      />
      <span
        className={`text-md font-bold ${selected ? "text-blue-500" : "text-zinc-400"} `}
      >
        {text}
      </span>
    </div>
  );
}

export function SideBarComponent() {
  const [isSelected, setIsSelected] = useState("home");

  return (
    <div className="flex flex-col space-y-6">
      <SideBarItem
        onClick={() => setIsSelected("home")}
        selected={"home" == isSelected}
        icon={MdHome}
        text="Home"
      />
      <SideBarItem
        onClick={() => setIsSelected("explore")}
        selected={"explore" == isSelected}
        icon={FaHashtag}
        text="Explore"
      />
      <SideBarItem
        onClick={() => setIsSelected("notifications")}
        selected={"notifications" == isSelected}
        icon={FaBell}
        text="Notifications"
      />
      <SideBarItem
        onClick={() => setIsSelected("messages")}
        selected={"messages" == isSelected}
        icon={MdEmail}
        text="Messages"
      />
      <SideBarItem
        onClick={() => setIsSelected("bookmarks")}
        selected={"bookmarks" == isSelected}
        icon={FaBookmark}
        text="Bookmarks"
      />
      <SideBarItem
        onClick={() => setIsSelected("lists")}
        selected={"lists" == isSelected}
        icon={CiViewList}
        text="Lists"
      />
      <SideBarItem
        onClick={() => setIsSelected("profile")}
        selected={"profile" == isSelected}
        icon={FaUserCircle}
        text="Profile"
      />
      <SideBarItem
        onClick={() => setIsSelected("more")}
        selected={"more" == isSelected}
        icon={CiCircleMore}
        text="More"
      />
    </div>
  );
}
