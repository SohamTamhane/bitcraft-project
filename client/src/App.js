import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Components/Auth/Login';
import LoginEmail from './Components/Auth/LoginEmail';
import SignUp from './Components/Auth/SignUp';
import SignUpEmail from './Components/Auth/SignUpEmail';
import SignUpOTP from './Components/Auth/SignUpOTP';
import ResetPassword1 from './Components/Auth/ResetPassword1';
import ResetPassword2 from './Components/Auth/ResetPassword2';
import ResetPassword3 from './Components/Auth/ResetPassword3';
import AppContext from './config/Context';
import Feed from './Components/Feed/Feed';
import ScrollToTop from './config/ScrollToTop';
import WriteBlog from './Components/WriteBlog/WriteBlog';
import BlogPage from './Components/Feed/BlogPage';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <AppContext>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/login/email' element={<LoginEmail/>}/>
                    <Route path='/register' element={<SignUp/>}/>
                    <Route path='/register/email' element={<SignUpEmail/>}/>
                    <Route path='/register/otp' element={<SignUpOTP/>}/>
                    <Route path='/reset-password/email' element={<ResetPassword1/>}/>
                    <Route path='/reset-password/otp' element={<ResetPassword2/>}/>
                    <Route path='/reset-password/password' element={<ResetPassword3/>}/>
                    <Route path='/feed' element={<Feed/>}/>
                    <Route path='/write' element={<WriteBlog/>}/>
                    <Route path='/blog/:username/:slug' element={<BlogPage/>}/>
                </Routes>
                <Footer/>
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
