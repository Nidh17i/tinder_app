import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import Navbar from "./pages/Navbar";
import { Home } from "./pages/Home";
import { AllNetwork } from "./components/AllNetwork";
import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { IncomingInvitations } from "./components/Invitations";
import { SentRequests } from "./pages/SentRequest";
import { MHome } from "./pages/MHome";
import { Toaster } from "react-hot-toast";
import { Profile } from "./pages/Profile";
import EditProfile from "./components/EditProfile";



function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<MHome />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<Home />} />
            <Route path="/match" element={<AllNetwork />} />
            <Route path="/invitations" element={<IncomingInvitations />} />
            <Route path="/sent" element={<SentRequests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
