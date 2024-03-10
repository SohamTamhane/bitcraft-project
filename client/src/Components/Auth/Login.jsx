import './Auth.css';
import { FaGoogle } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import BrandDiv from './BrandDiv';
import {Link, useNavigate} from "react-router-dom";
import { Context } from '../../config/Context';
import { useContext, useEffect, useState } from 'react';

// Firebase Imports
import {auth, googleProvider } from "../../config/firebase";
import {GoogleAuthProvider, getRedirectResult, signInWithRedirect} from 'firebase/auth';
import Spinner from '../Spinner';
import axios from 'axios';

function Login(){

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

    async function loginServer(){
        await axios.post(process.env.REACT_APP_BASE_URL+"/auth/signin", {email: loginInfo.user.email}).then(response => {
            setLoginInfo({status: true, user: response?.data?.user});
            setSignInFlag(false);
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
                setLoginInfo({status: false, user: result.user});
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
            loginServer();
        }
    }, [loginInfo])

    return(
        <div className='page-main-div'>
            {loading ? 
             <Spinner/>: <></>
            }
            <BrandDiv/>
            <div className='auth-div'>
                <div className='auth-heading'>Login</div>
                {
                    alertText?
                        <div className='auth-text-div1'>
                            <div className='auth-text1 auth-text2'>{alertText}</div>
                        </div>
                    : <></>
                }
                <div className='auth-btn-div'>
                    <div  onClick={signInWithGoogle} className='auth-btn'><FaGoogle className='auth-logo' />Login with Google</div>
                    <Link className='auth-btn' to='/login/email'><MdEmail className='auth-logo' />Login with Email</Link>
                </div>
                <div className='auth-text-div'>
                    <Link className='auth-text' to='/register'>Don’t Have an Account? Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
export default Login;