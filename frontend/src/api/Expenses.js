const getExpenses = (api) => {
  return api.get("/budget");
};

const getExpenseById = (api, id) => {
  return api.get(`/budget/${id}`);
};

const saveExpense = (api, expense) => {
  return api.post("/budget", expense);
};

const updateExpense = (api, id, expense) => {
  return api.patch(`/budget/${id}`, expense);
};

const deleteExpense = (api, id) => {
  return api.delete(`/budget/${id}`);
};

export { getExpenses, getExpenseById, saveExpense, updateExpense, deleteExpense };
