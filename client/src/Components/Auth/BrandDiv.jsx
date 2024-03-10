import "./Auth.css";
import Logo from "../../Assets/Images/logo.png";

function BrandDiv(){
    return(
        <div className="brand-div-main">
            <div className="brand-div-img-div">
                <img src={Logo} alt="" className="brand-div-img"/>
            </div>
            <div className="brand-tagline-div">
                Unleash the Power of Your <br />
                Words with <span className="yellow-span">BitCraft</span>
            </div>
        </div>
    )
}
export default BrandDiv;