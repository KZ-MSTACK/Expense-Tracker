const BASE_URL = 'http://localhost:5000/api'; // change to your production URL when deploying

export const API = {
  // Auth
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  GET_USER_INFO: `${BASE_URL}/auth/getUser`,

  // Income
  ADD_INCOME: `${BASE_URL}/income/add-income`,
  GET_INCOMES: `${BASE_URL}/income/get-incomes`,
  DELETE_INCOME: (id) => `${BASE_URL}/income/delete-income/${id}`,
  DOWNLOAD_INCOME_EXCEL: `${BASE_URL}/income/downloadexcel`,

  // Expense
  ADD_EXPENSE: `${BASE_URL}/expense/add-expense`,
  GET_EXPENSES: `${BASE_URL}/expense/get-expenses`,
  DELETE_EXPENSE: (id) => `${BASE_URL}/expense/delete-expense/${id}`,
  DOWNLOAD_EXPENSE_EXCEL: `${BASE_URL}/expense/downloadexcel`,

  // Dashboard
  DASHBOARD_SUMMARY: `${BASE_URL}/dashboard`,
};
