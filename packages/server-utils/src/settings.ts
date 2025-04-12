
export const modifyPasswordAction = async (id:string,password:string) => {
    const response = await fetch("/api/settings/modifyPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });
    if(response.status !== 200){
      const {error} = await response.json();
      return {error: error || "Failed in modifying Name"};
    }
    const {user} = await response.json();
    return {success: "Successfully modified Password", data:user};
    
}

export const modifyAvatarAction = async (file:any) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const response = await fetch("/api/settings/modifyAvatar", {
      method: "POST",
      body: formData,
    });
    if(response.status !== 200){
        const {error} = await response.json();
        return {error: error || "Failed in modifying Name"};
    }
    const {user} = await response.json();
    return {success: "Successfully modified Avatar", data:user};
    

}

export const deleteAccountAction = async (id:string) => {

    const response = await fetch("/api/settings/deleteAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    if(response.status !== 200){
        return {error: "Failed in deleting Account"};
    }
    return {success: "Successfully deleted Account"};
}

export const getSessionsAction = async (userId:string) => {
  const sessionsResponse = await fetch("/api/settings/getSessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  const { sessions } = await sessionsResponse.json();
  return sessions;
}
