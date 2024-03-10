import { useContext, useState } from 'react';
import './Auth.css';
import BrandDiv from './BrandDiv';
import {AutoTabProvider} from "react-auto-tab";
import { Context } from '../../config/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
// import {Link} from "react-router-dom";

function SignUpOTP(){

    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    const [val3, setVal3] = useState("");
    const [val4, setVal4] = useState("");
    const [val5, setVal5] = useState("");
    const [val6, setVal6] = useState("");

    const [alertText, setAlertText] = useState(undefined);
    const {signUpInfo} = useContext(Context);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function verifyOTP(){
        setLoading(true);
        if(val1==="" || val2==="" || val3==="" || val4==="" || val5==="" || val6===""){
            setAlertText("Please Enter OTP");
        }
        else{
            setAlertText(undefined);
            const otp = val1+val2+val3+val4+val5+val6;
            // const otp = parseInt(val1+val2+val3+val4+val5+val6);
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/verify", {name: signUpInfo.name, email: signUpInfo.email, password: signUpInfo.password, confirmPassword: signUpInfo.confirmPassword, otp, image: `https://api.dicebear.com/5.x/initials/svg?seed=${signUpInfo.name}`}).then(response => {
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
            <div className='auth-div auth-otp-main-div'>
                <div className='auth-heading'>Verify OTP</div>
                <div className='auth-btn-div'>
                    <div>
                    <AutoTabProvider>
                        <input onChange={(e)=>{setVal1(e.target.value)}} autoFocus type="number" className='otp-field' maxLength={1} tabbable={1}  />
                        <input onChange={(e)=>{setVal2(e.target.value)}} type="number" className='otp-field' maxLength={1} tabbable={1}  />
                        <input onChange={(e)=>{setVal3(e.target.value)}} type="number" className='otp-field' maxLength={1} tabbable={1}  />
                        <input onChange={(e)=>{setVal4(e.target.value)}} type="number" className='otp-field' maxLength={1} tabbable={1}  />
                        <input onChange={(e)=>{setVal5(e.target.value)}} type="number" className='otp-field' maxLength={1} tabbable={1}  />
                        <input onChange={(e)=>{setVal6(e.target.value)}} type="number" className='otp-field' maxLength={1} tabbable={1}  />
                    </AutoTabProvider>
                    </div>
                </div>
                <div className='auth-text-div1'>
                    <div className='auth-text1'>{alertText}</div>
                </div>
                <div className='auth-btn-div'>
                    <span className='auth-btn-white' onClick={verifyOTP}>Verify</span>
                </div>
            </div>
            <BrandDiv/>
        </div>
    )
}
export default SignUpOTP;