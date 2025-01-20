import { IconType } from "react-icons/lib";
import { SideBarResponsiveComponent } from "./sidebar-component";

interface PageTitleComponentProps {
  title: string;
  icon: IconType;
}
export default function PageTitleComponent({
  title,
  icon: Icon,
}: PageTitleComponentProps) {
  return (
    <div className="flex w-full items-center justify-between px-2">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <Icon className="hidden text-xl text-blue-500 md:block" />
      <div className="md:hidden">
        <SideBarResponsiveComponent />
      </div>
    </div>
  );
}
