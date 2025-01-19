import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { Avatar, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModal from "./ProfileModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Store/store";
import { findUserById, followUserAction } from "../../Store/Auth/Action";
import { getUsersTweets } from "../../Store/Tweet/Action";

const Profile = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const dispatch = useAppDispatch();

    const {id} = useParams();

    const {auth, tweet} = useSelector((state : RootState) => state);

    const [openProfileModal, setOpenProfileModal] = useState(false);

    const handleOpenProfileModal = () => {
        console.log("Open profile Modal");
        setOpenProfileModal(true);
    }

    const handleCloseProfileModal = () => {
        console.log("Close profile Modal");
        setOpenProfileModal(false);
    }

    const handleFollowProfileModel = () => {
        if(id)
            dispatch(followUserAction(id));
        console.log("Open follow model");
    }
        
    const [tabValue, setTabValue] = useState('1');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
        if(newValue === '4'){
            console.log("like tweets");
        } else if(newValue === '1'){
            console.log("user tweets");
        }
    };

    useEffect(() => {
        if(id){
            dispatch(findUserById(id));
            dispatch(getUsersTweets(id))
        }
    }, [id])
    
  return (
    <div>
        <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
            <KeyboardBackspaceIcon className="cursor-pointer"
                onClick = {handleBack}
            />
            <h1 className="py-5 text-xl font-bold opacity-90 ml-5">{auth?.findUser?.fullName}</h1>
        </section>
        <section>
            <img src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg" alt="" className="w-[100%] h-[15rem] object-cover"/>
        </section>
        <section className="pl-6">
            <div className="flex justify-between items-start mt-5 h-[5rem]">
                <Avatar 
                    className="transform -translate-y-24"
                    alt="jhon wick" src={auth?.findUser?.image}
                    sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
                />
                { auth.findUser?.req_user ?
                <Button className="rounded-full" variant="contained"
                    sx={{borderRadius: "20px"}} onClick={handleOpenProfileModal}
                >Edit profile</Button>
                :
                <Button className="rounded-full" variant="contained"
                    sx={{borderRadius: "20px"}} onClick={handleFollowProfileModel}
                >{auth?.findUser?.followed ? "unfollow" : "Follow"}</Button>
                }    
            </div>
            <div>
                <div className="flex items-center">
                    <h1 className="font-bold text-lg">{auth?.findUser?.fullName}</h1>
                    { true &&
                    <img src="https://w7.pngwing.com/pngs/80/808/png-transparent-verified-right-tick-ok-blue-icon-thumbnail.png" alt="" 
                        className="ml-2 w-5 h-5"
                    />
                    }
                </div>
                <h1 className="text-gray-500">@{auth?.findUser?.fullName.split(' ').join('_').toLowerCase()}</h1>
            </div>
            <div className="mt-2 space-y-3">
                <p>{auth?.findUser?.bio}</p>
                <div className="py-1 flex space-x-5">
                    <div className="flex items-center text-gray-500">
                        <BusinessCenterIcon />
                        <p className="ml-2">Education</p>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <LocationOnIcon />
                        <p className="ml-2">{auth?.findUser?.location}</p>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <CalendarMonthIcon />
                        <p className="ml-2">Joined Dec 2024</p>
                    </div>
                </div>
                
                <div className="flex items-center space-x-5">
                    <div className="flex items-center space-x-1 font-semibold">
                        <span>{auth?.findUser?.following?.length}</span>
                        <span className="text-gray-500">Following</span>
                    </div>
                    <div className="flex items-center space-x-1 font-semibold">
                        <span>{auth?.findUser?.followers?.length}</span>
                        <span className="text-gray-500">Followers</span>
                    </div>
                </div>
            </div>
        </section>
        <section className="py-5">
        <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
                </TabList>
            </Box>
            <TabPanel value="1">
                {
                    tweet?.tweets.map((item : any) => <TweetCard item={item}/>)
                }
            </TabPanel>
            <TabPanel value="2">
                {
                    tweet?.tweets?.filter((item: any) => item?.user?.id === auth?.user?.id).map((item: any) => <TweetCard item={item}/>)
                }
            </TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
        </TabContext>
        </section>
        <section>
            <ProfileModal 
                open={openProfileModal} 
                handleOpen={handleOpenProfileModal}
                handleClose={handleCloseProfileModal}
            />
        </section>
    </div>
  )
}

export default Profile

