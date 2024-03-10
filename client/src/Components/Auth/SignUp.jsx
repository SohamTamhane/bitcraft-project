import './Auth.css';
import { FaGoogle } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import BrandDiv from './BrandDiv';
import {Link, useNavigate} from "react-router-dom";
import { Context } from '../../config/Context.js';
import { useContext, useEffect, useState } from 'react';

// Firebase Imports
import {auth, googleProvider } from "../../config/firebase.js";
import {GoogleAuthProvider, getRedirectResult, signInWithRedirect} from 'firebase/auth';
import Spinner from '../Spinner.jsx';
import axios from 'axios';


function SignUp(){
    
    const navigate = useNavigate();
    const {loginInfo ,setLoginInfo} = useContext(Context);
    const [signInFlag, setSignInFlag] = useState(false);

    const [alertText, setAlertText] = useState(undefined);

    const [loading, setLoading] = useState(true);

    async function signInWithGoogle() {
        setLoading(true);
        try {
            await signInWithRedirect(auth, new GoogleAuthProvider());
        }
        catch (err) {
            console.log(err.message);
        }
        // setLoading(false);
    }

    async function signInServer(){
        await axios.post(process.env.REACT_APP_BASE_URL+"/auth/register", {name: loginInfo.user.displayName, email: loginInfo.user.email, password: loginInfo.user.uid, confirmPassword: loginInfo.user.uid, image: loginInfo.user.photoURL, uid: loginInfo.user.uid}).then(response => {
            navigate('/feed')
            setLoading(false);
        })
        .catch(error => {
            setAlertText(error?.response?.data?.message);
            setLoading(false);
        });
    }

    async function getRedirectResultFunc(){
        await getRedirectResult(auth).then((result)=>{
            if(result){
                setLoginInfo({status: true, user: result.user});
                setSignInFlag(true);
            }
        });
        setLoading(false);
    }

    useEffect(()=>{
        getRedirectResultFunc();
    }, [])

    useEffect(()=>{
        if(loginInfo!==undefined && signInFlag===true){
            signInServer();
        }
    }, [loginInfo])

    return(
        <div className='page-main-div'>
            {loading ? 
             <Spinner/>: <></>
            }
            <div className='auth-div'>
                <div className='auth-heading'>Sign Up</div>
                {
                    alertText?
                        <div className='auth-text-div1'>
                            <div className='auth-text1 auth-text2'>{alertText}</div>
                        </div>
                    : <></>
                }
                <div className='auth-btn-div'>
                    <div onClick={signInWithGoogle} className='auth-btn'><FaGoogle className='auth-logo' />Sign Up with Google</div>
                    <Link className='auth-btn' to='/register/email'><MdEmail className='auth-logo' />Sign Up with Email</Link>
                </div>
                <div className='auth-text-div'>
                    <Link className='auth-text' to='/login'>Already Have an Account? Login</Link>
                </div>
            </div>
            <BrandDiv/>
        </div>
    )
}
export default SignUp;