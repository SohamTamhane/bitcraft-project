import "./Feed.css";
import { FaHeart } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BlogCard({title, thumbnail, desc, likes, views, link}){
    return(
        <Link to={link}>
            <div className="feed-blog-card-main-div1">
                <div>
                    <div>
                        <img className="feed-blog-card-img1" src={thumbnail} alt="" />
                    </div>
                    <div className="feed-blog-card-extras-div">
                        <div className="feed-blog-card-extras-div1"><FaHeart className="feed-blog-card-icons-span"/><span className="feed-blog-card-extras-text-span">{likes} Likes</span></div>
                        <div className="feed-blog-card-extras-div1 feed-margin-left-10"><FaUsers className="feed-blog-card-icons-span"/><span className="feed-blog-card-extras-text-span">{views} Views</span></div>
                    </div>
                </div>
                <div className="feed-blog-card-main-div1-right">
                    <div className="feed-blog-card-heading">{title?.length >= 50 ? title?.slice(0, 60) + "..." : title}</div>
                    <div className="feed-blog-card-desc">{desc?.length >= 230 ? desc?.replace(/(<([^>]+)>)/ig, '')?.slice(0, 230) + "..." : desc?.replace(/(<([^>]+)>)/ig, '')}</div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard