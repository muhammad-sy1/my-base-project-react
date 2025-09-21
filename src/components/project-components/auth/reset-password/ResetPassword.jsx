import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useNewPasswordStore } from "@/https/authApi";
import { useEmailStore } from "@/stores/useEmailStore";

const FormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const ResetPassword = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const navigate = useNavigate();
  const { signUpEmail } = useEmailStore();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { postNewPassword, loading } = useNewPasswordStore();

  const onSubmit = async (values) => {
    // const code = localStorage.getItem("resentCode");
    // const email = localStorage.getItem("resetEmail");
    const body = {
      email: signUpEmail,
      code: localStorage.resetCode,
      password: values.password,
      password_confirmation: values.confirmPassword,
    };

    try {
      const res = await postNewPassword(body);
      console.log(res);
      //   console.log(reqData);

      navigate("/log-in");
      toast.success("Password reset successfully.");
    } catch (error) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="text-4xl font-semibold text-my-green">
        Enter New Password
      </div>
      {/* <div className="text-neutral-600 text-xl">
        Enter your email and we'll send you verification code to reset your
        password.
      </div> */}
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      required
                      type={passwordShow ? "text" : "password"}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute text-2xl h-10 end-0 bg-transparent text-my-black hover:bg-transparent"
                  >
                    {passwordShow ? <IoEyeOff /> : <IoEye />}
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      required
                      type={confirmPasswordShow ? "text" : "password"}
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                    className="absolute text-2xl h-10 end-0 bg-transparent text-my-black hover:bg-transparent"
                  >
                    {confirmPasswordShow ? <IoEyeOff /> : <IoEye />}
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              Submit
              {loading && <div className="loader"></div>}
            </Button>
            {/* {reqError && (
              <div className="text-red-600">{reqError.data.message}</div>
            )} */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
