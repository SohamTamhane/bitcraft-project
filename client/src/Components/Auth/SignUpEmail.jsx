import { useContext, useState } from 'react';
import './Auth.css';
import BrandDiv from './BrandDiv';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { Context } from '../../config/Context';
import Spinner from '../Spinner';

function SignUpEmail(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {setSignUpInfo} = useContext(Context);
    const [alertText, setAlertText] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function SignUpFunc(){
        setLoading(true);
        if(name==="" || email==="" || password==="" || confirmPassword===""){
            setAlertText("Please Fill All the Details");
        }
        else if(password!==confirmPassword){
            setAlertText("Password must be Same");
        }
        else{
            setAlertText(undefined);
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/otp", {email}).then(response => {
                setSignUpInfo({name, email, password, confirmPassword})
                navigate('/register/otp')
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
            <div className='auth-div'>
                <div className='auth-heading'>Sign Up</div>
                <div className='auth-btn-div'>
                    <div>
                        <div className='auth-label'>Name</div>
                        <input onChange={(e)=>setName(e.target.value)} type='text' className='auth-inp' placeholder='Enter Your Name'/>
                    </div>
                    <div>
                        <div className='auth-label'>Email</div>
                        <input onChange={(e)=>setEmail(e.target.value)} type='email' className='auth-inp' placeholder='Enter Your Email'/>
                    </div>
                    <div>
                        <div className='auth-label'>Password</div>
                        <input onChange={(e)=>setPassword(e.target.value)} type='password' className='auth-inp' placeholder='Create New Password'/>
                    </div>
                    <div>
                        <div className='auth-label'>Confirm Password</div>
                        <input onChange={(e)=>setConfirmPassword(e.target.value)} type='password' className='auth-inp' placeholder='Confirm Your Password'/>
                    </div>
                </div>
                <div className='auth-text-div1'>
                    <div className='auth-text1'>{alertText}</div>
                </div>
                <div className='auth-btn-div'>
                    {/* <div onClick={SignUpFunc} className='auth-btn-white'>Sign Up</div> */}
                    <span onClick={SignUpFunc} className='auth-btn-white'>Sign Up</span>
                </div>
            </div>
            <BrandDiv/>
        </div>
    )
}
export default SignUpEmail;