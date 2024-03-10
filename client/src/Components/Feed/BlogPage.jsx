import "./Feed.css";
import BlogImg from "../../Assets/Images/blog_img.png";
import { BsDot } from "react-icons/bs";
import { FaComment, FaHeart, FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import axios from "axios";
import { Context } from "../../config/Context";
import { IoCloseSharp } from "react-icons/io5";

function BlogPage(){

    const {username, slug} = useParams();

    const [blog, setBlog] = useState(undefined);
    const [content, setContent] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [following, setFollowing] = useState(false);
    const {loginInfo, getUser} = useContext(Context);

    const [comment, setComment] = useState("");

    const commentDiv = useRef();


    async function getBlog(){
        const blogSlug = username+"/"+slug;
        await axios.post(process.env.REACT_APP_BASE_URL+'/blog/get-blog', {slug: blogSlug})
            .then(response => {
                setBlog(response?.data?.blog[0]);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    }

    async function likeBlog(){
        if(!loginInfo){
            alert("Login to Like this Blog")
        }
        else{
            setLoading(true);
            const blogSlug = username+"/"+slug;
            if(liked){
                await axios.post(process.env.REACT_APP_BASE_URL+'/blog/dislike-blog', {slug: blogSlug, username: loginInfo?.user?.username})
                    .then(response => {
                        getBlog();
                        setLiked(false);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        console.log(error);
                    });
            }
            else{
                await axios.post(process.env.REACT_APP_BASE_URL+'/blog/like-blog', {slug: blogSlug, username: loginInfo?.user?.username})
                    .then(response => {
                        getBlog();
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        console.log(error);
                    });
            }
        }
    }

    async function commentBlog(){
        if(!loginInfo){
            alert("Login to Comment on this Blog")
        }
        else{
            setLoading(true);
            const blogSlug = username+"/"+slug;
            await axios.post(process.env.REACT_APP_BASE_URL+'/blog/comment-blog', {slug: blogSlug, username: loginInfo?.user?.username, comment: comment})
                .then(response => {
                    getBlog();
                    closeCommentDiv();
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
            
        }
    }

    async function followUser(){
        if(!loginInfo){
            alert("Login to Follow the User")
        }
        else{
            setLoading(true);
            await axios.post(process.env.REACT_APP_BASE_URL+'/auth/follow', {followerUsername: blog?.author?.username, followingUsername: loginInfo?.user?.username})
                .then(response => {
                    getBlog();
                    getUser();
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
            
        }
    }

    async function unfollowUser(){
        if(!loginInfo){
            alert("Login to Unfollow the User")
        }
        else{
            setLoading(true);
            await axios.post(process.env.REACT_APP_BASE_URL+'/auth/unfollow', {followerUsername: blog?.author?.username, followingUsername: loginInfo?.user?.username})
                .then(response => {
                    getBlog();
                    getUser();
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
            
        }
    }

    const convertStringToHTML = htmlString => {
        const parser = new DOMParser();
        const html = parser.parseFromString(htmlString, 'text/html');
    
        return html.body;
    }

    useEffect(()=>{
        getBlog();
    }, [])

    useEffect(()=>{
        if(blog?.likes?.includes(loginInfo?.user?.username)){
            setLiked(true);
        }
        if(loginInfo){
            const checkUsername = obj => obj.username === blog?.author?.username;
            if(loginInfo?.user?.following?.some(checkUsername)){
                setFollowing(true);
            }
            else{
                setFollowing(false);
            }
        }

    }, [blog])

    useEffect(()=>{
        if(loginInfo){
            const checkUsername = obj => obj.username === blog?.author?.username;
            if(loginInfo?.user?.following?.some(checkUsername)){
                setFollowing(true);
            }
            else{
                setFollowing(false);
            }
        }

    }, [loginInfo])

    function openCommentDiv(){
        commentDiv.current.style.display = "flex";
    }

    function closeCommentDiv(){
        commentDiv.current.style.display = "none";
    }

    return(
        <div className="blog-page-main-main-div">
            {loading ? 
             <Spinner/>: <></>
            }
            <div ref={commentDiv} className="blog-page-comments-main-div">
                <div className="blog-page-comment-div-main-div">
                    <IoCloseSharp onClick={closeCommentDiv} className="comment-close-icon"/>
                    <div className="comment-div-heading">Post Your Comment</div>
                    <div className="comment-div-input-main-div">
                        <input placeholder="Write Your Comment" className="comment-inp" type="text" onChange={(e)=>setComment(e.target.value)}/>
                    </div>
                    <div className="comment-div-input-main-div">
                        <span className="comment-btn-white" onClick={commentBlog}>Post</span>
                    </div>
                </div>
            </div>
            <div className="blog-page-main-div1">
                <div className="blog-page-blog-title1">{blog?.title}</div>
                <div className="blog-page-blog-about-details-div1">
                    <div>
                        <img className="blog-page-user-img1" src={blog?.author?.image} alt="" />
                    </div>
                    <div className="blog-page-user-details-section-1">
                        <div>
                            <span className="blog-page-user-name">{blog?.author?.name}</span>
                            {
                                following ? 
                                    <span onClick={unfollowUser} className="blog-page-following-btn">Following</span>
                                :
                                <span onClick={followUser} className="blog-page-follow-btn">Follow</span>
                            }
                        </div>
                        <BsDot style={{fontSize: 20}}/>
                        <div className="blog-page-blog-date">{blog?.date}</div>
                    </div>
                </div>
                <div className="blog-page-img-div1">
                    <img className="blog-page-img-thumbnail" src={blog?.thumbnail} alt="" />
                </div>
                <div className="blog-page-extra-func-div1">
                        <div style={{display: "flex", alignItems: "center"}}><FaHeart onClick={likeBlog} style={{fontSize: 20, fill: liked?"red":"white", cursor: "pointer"}}/><span style={{fontSize: 16, marginLeft: 5}}>{blog?.likes?.length}</span></div>
                        <div style={{display: "flex", alignItems: "center", marginLeft: 12}}><FaComment onClick={openCommentDiv} style={{fontSize: 18, cursor:"pointer"}}/><span style={{fontSize: 16, marginLeft: 5}}>{blog?.comments?.length}</span></div>
                        <div style={{display: "flex", alignItems: "center", marginLeft: 12}}><FaUsers style={{fontSize: 20}}/><span style={{fontSize: 16, marginLeft: 5}}>{blog?.views}</span></div>
                </div>
                <hr style={{opacity: 0.25, marginTop: 15}}/>
                <div className="blog-page-blog-content-div" dangerouslySetInnerHTML={ { __html: blog?.content}}>
                    
                </div>
            </div>
        </div>
    )
}
export default BlogPage