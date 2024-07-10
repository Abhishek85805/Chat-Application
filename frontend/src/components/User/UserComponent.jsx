import React from "react";
import {User} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function UserComponent({friend}) {
  return (
    <User   
      name={friend.username}
      description={(
        <Link to="https://twitter.com/jrgarciadev" size="sm" isExternal>
          {friend.email}
        </Link>
      )}
      avatarProps={{
        src: friend.avatar
      }}
    />
  );
}
