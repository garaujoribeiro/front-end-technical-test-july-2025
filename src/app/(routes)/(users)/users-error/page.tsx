import { getAllUsers } from "@/services/user/user-service";
import { UsersDataTable } from "../users-table";

export default async function Usuarios() {
  return (
    <section>
      <UsersDataTable initialData={[]} />
    </section>
  );
}
