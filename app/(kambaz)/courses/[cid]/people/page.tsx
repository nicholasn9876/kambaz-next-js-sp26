"use client";
import { redirect } from "next/navigation";
import * as client from "../../client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import PeopleTable from "./table/page";
export default function People() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams();
  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid as string);
    setUsers(users);
  };
  useEffect(() => {
      fetchUsers();
    }, [cid]);
  return (
    <PeopleTable users={users} fetchUsers={fetchUsers} />
  )
}