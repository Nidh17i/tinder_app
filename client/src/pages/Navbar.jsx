import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { userLoggedOut, userLoggedIn, finishLoading } from "../features/authSlice";
import profile from "../assets/profileavtar.jpg";

const navigation = [
  { name: "Home", href: "/feed" },
  { name: "Match", href: "/match" },
  { name: "Invitations", href: "/invitations" },
  { name: "Sent Request", href: "/sent" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.authslice);
 useEffect(()=>{
    const checkUser=async()=>{
      try{
        const res=await axios.get('http://localhost:8080/auth/self',{
          withCredentials:true,
        });
       // console.log('hii',res.data.user);
  
  dispatch(userLoggedIn(res.data.user));
    }catch(err){
      dispatch(finishLoading());
      console.log('User Not logged in')

    }};
    checkUser();

  },[]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
      dispatch(userLoggedOut());
      navigate("/");
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  if (loading) return null; 

  return (
    <Disclosure as="nav" className="bg-gray-800 relative">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <Bars3Icon className="block h-6 w-6" />
              <XMarkIcon className="hidden h-6 w-6" />
            </DisclosureButton>
          </div>

          {/* Logo & Desktop navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/">
              <div className="flex shrink-0 items-center">
                <span className="text-white font-bold text-2xl sm:text-3xl tracking-wider">
                  <span className="text-blue-400">Tech</span>
                  <span className="text-cyan-300">Mate</span>
                </span>
              </div>
            </Link>

            {isAuthenticated && (
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        "text-gray-300 hover:bg-white/5 hover:text-white",
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

          {/* Right side */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full"
                >
                  Login
                </Link>
                {/* <Link
                  to="/signup"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                >
                  Signup
                </Link> */}
              </>
            )}

            {isAuthenticated && (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full">
                  <img src={profile} alt="profile" className="h-8 w-8 rounded-full" />
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
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {isAuthenticated
            ? navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))
            : (
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
