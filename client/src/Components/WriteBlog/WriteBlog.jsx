import { useContext, useEffect, useState } from "react";
import  ReactQuill  from  "react-quill";
import "react-quill/dist/quill.snow.css";
import "./WriteBlog.css";

import { BiSolidImageAdd } from "react-icons/bi";
import { Context } from "../../config/Context";

import axios from "axios";
import Spinner from "../Spinner";

function WriteBlog(){
    
    const {loginInfo} = useContext(Context);

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    // const [status, setStatus] = useState("Draft");
    
    const [loading, setLoading] = useState(false);
    
    const  modules  = {
        toolbar: [
            // [{ font: [] }], 
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            // ["link", "image", "video"],
            ["link"],
            ["clean"],
        ],
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageURL(URL.createObjectURL(event.target.files[0]));
    }

    function saveAsDraftFunc(){
        // setStatus("Draft");
        handleUpload("Draft");
    }

    function saveAsPublishFunc(){
        // setStatus("Published");
        handleUpload("Published");
    }

    async function handleUpload(status){
        setLoading(true);
        if(title==="" || value==="" || selectedFile===null || value==="<p><br></p>"){
            setLoading(false);
            alert("Please Fill All the Details to Save the Blog")
        }
        else{

            let slug1 = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            let slug = loginInfo?.user?.username + "/" + slug1;

            const formData = new FormData();
            formData.append('thumbnail', selectedFile);
            formData.append('title', title);
            formData.append('content', value);
            formData.append('author', loginInfo?.user?.email);
            formData.append('status', status);
            formData.append('slug', slug);
        
            await axios.post(process.env.REACT_APP_BASE_URL+'/blog/write', formData)
            .then(response => {
                setLoading(false);
                alert("Blog Created Successfully !!");
            })
            .catch(error => {
                setLoading(false);
                alert(error?.response?.data?.message);
            });
        }
    }
    
  return (
    <div className="write-blog-page-main-div">
        {loading ? 
             <Spinner/>: <></>
        }
        {
            loginInfo?.status ?

        <div className="wrapper">
            <div className="write-blog-page-title1">
                Write Your Blog
            </div>
            <div className="write-blog-text-field-inp-div1">
                <input onChange={(e)=>setTitle(e.target.value)} placeholder="Write the Title for Your Blog" className="write-blog-text-field-inp" type="text" />
            </div>
            <div className="write-blog-text-field-inp-div1">
                <div style={{position: "relative"}}>
                    <div className="write-blog-add-image-div11">
                        <BiSolidImageAdd className="react-icons-font-35" />
                        <div className="write-blog-label-text1">Add Thumbnail for your Blog</div>
                    </div>
                    <input type="file" onChange={handleFileChange} accept="image/*" className="thumbnail-inp-input-field1"/>
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 25}}>
                {
                    imageURL?
                    <img src={imageURL} className="write-blog-preview-img1" alt="" />
                    : <></>
                }
            </div>
            <div className="editor">
                <ReactQuill
                    modules={modules} 
                    theme="snow" 
                    onChange={setValue} 
                    placeholder="Craft Your Ideas Here.."
                />
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <span onClick={saveAsDraftFunc} className="nav-btn">Save as Draft</span>
                <span onClick={saveAsPublishFunc} className="nav-btn white-bg">Publish Blog</span>
            </div>
        </div>
        :
        <div className="error-msg-div1">
            Login to Craft Your Content
        </div>
        }
    </div>
  );
};

export default WriteBlog;