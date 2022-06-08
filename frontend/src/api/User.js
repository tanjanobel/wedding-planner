const getUser = (api) => {
  return api.get("/user");
};

const updateUser = (api, data) => {
  return api.patch("/user", data);
};

export { getUser, updateUser };
