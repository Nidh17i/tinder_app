import { useDispatch, useSelector } from "react-redux";
  import logo from '../assets/tlogo.svg'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { userLoggedOut } from "../features/authSlice";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "My Network", href: "/myNetwork", current: false },
  { name: "Invitations", href: "/invitations", current: false },
  { name: "Sent Request", href: "/sent", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.authslice);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(userLoggedOut());
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <Disclosure as="nav" className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo + Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src={logo} className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full"
                >
                  Login
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <button className="relative rounded-full p-1 text-gray-400">
                  <BellIcon className="size-6" />
                </button>

                {/* Profile Menu */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full">
                    <img
                      alt="profile"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      className="size-8 rounded-full"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* If authenticated, show nav links */}
          {isAuthenticated &&
            navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className={classNames(
                  "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}

          {/* If NOT logged in → show Login + Signup */}
          {!isAuthenticated && (
            <>
              <DisclosureButton
                as={Link}
                to="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-white bg-indigo-600"
              >
                Login
              </DisclosureButton>

              <DisclosureButton
                as={Link}
                to="/signup"
                className="block rounded-md px-3 py-2 text-base font-medium text-white bg-green-600"
              >
                Signup
              </DisclosureButton>
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
