import { Link } from "react-router-dom";
import LogoImg from "../../Assets/Images/logo.png";
import './Header.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { Context } from "../../config/Context";
// import { FaRegBell } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

function Header(){

    const responsiveDiv = useRef();

    const {loginInfo} = useContext(Context);

    function openResponsiveDiv(){
        responsiveDiv.current.style.display = "grid";
    }

    function closeResponsiveDiv(){
        responsiveDiv.current.style.display = "none";
    }

    return(
        <div className="header-main-div">
            {
                loginInfo?.status ? 
                <Link to='/feed'>
                    <img src={LogoImg} alt="" className="logo-img"/>
                </Link>
                :
                <Link to='/'>
                    <img src={LogoImg} alt="" className="logo-img"/>
                </Link>
            }
            <div className="header-nav-div">
                <ul>
                    <li>
                        <Link className="nav-links">Explore</Link>
                        <Link className="nav-links">Trending</Link>
                        {
                            loginInfo?.status ? 
                            <>
                                <Link to='/feed' className="nav-icons2"><FaBell /></Link>
                                <Link to='/profile' className="nav-icons1"><img className="header-logo-img1" src={loginInfo?.user?.image} alt="" /></Link>
                            </>
                            :
                            <>
                                <Link to='/login' className="nav-btn">Login</Link>
                                <Link to='/register' className="nav-btn">Sign Up</Link>
                            </>
                        }
                    </li>
                </ul>
            </div>
            <GiHamburgerMenu className="hamburger" onClick={openResponsiveDiv}/>
            <div ref={responsiveDiv} className="nav-responsive-div">
                <IoCloseSharp onClick={closeResponsiveDiv} className="close-btn"/>
                <ul>
                    <li>
                        <div className="nav-div1">
                            <Link className="nav-links responsive-links">Explore</Link>
                            <Link className="nav-links responsive-links" >Trending</Link>
                        </div>
                        {
                            loginInfo?.status ? 
                            <>
                                <div className="nav-btn-div">
                                    <Link to='/profile' className="nav-btn">View Profile</Link>
                                </div>
                            </>
                            :
                            <>
                                <div className="nav-btn-div">
                                    <Link to='/login' className="nav-btn">Login</Link>
                                </div>
                                <div className="nav-btn-div">
                                    <Link to='/register' className="nav-btn">Sign Up</Link>
                                </div>
                            </>
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;