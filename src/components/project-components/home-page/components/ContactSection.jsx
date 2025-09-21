import { useTranslation } from "react-i18next";
import { InputForm } from "./ContactForm";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <div className="container xl:px-52 lg:px-20 md:px-10 sm:px-5 px-2 py-10">
      <div className="sec-title py-10">{t("contact.title")}</div>
      <div className="flex rounded-xl justify-center items-center">
        <InputForm />
      </div>
    </div>
  );
}
