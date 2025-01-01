export async function register(userID: string, password: string) {
  try {
    if (!password || !userID) throw Error("User Info is required!");
    const dto = { password: password };
    const res = await fetch(`/api/user/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw Error("Error registering user");
  } catch (e) {
    alert(e);
  }
}
