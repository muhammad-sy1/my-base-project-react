import { create } from "zustand";
import { endpoints } from "./endpoints";
import { postAPI } from "./helperApi";

// login
export const useLoginStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  loginUser: async (body) => {
    set({ loading: true, error: null });
    try {
      const data = await postAPI(endpoints.logIn, body);
      // {
      //   "email": "user@example.com",
      //   "type": "reset"
      // }
      set({ data: data, loading: false });
      console.log(data);
      return data;
    } catch (err) {
      set({ error: err, loading: false });
      throw err;
    }
  },
}));

// signup

export const useCheckValidationCodeStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  checkValidationCode: async (body) => {
    set({ loading: true, error: null });
    try {
      const data = await postAPI(endpoints.signUp, body);
      // {
      //   "country_code": "1",
      //   "email": "mddlrahman2003@gmail.com",
      //   "phone_number": "1250dd5550199",
      //   "type": "registration"
      // }
      set({ data: data, loading: false });
      console.log(data);
      return data;
    } catch (err) {
      set({ error: err, loading: false });
      throw err;
    }
  },
}));



// send/verification-code

export const useVerificationCodeStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  getVerificationCode: async (body) => {
    set({ loading: true, error: null });
    try {
      const data = await postAPI(endpoints.sendVerifyCode, body);
      // {
      //   "email": "user@example.com",
      //   "type": "reset"
      // }
      set({ data: data, loading: false });
      console.log(data);
      return data;
    } catch (err) {
      set({ error: err, loading: false });
      throw err;
    }
  },
}));

export const useCheckCodeStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  checkValidationCode: async (body) => {
    set({ loading: true, error: null });
    try {
      const data = await postAPI(endpoints.checkCode, body);
      // {
      //   "email": "user@example.com",
      //   "code": "123456"
      // }
      set({ data: data, loading: false });
      console.log(data);
      return data;
    } catch (err) {
      set({ error: err, loading: false });
      throw err;
    }
  },
}));

export const useNewPasswordStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  postNewPassword: async (body) => {
    set({ loading: true, error: null });
    try {
      const data = await postAPI(endpoints.resetPassword, body);
      // {
      //   "email": "user@example.com",
      //   "code": "123456",
      //   "password": "newpassword123",
      //   "password_confirmation": "newpassword123"
      // }
      set({ data: data, loading: false });
      console.log(data);
      return data;
    } catch (err) {
      set({ error: err, loading: false });
      throw err;
    }
  },
}));
