import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import {AuthContextProvider} from "./context/AuthContext";
import Account from './pages/Account'
import ProtectedRoute from "./components/ProtectedRoute";
import Instruction from "./pages/Instruction";

function App() {


    return (
        <>
            <AuthContextProvider>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/Instruction' element={<Instruction />}/>
                    <Route path='/Quiz' element={<Quiz/>}/>
                    <Route path='/Login' element={<Login/>}/>
                    <Route path='/SignUp' element={<SignUp/>}/>
                    <Route path='/Account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
                </Routes>
            </AuthContextProvider>
        </>
    );
}

export default App;