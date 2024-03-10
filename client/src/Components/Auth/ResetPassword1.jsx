import { useContext, useState } from 'react';
import './Auth.css';
import BrandDiv from './BrandDiv';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Context } from '../../config/Context';
import Spinner from '../Spinner';

function ResetPassword1(){

    const [email, setEmail] = useState("");

    const [alertText, setAlertText] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const {setSignUpInfo} = useContext(Context);
    const navigate = useNavigate();

    async function SendOTPFunc(){
        setLoading(true);
        if(email===""){
            setAlertText("Please Enter a Valid Email!");
        }
        else{
            setAlertText(undefined);
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/reset-password/otp", {email}).then(response => {
                setSignUpInfo({email})
                navigate('/reset-password/otp')
                setLoading(false);
            })
            .catch(error => {
                setAlertText(error?.response?.data?.message);
                setLoading(false);
            });
        }
    }

    return(
        <div className='page-main-div'>
            {loading ? 
             <Spinner/>: <></>
            }
            <BrandDiv/>
            <div className='auth-div'>
                <div className='auth-heading'>Reset Password</div>
                <div className='auth-btn-div'>
                    <div>
                        <div className='auth-label'>Email</div>
                        <input onChange={(e)=>setEmail(e.target.value)} type='email' className='auth-inp' placeholder='Enter Your Email'/>
                    </div>
                </div>
                <div className='auth-text-div1'>
                    <div className='auth-text1'>{alertText}</div>
                </div>
                <div className='auth-btn-div'>
                    <span onClick={SendOTPFunc} className='auth-btn-white'>Send OTP</span>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword1;