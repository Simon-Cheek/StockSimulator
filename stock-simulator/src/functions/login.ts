import { fetchUser, UserInterface } from "./authenticate";

export async function login(userID: string, password: string) {
  try {
    const user: UserInterface | null = await fetchUser(userID);
    const userData: string = user?.userData || "";
    const parsedData = await JSON.parse(user?.userData || "");
    if (parsedData?.password == password) {
      return { userID: userID, userData: userData };
    }
    return null;
  } catch (e) {
    console.error("Error authenticating user: ", e);
    return null;
  }
}
