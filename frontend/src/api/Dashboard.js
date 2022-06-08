const getStatistics = (api) => {
  return api.get("/dashboard");
};

export { getStatistics };
