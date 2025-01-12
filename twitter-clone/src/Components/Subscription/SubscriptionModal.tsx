import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const features = [1, 2, 3, 4]

function SubscriptionModal({open, handleOpen, handleClose} : {
    open:boolean
    handleOpen : any,
    handleClose : any
}) {
  const [plan, setPlan] = React.useState("Annually");

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='flex items-center space-x-3'>
                    <IconButton onClick={handleClose} aria-lable="delete">
                    <CloseIcon />
                </IconButton>
            </div>
            <div className='flex justify-center px-10 py-10'>
                <div className='2-[80%] space-y-10'>
                    <div className='p-5 rounded-md flex items-center justify-between shadow-lg bg-slate-400'>
                        <h1 className='text-xl pr-5'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat maxime facere tenetur cupiditate ea, animi expedita quaerat quas ipsum incidunt neque quam corporis eos ratione blanditiis impedit, quo assumenda. Harum!
                        </h1>
                        <img src="https://cdn-icons-png.flaticon.com/512/6928/6928921.png" 
                            className='w-24 h-24'
                        />
                    </div>
                    <div className='flex justify-between border rounded-full px-5 py-3 border-gray-500'>
                        <div>
                            <span className={`${plan === "Annually" ? "text-black" : "text-gray-400"} cursor-pointer`} onClick={()=>setPlan("Annually")}>
                                Annually
                            </span>
                            <span className='text-green-500 text-sm ml-5'>
                                Save 12%
                            </span>
                        </div>
                        <p className={`${plan === "Monthly" ? "text-black" : "text-gray-400"} cursor-pointer`} onClick={()=>setPlan("Monthly")}>
                            Monthly
                        </p>
                    </div>
                    <div className='space-y-3'>
                            {
                                features.map((item, id) =>
                                    
                                    <div key={id} className='flex items-center space-x-5'>
                                        <FiberManualRecordIcon sx={{width:"7", height:"7px"}}
                                            />
                                        <p className='text-xs'>
                                            Lorem ipsum dolor sit amet consectetur {item}.
                                        </p>
                                    </div>
                                    
                            )
                            }
                    </div>

                    <div className='curor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3'>
                        <span className='line-through italic'>$700</span>
                        <span className='px-5'>$508/year</span>
                    </div>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}


export default SubscriptionModal
