import { useContext, useState } from 'react';
import './Auth.css';
import BrandDiv from './BrandDiv';
import {useNavigate} from "react-router-dom";
import { Context } from '../../config/Context';
import axios from 'axios';
import Spinner from '../Spinner';

function ResetPassword3(){

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [alertText, setAlertText] = useState(undefined);
    const {signUpInfo} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function resetPasswordFunc(){
        setLoading(true);
        if(password==="" || confirmPassword===""){
            setAlertText("Please Fill All the Details");
        }
        else if(password!==confirmPassword){
            setAlertText("Password and Confirm Password must be Same");
        }
        else{
            setAlertText(undefined);
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/reset-password", {email: signUpInfo.email, password, confirmPassword}).then(response => {
                navigate('/login')
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
                <div className='auth-heading'>Reset Password</div>
                <div className='auth-btn-div'>
                    <div>
                        <div className='auth-label'>New Password</div>
                        <input onChange={(e)=>setPassword(e.target.value)} type='password' className='auth-inp' placeholder='Enter New Password'/>
                    </div>
                    <div>
                        <div className='auth-label'>Confirm Password</div>
                        <input onChange={(e)=>setConfirmPassword(e.target.value)} type='password' className='auth-inp' placeholder='Confirm New Password'/>
                    </div>
                </div>
                <div className='auth-text-div1'>
                    <div className='auth-text1'>{alertText}</div>
                </div>
                <div className='auth-btn-div'>
                    <span onClick={resetPasswordFunc} className='auth-btn-white'>Reset</span>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword3;