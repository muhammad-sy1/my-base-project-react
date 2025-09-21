// import { useEmailStore } from "@/services/useEmailStore";
import { useEffect, useState } from "react";

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
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useEmailStore } from "@/stores/useEmailStore";
import { useCheckCodeStore } from "@/https/authApi";
import { useVerificationCodeStore } from "@/https/authApi";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const CheckCode = () => {
  const { signUpEmail } = useEmailStore();

  const [counter, setCounter] = useState(localStorage.otpTimer);
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
    },
  });

  const { checkValidationCode, loading } = useCheckCodeStore();

  // check code
  const onSubmit = async (values) => {
    const body = {
      code: values.pin,
      email: signUpEmail,
    };
    console.log(signUpEmail);

    console.log(body);

    try {
      const res = await checkValidationCode(body);

      localStorage.setItem("resetCode", body.code);
      console.log(body.code);

      //   localStorage.setItem("status", res.data.status);
      //   localStorage.setItem("otpTimer", res.data.can_resend_after);
      console.log(res);
      navigate("/resetpassword");
      toast.success("Enter your new password");
    } catch (error) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  // resend code
  const { getVerificationCode, loading: resendLoading } =
    useVerificationCodeStore();

  const handleResend = async () => {
    const body = {
      email: signUpEmail,
      type: "reset",
    };

    console.log(body);

    try {
      const res = await getVerificationCode(body);

      localStorage.setItem("status", res.data.status);
      localStorage.setItem("otpTimer", res.data.can_resend_after);
      setCounter(Number(res.data.can_resend_after));

      console.log(res.data.status + res.data.can_resend_after);

      if (res.data.status === "otp_email_sent") {
        toast.success("Verification Code is sent");
      } else toast.warning(`Try after ${res.data.can_resend_after} second`);
    } catch (error) {
      console.log(error.data);
    }

    // const second = localStorage.getItem("otpTimer");
    // console.log(second);
    // console.log(error?.response?.data || error);
    setCanResend(false);
  };

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="text-4xl font-semibold text-my-green">Enter Code</div>
      <div className="text-neutral-600 text-2xl">
        For user: {localStorage.getItem("resetEmail")}{" "}
      </div>
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
            <div className="flex w-full justify-between">
              <Button type="submit" >
                Submit
                {loading && <div className="loader "></div>}
              </Button>
              <div className="flex flex-col justify-center items-center gap-4">
                {!canResend ? (
                  <div className="text-gray-600">{counter}</div>
                ) : (
                  <Button onClick={handleResend} type="button" variant="outline">
                    Resend code
                    {resendLoading && <div className="w-loader"></div>}
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

export default CheckCode;
