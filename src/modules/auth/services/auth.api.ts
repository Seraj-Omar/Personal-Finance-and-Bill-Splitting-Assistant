export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser(data: RegisterPayload) {
  console.log("REGISTER PAYLOAD:", data);
  return Promise.resolve();
}

export async function loginUser(data: LoginPayload) {
  console.log("LOGIN PAYLOAD:", data);
  return Promise.resolve();
}


export async function logoutUser() {
  throw new Error("Logout API not implemented yet");
}
