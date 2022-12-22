import dynamic from "next/dynamic";
import useUser from "@/lib/iron-session/useUser";
import UserMenu from "@/components/Navbar/UserMenu";
import Link from "next/link";
import MenuItems from "@/components/Navbar/parts/MenuItems";
import LocationMenu from "@/components/Navbar/parts/LocationMenu";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/Primitives/Navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import MobileActiveLink from "@/components/Navbar/parts/MobileActiveLink";
import WMButton from "./parts/WMButton";
// import { SnowMiddle, SmallSideSnow } from "../xmas/snow";
import SearchBar from "../SearchBar";
import ActiveLinkNewMenu from "./parts/ActiveLinkNewMenu";
// import { Waypoint } from "react-waypoint";

const WMCounter = dynamic(
  () => import("@/components/WebMonetization/Counter"),
  {
    ssr: false,
  }
);

export const HomePageNewNavBar = () => {
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <div className="relative">
      <div className="absolute z-[60] hidden sm:block -top-1 left-[5%]">
        {/* <SnowMiddle /> */}
      </div>
      {/* <div className="absolute z-[60] hidden sm:block -top-1 left-[80%] pointer-events-none">
        <SmallSideSnow />
      </div> */}

      <div className="sticky top-0 z-50 ">
        <div className="top-0 w-[100%] max-w-[1300px] mx-auto h-auto bg-white bg-opacity-90 border border-black border-opacity-10 backdrop-blur z-50">
          <div className="flex flex-row gap-2 p-2 px-6 justify-between">
            <div className="flex  flex-shrink-0 items-center">
              <Link href="/" as="/">
                <>
                  {/* pantalla grande */}
                  {/* <img
                  className="block h-8 w-auto "
                  src="/static/images/logo-small-xmas.svg"
                  //   src="/static/images/logo-small.svg"
                  alt="Prototypr Logo"
                /> */}
                  <img
                    className="block h-10 w-auto mb-2 "
                    src="/static/images/logo-small-xmas.svg"
                    //   src="/static/images/logo-small.svg"
                    alt="Prototypr Logo"
                  />
                </>
              </Link>
              <div
                className={`hidden md:block my-auto duration-300 ease-in-out`}
              >
                <WMCounter />
              </div>
              <SearchBar />
            </div>
            <div className="hidden sm:flex flex-row p-2">
              {[
                { label: "Home", url: "/" },
                { label: "Toolbox", url: "/toolbox/page/1" },
                { label: "Topics", url: "/topics" },
                { label: "Jobs", url: "/jobs" },
                { label: "Sponsor", url: "/sponsor" },
              ].map((tab) => {
                return (
                  <div className="mx-1">
                    <ActiveLinkNewMenu href={tab.url}>
                      {tab.label}
                    </ActiveLinkNewMenu>
                  </div>
                );
              })}
              <div className=" flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className={`hidden mr-2 md:block my-auto`}>
                  <WMButton />
                </div>
                {/* <NavigationMenu></NavigationMenu> */}
                <div className="relative ml-3">
                  <UserMenu userLoading={isLoading} user={user} />
                </div>
              </div>
            </div>
            <div className=" inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={toggleMobileNav}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                {mobileNavOpen ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`sm:hidden relative mt-2 shadow-lg rounded-lg bg-white z-[100] ${
            !mobileNavOpen ? "h-0 overflow-hidden" : ""
          }`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3 text-sm font-inter">
            <MobileActiveLink href={"/"}>Home</MobileActiveLink>
            <MobileActiveLink href={"/topics"}>Topics</MobileActiveLink>

            <MobileActiveLink href={"/toolbox/page/1"}>
              Toolbox
            </MobileActiveLink>
            <MobileActiveLink href={"/jobs"}>Jobs</MobileActiveLink>
            <MobileActiveLink href={"/sponsor"}>Sponsor</MobileActiveLink>
            <MobileActiveLink href={"/web-monetization"}>
              Web Monetization
            </MobileActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({
  collapsed,
  hideLocaleSwitcher,
  editor,
  showWriteButton,
  maxWidth,
}) => {
  const { user, isLoading } = useUser({
    redirectIfFound: false,
  });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  // const [navScrolledClass, setNavScrolledClass] = useState("border-opacity-0");
  // const [wrapperClass, setWrapperClass] = useState("top-0");

  // const _handleWaypointEnter = () => {
  //   setNavScrolledClass("border-opacity-0");
  //   // setWrapperClass("top-0");
  // };
  // const _handleWaypointLeave = () => {
  //   setNavScrolledClass("border-opacity-5");
  //   // setWrapperClass("top-2");
  // };

  return (
    <>
      <nav className={`font-inter fixed top-3.5 w-full z-50`}>
        <div
          className={`w-[97%] ${
            maxWidth ? maxWidth : "max-w-[1020px]"
          } bg-white bg-opacity-60 backdrop-blur-lg border-opacity-10 mx-auto border rounded-[60px] border-black px-6`}
        >
          <div className="flex flex-row justify-between">
            <div className="relative flex h-16 items-center justify-between">
              {/* movil menu button */}
              <div className="absolute inset-y-0 right-0 flex items-center xl:hidden">
                <button
                  type="button"
                  onClick={toggleMobileNav}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  {mobileNavOpen ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center items-stretch justify-between">
                <div className="flex mr-3 flex-shrink-0 items-center">
                  <Link href="/" as="/">
                    <>
                      <img
                        className="block h-10 w-auto mb-2"
                        src="/static/images/logo-small-xmas.svg"
                        alt="Prototypr Logo"
                      />
                    </>
                  </Link>
                  <div
                    className={`hidden md:block my-auto duration-300 ease-in-out`}
                  >
                    <WMCounter />
                  </div>

                  <SearchBar />
                </div>

                <div className="justify-end hidden xl:flex mr-6">
                  {[
                    { label: "Home", url: "/" },
                    { label: "Toolbox", url: "/toolbox/page/1" },
                    { label: "Topics", url: "/topics" },
                    { label: "Jobs", url: "/jobs" },
                    // { label: "Sponsor", url: "/sponsor" },
                  ].map((tab) => {
                    return (
                      <div className="mx-1 flex flex-col justify-center">
                        <ActiveLinkNewMenu href={tab.url}>
                          {tab.label}
                        </ActiveLinkNewMenu>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              className={`items-center sm:static sm:inset-auto flex ${
                user?.isLoggedin ? "mr-[52px] sm:mr-16" : "lg:mr-0"
              } mr-[52px] sm:mr-16`}
            >
              {/* <div className={`hidden mr-2 md:block my-auto`}>
                <WMButton />
              </div> */}
              <div
                className={`items-center sm:static sm:inset-auto flex ${
                  user?.isLoggedin ? "mr-16" : "lg:mr-0"
                } mr-16`}
              >
                <div className={`hidden mr-2 md:block my-auto`}>
                  <WMButton />
                </div>
                <NavigationMenu>
                  <NavigationMenuList>
                    <LocationMenu
                      user={user}
                      hideLocaleSwitcher={hideLocaleSwitcher}
                      collapsed={collapsed}
                      showWriteButton={showWriteButton}
                    />
                  </NavigationMenuList>
                </NavigationMenu>
                <div className="relative">
                  <UserMenu userLoading={isLoading} user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* movil menu */}
        <div
          className={`xl:hidden ${
            !mobileNavOpen
              ? "h-0 overflow-hidden"
              : "mx-3 border border-gray-100 mt-1 bg-white shadow-lg"
          } rounded-xl`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3">
            <MobileActiveLink href={"/"}>Home</MobileActiveLink>
            <MobileActiveLink href={"/toolbox/page/1"}>
              Toolbox
            </MobileActiveLink>
            <MobileActiveLink href={"/jobs"}>Jobs</MobileActiveLink>
            <MobileActiveLink href={"/web-monetization"}>
              Web Monetization
            </MobileActiveLink>
          </div>
        </div>
      </nav>
      {/* <div className="mt-20">
      <Waypoint onEnter={_handleWaypointEnter} onLeave={_handleWaypointLeave} />
    </div> */}
    </>
  );
};

export default Navbar;
