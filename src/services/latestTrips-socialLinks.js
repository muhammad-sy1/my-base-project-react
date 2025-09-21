// store.js
import { create } from "zustand";
import axios from "axios";

const useHomeStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchHomeData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        "https://izikiz-back.bayanmasters.com/api/v1/app/home?with_info=1"
      );
      set({ data: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useHomeStore;
