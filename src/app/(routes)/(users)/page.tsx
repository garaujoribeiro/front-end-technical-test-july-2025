import { getAllUsers } from "@/services/user/user-service";
import { UsersDataTable } from "./users-table";

async function getUsersFromRSC() {
  try {
    const response = await getAllUsers();
    return response.data; // Assuming the API returns an array of users
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export default async function Usuarios() {
  const users = await getUsersFromRSC();

  return (
    <section>
      <UsersDataTable initialData={users} />
    </section>
  );
}
