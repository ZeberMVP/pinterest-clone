import { FC } from "react";
import Image from "next/image";
import { User } from "@prisma/client";

interface UserTagProps {
  user: User;
}

const UserTag: FC<UserTagProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={user.image!}
        alt="userImage"
        width={30}
        height={30}
        className="rounded-full"
      />
      <div>
        <h2 className="text-sm">{user.name}</h2>
      </div>
    </div>
  );
};

export default UserTag;
