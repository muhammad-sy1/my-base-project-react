import React, { useEffect } from "react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Input } from "@/components/ui/input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useCheckValidationCodeStore } from "@/https/authApi";
import { toast } from "sonner";
import { useVerificationCodeStore } from "@/https/authApi";
import { useEmailStore } from "@/stores/useEmailStore";

const FormSchema = z
  .object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
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

const ValidationCode = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const { signUpEmail } = useEmailStore();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [counter, setCounter] = useState();
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(timer);
  }, [counter]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { checkValidationCode, loading, error } = useCheckValidationCodeStore();

  // check code
  const onSubmit = async (values) => {
    const body = {
      code: values.pin,
      password: values.password,
      confirmPassword: values.confirmPassword,
      first_name: userData.first_name,
      last_name: userData.last_name,
      country_code: "1",
      email: userData.email,
      phone_number: userData.phone_number,
      birth_date: userData.birth_date,
      gender: userData.gender,
      type: "registration",
    };

    try {
      const res = await checkValidationCode(body);

      localStorage.setItem("status", res.data.status);
      localStorage.setItem("otpTimer", res.data.can_resend_after);

      navigate("/log-in");
      toast.success("Create account successfully.");
    } catch (error) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  // resend code
  const { getVerificationCode, reqData, reqLoading } =
    useVerificationCodeStore();

  const handleResend = async () => {
    const body = {
      country_code: "1",
      email: userData.email,
      phone_number: userData.phone_number,
      type: "registration",
    };

    try {
      const res = await getVerificationCode(body);

      localStorage.setItem("status", res.data.status);
      localStorage.setItem("otpTimer", res.data.can_resend_after);
      setCounter(Number(res.data.can_resend_after));

      console.log(reqData);
      console.log(res.data.status + res.data.can_resend_after);
    } catch (error) {
      console.log(error.data);
    }

    const second = localStorage.getItem("otpTimer");
    console.log(second);
    console.log(error?.response?.data || error);

    // setCounter(second);
    setCanResend(false);
  };

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="text-4xl font-semibold text-my-green">Verify Account</div>
      <div className="text-neutral-600 text-2xl">For user: {signUpEmail} </div>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="size-14 text-2xl" index={0} />
                        <InputOTPSlot className="size-14 text-2xl" index={1} />
                        <InputOTPSlot className="size-14 text-2xl" index={2} />
                        <InputOTPSlot className="size-14 text-2xl" index={3} />
                        <InputOTPSlot className="size-14 text-2xl" index={4} />
                        <InputOTPSlot className="size-14 text-2xl" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Only digits are allowed to input.
                  </FormDescription>
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
            <div className="flex w-full justify-between">
              <Button type="submit" >
                Submit
                {loading && <div className="loader"></div>}
              </Button>
              <div className="flex flex-col items-center gap-4">
                {!canResend ? (
                  <div className="text-gray-600">{counter}</div>
                ) : (
                  <Button onClick={handleResend} type="button" variant="outline">
                    Resend code
                    {reqLoading && <div className="loader"></div>}
                  </Button>
                )}
              </div>
            </div>
            {/* {error && <div className="text-red-600">{error.data.message}</div>} */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ValidationCode;
