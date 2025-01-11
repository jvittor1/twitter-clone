import { useUser } from "@/context/user-context";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xl font-semibold text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full px-12 py-8 text-xl font-semibold text-white">
      nome: {user.username}
      email: {user.email}
    </div>
  );
}
