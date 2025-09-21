import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { getCookie } from "@/utils/cookies";

import { Button } from "@/components/ui/button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router";
import { t } from "i18next";
import { useLoginStore } from "@/https/authApi";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().email({
    message: t("contact.form.emailError"),
  }),
  password: z
    .string()
    .min(8, {
      message: t("contact.form.messageMinError"),
    })
    .regex(/[0-9]/, {
      message: t("contact.form.passwordNumberError"),
    }),
});
const Login = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser, loading } = useLoginStore();

  const onSubmit = async (formData) => {
    const body = {
      ...formData,
      fcm_token: "random-token",
    };
    console.log(body);

    try {
      const res = await loginUser(body);
      console.log(res.data);
      toast.success("login successfully.");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("firstName", res.data.user.first_name);
      localStorage.setItem("lastName", res.data.user.last_name);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-5 w-full">
        <div className="text-4xl font-semibold text-my-green">
          Log in to <span className="text-black">IZIKIZ</span>
        </div>
        <div className="text-neutral-600 text-2xl">
          {t("contact.form.title")}
        </div>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="xl:w-3/4 lg:w-4/5 w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t("contact.form.email")}
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        placeholder={t("contact.form.password")}
                        {...field}
                        type={show ? "text" : "password"}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute text-2xl h-10 end-0 bg-transparent text-my-black hover:bg-transparent"
                    >
                      {show ? <IoEyeOff /> : <IoEye />}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="py-5 w-full" disabled={loading} type="submit">
                Log in
                {loading && <div className="loader"></div>}
              </Button>
              {/* {error && <p>{error}</p>} */}
              <div className="flex justify-between items-center">
                <NavLink
                  className="hover:underline underline-offset-1"
                  to="/sign-up"
                >
                  {t("contact.form.create")}
                </NavLink>
                <NavLink
                  className="hover:underline underline-offset-1"
                  to="/checkEmail"
                >
                  {t("contact.form.forgetPassword")}
                </NavLink>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
