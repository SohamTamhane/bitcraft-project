import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../../Assets/Images/logo.png";

function Footer(){
    return(
        <div className="footer-main-div">
            <div className="footer-link-div">
                <div>
                    <span className="footer-link-heading">Trending Topics</span>
                    <Link to="/">Programming</Link>
                    <Link to="/">Machine Learning</Link>
                    <Link to="/">Blockchain</Link>
                    <Link to="/">Data Science</Link>
                </div>
                <div>
                    <span className="footer-link-heading">Quick Links</span>
                    <Link to="/">Home</Link>
                    <Link to="/">Contact</Link>
                    <Link to="/">Login</Link>
                    <Link to="/">Sign Up</Link>
                </div>
                <div>
                    <span className="footer-link-heading">Connect With Us</span>
                    <Link to="/">Instagram</Link>
                    <Link to="/">LinkedIn</Link>
                    <Link to="/">Twitter (X)</Link>
                    <Link to="/">Discord</Link>
                </div>
                <div>
                    <span className="footer-link-heading">Support</span>
                    <Link to="/">Docs</Link>
                    <Link to="/">Privacy Policy</Link>
                    <Link to="/">Terms</Link>
                    <Link to="/">Code of Conduct</Link>
                </div>
            </div>
            <div className="footer-name-div">
                <img src={Logo} alt="" className="footer-logo"/>
                <div>
                | Copyright © 2023 | All Rights Reserved
                </div>
            </div>
        </div>
    )
}
export default Footer;