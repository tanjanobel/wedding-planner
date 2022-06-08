const getGuests = (api) => {
  return api.get("/guests");
};

const getGuestById = (api, id) => {
  return api.get(`/guests/${id}`);
};

const saveGuest = (api, guest) => {
  return api.post("/guests", guest);
};

const updateGuest = (api, id, guest) => {
  return api.patch(`/guests/${id}`, guest);
};

const deleteGuest = (api, id) => {
  return api.delete(`/guests/${id}`);
};

export { getGuests, getGuestById, saveGuest, updateGuest, deleteGuest };
