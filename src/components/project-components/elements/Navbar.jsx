import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { SlPlus } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router";
// import { getCookie } from "@/utils/cookies";

export default function Header() {
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  // const firstName = localStorage.getItem("firstName");
  // const lastName = localStorage.getItem("lastName");
  // const username = getCookie("username");

  return (
    <header>
      <nav className="sm:max-w-[95%] absolute mx-auto z-50 top-10 inset-x-0 ">
        <div className="px-2 bg-gradient-to-r from-my-black/85 from-5% via-my-green/75 via-20% to-white/50 dark:to-black/50 to-90% h-16 rounded-xl">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="h-full flex justify-center items-center p-3">
              <img
                src="/imgs/logo.png"
                alt="logo"
                className="h-full cursor-pointer"
              />
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-x-4">
              {/* Publish Ride */}
              <Dialog>
                <DialogTrigger className="">
                  <div className="flex items-center gap-x-2 transition-colors text-muted-foreground hover:text-foreground">
                    <SlPlus className="text-2xl" />
                    <span className="font-bold text-xl sm:flex hidden">
                      {t("header.publishRide")}
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("header.confirmTitle")}</DialogTitle>
                    <DialogDescription>
                      {t("header.confirmDesc")}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* Search */}
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer transition-colors text-muted-foreground hover:text-foreground">
                      <IoIosSearch className="text-3xl" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{t("header.search")}</DialogTitle>
                      <DialogDescription>
                        {t("header.searchDesc")}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Input
                          id="name-1"
                          name="name"
                          placeholder={t("header.searchPlaceholder")}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">{t("header.cancel")}</Button>
                      </DialogClose>
                      <Button type="submit">{t("header.search")}</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="flex items-center gap-x-1 text-2xl transition-colors text-muted-foreground hover:text-foreground">
                    <FaUserCircle />
                    <MdKeyboardArrowDown />
                    {/* <div className="text-lg font-semibold">
                      {token && `${firstName} ${lastName}`}
                    </div> */}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{t("header.myAccount")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t("header.profile")}</DropdownMenuItem>
                  <DropdownMenuItem>{t("header.billing")}</DropdownMenuItem>
                  <DropdownMenuItem>{t("header.team")}</DropdownMenuItem>
                  {!token && (
                    <DropdownMenuItem>
                      <NavLink className="flex w-full" to="/log-in">
                        Login
                      </NavLink>
                    </DropdownMenuItem>
                  )}
                  {!token && (
                    <DropdownMenuItem>
                      <NavLink className="flex w-full" to="/sign-up">
                        Sign Up
                      </NavLink>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
