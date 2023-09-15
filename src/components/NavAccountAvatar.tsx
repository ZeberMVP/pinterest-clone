import { getAuthSession } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { User } from "lucide-react";

const NavAccountAvatar = async () => {
  const session = await getAuthSession();

  return (
    <Avatar className={session ? "h-7 w-7" : "hidden"}>
      <AvatarImage src={session?.user?.image!} alt="zebermvp" />
      <AvatarFallback>
        <span className="sr-only">{session?.user?.name}</span>
        <User className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
};

export default NavAccountAvatar;
