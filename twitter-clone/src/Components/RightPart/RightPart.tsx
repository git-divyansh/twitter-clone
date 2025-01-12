import SearchIcon from "@mui/icons-material/Search"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Button } from "@mui/material";
import SubscriptionModal from "../Subscription/SubscriptionModal";
import { useState } from "react";

const RightPart = () => {

    const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
    
        const handleOpenSubscriptionModal = () => {
            console.log("Open Subscription Modal");
            setOpenSubscriptionModal(true);
        }
    
        const handleCloseSubscriptionModal = () => {
            console.log("Close Subscription Modal");
            setOpenSubscriptionModal(false);
        }

    const handleChangeTheme = () => {
        console.log("Handle change theme");
        
    }

  return (
    <div className="py-5 sticky top-0">
        <div className="relative flex items-center">
            <input type="text" className="py-3 rounded-full outline text-gray-500 w-full pl-12" />
            <div className="absolute top-0 left-0 pl-3 pt-3">
                <SearchIcon className="text-gray-500"/>
            </div>
            <Brightness4Icon onClick = {handleChangeTheme} className="ml-3 cursor-pointer"/>
        </div>
        <section className="my-5">
            <h1 className="text-xl font-bold">Get Verified</h1>
            <h1 className="font-bold my-2">Subscibe to unlock new features</h1>
            <Button variant="contained" sx={{padding:"10px", paddingX: "20px", borderRadius:"25px"}} onClick={handleOpenSubscriptionModal}>
                Get Verified
            </Button>
        </section>
        <section className="mt-7 space-y-5">
            <h1 className="font-bold text-xl py-1">What's happening</h1>
            <div>
                <p className="text-sm">Premire League . LIVE</p>
                <p className="font-bold">Man Utd. vs Man City</p>
            </div>
            { [1, 1, 1, 1].map((item, id) =>
            <div key={id} className="flex justify-between w-full">
                <div>
                    <p className="">Entertainment . Trending</p>
                    <p className="font-bold">#TheMarvels</p>
                    <p>43.3k Tweets</p>
                </div>
                <MoreHorizIcon />
            </div>
            )}
        </section>
        <section>
            <SubscriptionModal
                open = {openSubscriptionModal}
                handleClose={handleCloseSubscriptionModal}
                handleOpen={handleOpenSubscriptionModal}
            />
        </section>
    </div>
  )
}

export default RightPart
