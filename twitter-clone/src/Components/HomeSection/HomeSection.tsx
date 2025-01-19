import { Avatar, Button } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useEffect, useState } from "react";

import ImageIcon from "@mui/icons-material/Image"
import FmdGoodIcon from "@mui/icons-material/FmdGood"
import TagFacesIcon from "@mui/icons-material/TagFaces"
import TweetCard from "./TweetCard";
import { RootState, useAppDispatch } from "../../Store/store";
import { createTweet, getAllTweets } from "../../Store/Tweet/Action";
import { useSelector } from "react-redux";
import { uploadToCloudinary } from "../../Utils/uploadToCloudinary";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required")
});

const HomeSection = () => {
  
  const [uploadingImage, setUploadingImage] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | undefined>("");

  const dispatch = useAppDispatch();

  const {tweet} = useSelector((state : RootState) => state);

  const handleSubmit = (values : any, actions : any) => {
    dispatch(createTweet(values))
    actions.resetForm()
    setSelectedImage("")
    console.log("values: ", values)
  }

  useEffect(() => {
    dispatch(getAllTweets());
  }, [tweet?.like, tweet?.retweet, tweet?.replyTweets])
  
  const formik = useFormik({
    initialValues: {
      content : "",
      image: "",
      isTweet: true
    },
    onSubmit: handleSubmit,
    validationSchema
  })

  const handleSelectImage = async (event : any) => {
    setUploadingImage(true);
    const imageUrl= await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imageUrl);
    setSelectedImage(imageUrl);
    setUploadingImage(false);
  }

  return (
    <div className="space-y-5">
      <section className="">
        <h1 className="py-5 text-xl font-bold opacity-90">
          Home
        </h1>
      </section>
      <section className={`pb-10`}>
        <div className="flex space-x-5">
          <Avatar 
            alt="username"
            src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
          />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input 
                  type="text"
                  placeholder="What is happening.."
                  className={`border-none outline-none text-xl bg-transparent`} 
                  {...formik.getFieldProps("content")} 
                />
                {
                  formik.errors.content && formik.touched.content
                    && (
                      <span className="text-red-500">
                        {formik.errors.content}
                      </span>
                    )
                }
              </div>
              {/* <div>
                <img src="" alt="" />
              </div> */}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 ronuded cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]"/>
                    <input type="file" name="imgeFile" className="hidden" onChange={handleSelectImage}/>
                  </label> 
                  <FmdGoodIcon className="text-[#1d9bf0]"/>
                  <TagFacesIcon className="text-[#1d9bf0]"/>
                </div>

                <div>
                  <Button
                  sx={{width:"100%", 
                    borderRadius:"20px", 
                    paddingY:"8px", 
                    paddingX:"20px",
                    bgcolor:'#1e88e5'}}
                  variant='contained'
                  type="submit"
                  >
                    Tweet
                  </Button>
                </div>
              </div>
            </form>
            <div>
              {selectedImage && <img src={selectedImage} alt="" />}
            </div>
          </div>
        </div>
      </section>
      <section>
        {                    
          tweet?.tweets.map((item : any) => <TweetCard item={item}/>)
        }
      </section>
    </div>
  )
}

export default HomeSection
