export async function register(userID: string, password: string) {
  try {
    if (!password || !userID) throw Error("User Info is required!");
    const dto = { password: password };
    const res = await fetch(`/api/users/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) throw Error("Error registering user");
    window.location.href = "/";
  } catch (e) {
    alert(e);
  }
}
