import axios from "axios";

const API_URL = "http://localhost:3001/api/recipes"; 

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

export const fetchRecipes = async () => {
  const res = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const createRecipe = async (data) => {
  const res = await axios.post(API_URL, data, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const updateRecipe = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const deleteRecipe = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

