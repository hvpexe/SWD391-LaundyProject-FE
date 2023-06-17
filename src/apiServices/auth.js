import request from "utils/request";
export const loginUser = async (email, password) => {
  try {
    const res = await request.post("Admin/Login", {
      email: "admin@gmail.com",
      password: "admin@",
    });
    
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
