export const getCurrentUser = () => {
const user = localStorage.getItem("user");
if (!user) return null;


const parsedUser = JSON.parse(user);

return {
  ...parsedUser,
  rights: Number(parsedUser.rights || 0),
  volunteer: Number(parsedUser.rights || 0)
}};

export const logout = () => {
localStorage.removeItem("user");
window.location.href = "/profile"; 
};
