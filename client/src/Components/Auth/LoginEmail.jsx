import { useContext, useState } from 'react';
import './Auth.css';
import BrandDiv from './BrandDiv';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import Spinner from '../Spinner';
import { Context } from '../../config/Context';

function LoginEmail(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [alertText, setAlertText] = useState(undefined);
    const navigate = useNavigate();
    const {loginInfo ,setLoginInfo} = useContext(Context);


    async function loginFunc(){
        setLoading(true);
        if(email==="" || password===""){
            setAlertText("Please Fill All the Details");
        }
        else{
            setAlertText(undefined);
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/login", {email, password}).then(response => {
                setLoginInfo({status: true, user: response?.data?.user});
                navigate('/feed')
            })
            .catch(error => {
                setAlertText(error?.response?.data?.message);
            });
        }
        setLoading(false);
    }

    return(
        <div className='page-main-div'>
            {loading ? 
             <Spinner/>: <></>
            }
            <BrandDiv/>
            <div className='auth-div'>
                <div className='auth-heading'>Login</div>
                <div className='auth-btn-div'>
                    <div>
                        <div className='auth-label'>Email</div>
                        <input onChange={(e)=>setEmail(e.target.value)} type='email' className='auth-inp' placeholder='Enter Your Email'/>
                    </div>
                    <div>
                        <div className='auth-label'>Password</div>
                        <input onChange={(e)=>setPassword(e.target.value)} type='password' className='auth-inp' placeholder='Enter Your Password'/>
                    </div>
                </div>
                <div className='auth-text-div'>
                    <Link className='auth-text' to='/reset-password/email'>Forgot Password?</Link>
                </div>
                <div className='auth-text-div1'>
                    <div className='auth-text1'>{alertText}</div>
                </div>
                <div className='auth-btn-div'>
                    <span onClick={loginFunc} className='auth-btn-white'>Login</span>
                </div>
            </div>
        </div>
    )
}
export default LoginEmail;