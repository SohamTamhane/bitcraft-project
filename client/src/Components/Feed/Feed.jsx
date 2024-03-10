import { useContext, useEffect, useState } from "react";
import { Context } from "../../config/Context";
import "./Feed.css";
import { RiPencilFill } from "react-icons/ri";
import BlogCard from "./BlogCard";
import Ads from "./Ads";

import BlogCard1 from "../Home/BlogCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feed(){

    const {loginInfo} = useContext(Context);

    const navigate = useNavigate();

    const [blogs, setBlogs] = useState(undefined);

    async function getRecommendedBlogsFunc(){
        await axios.post(process.env.REACT_APP_BASE_URL+'/blog/get-recommended-blogs', {email: loginInfo?.user?.email})
        .then(response => {
            let blog1 = response?.data?.blog;
            let blog2 = shuffleArray(blog1);
            setBlogs(blog2);
        })
        .catch(error => {
            console.log(error?.response?.data?.message);
        });
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(()=>{
        getRecommendedBlogsFunc();
    }, [])

    return(
        <div className="feed-page-main-div">
            {
                loginInfo?.status ?
                    <div>
                        <div className="feed-page-divs1">
                            <div className="feed-page-post-options-div1">
                                <span className="feed-page-btn active-class">Recommended</span>
                                <span className="feed-page-btn feed-margin-left-10">Following</span>
                            </div>
                            <div>
                                <span onClick={()=>navigate('/write')} className="feed-page-btn feed-btn-icons-div"><RiPencilFill className="feed-btn-icon" />Write Blog</span>
                            </div>
                        </div>
                        <div className="feed-page-divs2">
                            <div className="feed-page-blog-card-primary-div">
                                {
                                    blogs?.map((blog)=>(
                                        <BlogCard link={`/blog/${blog.slug}`} key={blog.thumbnail} title={blog.title} desc={blog.content} thumbnail={blog.thumbnail} likes={blog.likes.length} views={blog.views}/>
                                    ))
                                }
                            </div>
                            <div className="feed-page-blog-card-secondary-div">
                                {
                                    blogs?.map((blog)=>(
                                        <BlogCard1 link={`/blog/${blog.slug}`} username={blog.author.name} date={blog.date} key={blog.thumbnail} title={blog.title} desc={blog.content} thumbnail={blog.thumbnail} likes={blog.likes.length} views={blog.views}/>
                                    ))
                                }
                            </div>
                            <div>
                                <Ads/>
                                <Ads/>
                            </div>
                        </div>
                    </div>
                :
                <div className="error-msg-div1">
                    Login to View this Page
                </div>
            }
        </div>
    )
}

export default Feed;