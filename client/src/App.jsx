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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
           <Route path="/" element={<MHome/>}/>

           <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> 
         
          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<Home />} />
            <Route path="/myNetwork" element={<AllNetwork />} />
            <Route path="/invitations" element={<IncomingInvitations />} />
            <Route path="/sent" element={<SentRequests />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

console.log();
