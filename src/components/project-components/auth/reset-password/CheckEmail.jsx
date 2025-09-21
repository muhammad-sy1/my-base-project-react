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
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useEmailStore } from "@/stores/useEmailStore";
import { useVerificationCodeStore } from "@/https/authApi";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

const CheckEmail = () => {
  const { setSignUpEmail } = useEmailStore();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { getVerificationCode, loading } = useVerificationCodeStore();

  const onSubmit = async (values) => {
    const body = {
      email: values.email,
      type: "reset",
    };
    console.log(body);

    setSignUpEmail(values.email);

    try {
      const res = await getVerificationCode(body);

      console.log(res);
      if (res.data.status === "otp_email_sent") {
        toast.success("Verification Code is sent");
        navigate("/checkCode");
      } else toast.warning(`Try after ${res.data.can_resend_after} second`);
    } catch (err) {
      console.log(err.data.message);
      toast.error(err.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="text-4xl font-semibold text-my-green">
        Forget Password? 🔒
      </div>
      <div className="text-neutral-600 text-xl">
        Enter your email and we'll send you verification code to reset your
        password.
      </div>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* {error && <div className="text-red-600">{apiError}</div>} */}

            <Button type="submit">
              Submit
              {loading && <div className="loader"></div>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckEmail;
