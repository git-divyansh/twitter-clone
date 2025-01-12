import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard";
import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../Store/store";
import { findTweetById } from "../../Store/Tweet/Action";
import { useSelector } from "react-redux";

const TweetDetails = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const disptach = useAppDispatch();

    const {id} = useParams();

    const {tweet} = useSelector((state : RootState) => state)

    useEffect(() => {
      if(id){
        disptach(findTweetById(id));
      }
    }, [])
  return (
    <React.Fragment>
      <section className={`bg-white z-50 flex-col items-center sticky top-0 bg-opacity-95`}>

            <KeyboardBackspaceIcon className="cursor-pointer"
                onClick = {handleBack}
            />
            <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Tweet</h1>
            
        <section>
            <TweetCard item={tweet?.tweet}/>
            <Divider sx={{margin: "2rem 0rem"}}/>
        </section>
        <section>
            {
                tweet?.tweet?.replyTweets.map((item : any) => <TweetCard item={item} />)
            }
        </section>
      </section>
    </React.Fragment>
  )
}

export default TweetDetails
