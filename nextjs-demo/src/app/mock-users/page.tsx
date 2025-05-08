import { revalidatePath } from "next/cache";
import { auth , currentUser } from "@clerk/nextjs/server";

type MockUser = {
    id: number;
    name: string;
  };
  
  export default async function MockUsers() {

    const authObj =  await auth()
    const  userObj = await currentUser()
    const res = await fetch("https://681c45436ae7c794cf71303a.mockapi.io/users");
    const users: MockUser[] = await res.json();
  
    async function adduser(formData: FormData) {
      "use server";
      const name = formData.get("name");
      await fetch("https://681c45436ae7c794cf71303a.mockapi.io/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_SECRET_TOKEN_HERE",
        },
        body: JSON.stringify({ name }),
      });
      revalidatePath("/your-page-route");
    }
  
    return (
      <div className="py-10">
        <form action={adduser} className="mb-4">
          <input
            type="text"
            name="name"
            required
            className="border p-2 mr-2"
          />
          <button className="bg-blue-500 p-2 text-white">Add user</button>
        </form>
  
        <div className="grid grid-cols-4 gap-4 py-10">
          {users.map((user: MockUser) => (
            <div
              key={user.id}
              className="bg-white gap-5 flex justify-center items-center text-black"
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
  