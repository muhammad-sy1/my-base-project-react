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
  FormLabel,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { t } from "i18next";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";

import { useEmailStore } from "@/stores/useEmailStore";
import { useVerificationCodeStore } from "@/https/authApi";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().regex(/^\d+$/, {
    message: "Phone number must contain only digits.",
  }),
  birthday: z.string(),
  gender: z.enum(["MALE", "FEMALE"], {
    _error: "You need to select a notification type.",
  }),
});

export default function SignUp() {
  // eslint-disable-next-line no-unused-vars
  const { signUpEmail, setSignUpEmail } = useEmailStore();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthday: "",
    },
  });

  const { getVerificationCode, reqLoading, reqError } =
    useVerificationCodeStore();

  const onSubmit = async (values) => {
    setSignUpEmail(values.email);

    const body = {
      email: values.email,
      phone_number: values.phone,
      country_code: "1",
      type: "registration",
    };

    localStorage.setItem(
      "userData",
      JSON.stringify({
        birth_date: values.birthday,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        gender: values.gender,
        country_code: "1",
        phone_number: values.phone,
      })
    );

    try {
      const res = await getVerificationCode(body);
      console.log(res.data.can_resend_after);

      localStorage.setItem("status", res.data.status);
      localStorage.setItem("otpTimer", res.data.can_resend_after);
      toast.success("Verification Code is sent");
      navigate("/validationCode");
    } catch (reqError) {
      console.log(reqError.data.message);
      toast.error(reqError.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 w-full">
      <div className="text-4xl font-semibold text-my-green">
        Create <span className="text-black">Account</span>
      </div>
      <div className="text-neutral-600 text-2xl">
        {t("contact.form.title-create")}
      </div>
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Birthday" {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {/* <FormLabel>Notify me about...</FormLabel> */}
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-x-8 "
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="MALE" />
                        </FormControl>
                        <FormLabel className="font-normal text-xl">
                          Male
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="FEMALE" />
                        </FormControl>
                        <FormLabel className="font-normal text-xl">
                          Female
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              Create Account
              {reqLoading && <div className="loader"></div>}
            </Button>
            {reqError && (
              <div className="text-red-600">{reqError.data.message}</div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
