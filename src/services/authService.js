// store.js
import { create } from "zustand";
import axios from "axios";

const useLoginStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  loginUser: async (body) => {
    set({ loading: true, error: null });
    try {
      // const baseurl = process.env.REACT_APP_BASE_URL;

      const response = await axios.post(
        `https://izikiz-back.bayanmasters.com/api/v1/app/auth/login`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.data.data.token;

      const user = response.data.data.user;

      const { first_name, last_name } = user;

      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `username=${first_name} ${last_name}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`;

      set({ data: response.data, loading: false });
      console.log(response);
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useLoginStore;
