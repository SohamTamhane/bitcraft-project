import './Home.css';
import PinkGradient from "../../Assets/Images/pink_gradient.png";
import YellowGradient from "../../Assets/Images/yellow_gradient.png";
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';
import FeatureCard from './FeatureCard';
import { BsPencilFill } from 'react-icons/bs';
import { GrNotes } from "react-icons/gr";
import VoiceBlogging from "../../Assets/Images/voice_blogging.png";
import GoogleAdsense from "../../Assets/Images/google_ads.png";
import SalesImg from "../../Assets/Images/sales_img.png";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home(){

    const [blogs, setBlogs] = useState(undefined);

    async function getBlogsFunc(){
        await axios.get(process.env.REACT_APP_BASE_URL+'/blog/get-blogs')
        .then(response => {
            let blog1 = response?.data?.blog;
            let blog2 = shuffleArray(blog1);
            setBlogs(blog2.slice(0, 6));
        })
        .catch(error => {
            console.log(error?.response?.data?.message);
        });
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(()=>{
        getBlogsFunc();
    }, [])

    return(
        <div className='home-page-main-div'>
            <div className='home-section1'>
                <img src={PinkGradient} alt="" className='pink-gradient' />
                <img src={YellowGradient} alt="" className='yellow-gradient' />
                <div className='home-section1-header'>
                    Unleash the Power of Your <br />Words with <span className='yellow-span'>BitCraft</span>
                </div>
                <div className='home-section-div home-subsection2'>
                    <span className='home-section1-sub-heading'>Where Creativity meets Technology</span>
                </div>
                <div className='home-section-div home-subsection3'>
                    <Link to='/login' className='website-btn-white'>Start Crafting Now</Link>
                </div>
            </div>
            <div className='home-section2'>
                <div className='home-section-div'>
                    <span className='heading-span heading-span1'><span className='heading-span-color1'>Trending</span> on BitCraft</span>
                </div>
                <div className='trending-blog-main-div'>
                {
                    blogs?.map((blog)=>(
                        <BlogCard link={`/blog/${blog.slug}`} username={blog.author.name} date={blog.date} key={blog.thumbnail} title={blog.title} desc={blog.content} thumbnail={blog.thumbnail} likes={blog.likes.length} views={blog.views}/>
                    ))
                }
                </div>
                <div className='section-btn-div'> 
                    <Link className="nav-btn">Explore More</Link>
                </div>
            </div>
            <div className='home-section3'>
                <div className='home-section-div'>
                    <span className='heading-span heading-span2'><span className='heading-span-color2'>Why</span> BitCraft</span>
                </div>
                <div className='trending-blog-main-div'>
                    <FeatureCard logo={<BsPencilFill className="feature-icon"/>} title="Write With AI" desc="Empower your writing process with AI-powered assistance, drafts blogs to kickstart your creativity."/>
                    <FeatureCard logo={<GrNotes className="feature-icon"/>} title='Blog Summarization' desc="Automatically generate concise summaries for your articles, providing quick insights to Save time and engage readers"/>
                    <FeatureCard logo={<img src={VoiceBlogging} alt='' className="feature-icon feature-img"/>} title='Voice Blogging' desc="Simply dictate your articles, allowing for a seamless and hands-free content creation experience."/>
                </div>
                <div className='trending-blog-main-div feature-cards-div'>
                    <FeatureCard logo={<img src={GoogleAdsense} alt='' className="feature-icon feature-img"/>} title='Google AdSense' desc="Monetize your content effortlessly by integrating Google AdSense with BitCraft"/>
                    <FeatureCard logo={<img src={SalesImg} alt='' className="feature-icon feature-img"/>} title='Analytics' desc="Gain valuable insights into your content's performance with BitCraft's detailed analytics."/>
                    <FeatureCard logo={<GrNotes className="feature-icon"/>} title='Content Creation' desc="Streamline your content creation process with BitCraft's seamless tools and features"/>
                </div>
            </div>

            <div className='home-section3'>
                <div className='home-section-div'>
                    <span className='heading-span heading-span3'><span className='heading-span-color3'>Discover</span> Topics</span>
                </div>
                <div className='trending-blog-main-div'>
                    <span className='discover-topics-span'>Machine Learning</span>
                    <span className='discover-topics-span'>Blockchain</span>
                    <span className='discover-topics-span'>MERN Stack</span>
                    <span className='discover-topics-span'>Python</span>
                    <span className='discover-topics-span'>DSA</span>
                </div>
                <div className='trending-blog-main-div feature-cards-div'>
                    <span className='discover-topics-span'>Programming</span>
                    <span className='discover-topics-span'>Data Science</span>
                    <span className='discover-topics-span'>Artificial Intelligence</span>
                    <span className='discover-topics-span'>Development</span>
                </div>
            </div>
        </div>
    );
}

export default Home;