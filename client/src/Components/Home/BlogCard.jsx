import './Home.css';
import UserImg from "../../Assets/Images/user_img.png";
import { FaUsers } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function BlogCard({thumbnail, username, date, title, desc, likes, views, link}){
    return(
        <Link to={link}>
            <div className='home-blog-card-main-div'>
                <img src={thumbnail} alt="" className='blog-card-blog-thumbnail'/>
                <div className='blog-card-user-details-div'>
                    <img src={UserImg} alt="" className='blog--card-user-thumbnail'/>
                    <div className='blog-card-user-name'>{username}</div>
                    <GoDotFill className='blog-card-dot'/>
                    <div>{date}</div>
                </div>
                <div className='blog-card-blog-heading'>{title}</div>
                <div className='blog-card-desc'>
                    {desc?.length >= 50 ? desc?.replace(/(<([^>]+)>)/ig, '')?.slice(0, 100) + "..." : desc?.replace(/(<([^>]+)>)/ig, '')}
                    {/* {desc?.length >= 50 ? desc?.slice(0, 100) + "..." : desc} */}
                </div>
                <div className='blog-card-blog-details-div'>
                    <FaHeart />
                    <div className='blog-card-extra-text'>{likes} Likes</div>
                    <FaUsers className='blog-card-users-icon'/>
                    <div className='blog-card-extra-text'>{views} Views</div>
                </div>
            </div>
        </Link>
    )
}
export default BlogCard;