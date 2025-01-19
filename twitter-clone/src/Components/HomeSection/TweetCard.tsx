import RepeatIcon from "@mui/icons-material/Repeat"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import BarChartIcon from "@mui/icons-material/BarChart"

import { Avatar, Button, MenuItem, Menu } from "@mui/material"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ReplyModal from "./ReplyModal"
import { useAppDispatch } from "../../Store/store"
import { createReTweet, likeTweet } from "../../Store/Tweet/Action"


const TweetCard = ({item} : {item:any}) => {
    const navigate = useNavigate();

    const [openReplyModal, setOpenReplyModal] = useState(false);

    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

    const handleDeleteTweet = () => {
        console.log("Tweet Deleted");
        
        handleClose();
    }

    const handleEditTweet = () => {
        console.log("Tweet Edit");
        
    }

    const handleOpenReplyModal = () => {
        setOpenReplyModal(true);
    }

    const handleCloseReplyModal = () => {
        setOpenReplyModal(false);
        
    }

    const handleCreateRetweet = () => { 
        console.log("Create Retweet");
        dispatch(createReTweet(item?.id))
    }

    const handleLikeTweet = () => {
        console.log("Like Tweet");
        dispatch(likeTweet(item?.id))
    }

  return (
    <React.Fragment>
        {/* <div className="flex items-center font-semibold text-gray-700 py-2">
            <RepeatIcon />
            <p>You Retweet</p>
        </div> */}

        <div className="flex space-x-5"
        >
            <Avatar 
                alt="username" 
                src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                className="cursor-pointer"
                onClick={() => navigate(`/profile/${item?.user?.id}`)}
            />
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <div className="flex cursor-pointer items-center space-x-2">
                        <span className="font-semibold">{item?.user?.fullName}</span>
                        <span className="text-gray-600">{item?.user?.fullName.split(' ').join('_').toLowerCase()}</span>
                        <img src="https://w7.pngwing.com/pngs/80/808/png-transparent-verified-right-tick-ok-blue-icon-thumbnail.png" alt="" 
                        className="ml-2 w-5 h-5"
                        />
                    </div>
                    <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        >
                        <MoreHorizIcon />
                        </Button>
                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        >
                        <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                        <MenuItem onClick={handleEditTweet}>Edit</MenuItem>
                        </Menu>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="cursor-pointer" onClick={() => navigate(`/tweet/${item?.id}`)}>
                        <p className="mb-2 p-0">{item?.content}</p>
                        {item?.image ?
                            <img 
                                className="w-[35rem] border border-gray-400 p-5 rounded-md"
                                src={item?.image} alt="" />
                                : null
                        }
                    </div>
                    <div className="py-5 flex flex-wrap justify-between items-center">
                        <div className="space-x-3 flex items-center text-gray-600">
                            <ChatBubbleOutlineIcon 
                                className="cursor-pointer"
                                onClick={handleOpenReplyModal}
                            />
                            <p>{item?.totalReplies}</p>
                        </div>
                        <div className={`${item?.retweet ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                            <RepeatIcon 
                                className="cursor-pointer"
                                onClick = {handleCreateRetweet}    
                            />
                            <p>{item?.totalRetweets}</p>
                        </div>
                        <div className={`${item?.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                            { !item?.liked ? < FavoriteBorderIcon
                                className="cursor-pointer"
                                onClick = {handleLikeTweet}    
                                /> :
                                <FavoriteIcon
                                    onClick={handleLikeTweet}
                                    className="cursor-pointer"
                                />
                            }
                            <p>{item?.totalLikes}</p>
                        </div>
                        <div className="space-x-3 flex items-center text-gray-600">
                            <BarChartIcon 
                                className="cursor-pointer"
                                onClick={handleOpenReplyModal}
                            />
                            <p>43</p>
                        </div>
                        <div className="space-x-3 items-center text-gray-600">
                            <FileUploadIcon 
                                className="cursor-pointer"
                                onClick={handleOpenReplyModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section>
            <ReplyModal
                item = {item}
                open = {openReplyModal}
                handleClose={handleCloseReplyModal}
                handleOpen={handleOpenReplyModal}
            />
        </section>
    </React.Fragment>
  )
}

export default TweetCard
