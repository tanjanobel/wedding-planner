const getTasks = (api) => {
  return api.get("/tasks");
};

const getTaskById = (api, id) => {
  return api.get(`/tasks/${id}`);
};

const saveTask = (api, task) => {
  return api.post("/tasks", task);
};

const updateTask = (api, id, task) => {
  return api.patch(`/tasks/${id}`, task);
};

const deleteTask = (api, id) => {
  return api.delete(`/tasks/${id}`);
};

export { getTasks, getTaskById, saveTask, updateTask, deleteTask };
