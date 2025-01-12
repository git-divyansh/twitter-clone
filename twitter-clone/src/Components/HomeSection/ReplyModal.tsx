import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ImageIcon from "@mui/icons-material/Image"
import FmdGoodIcon from "@mui/icons-material/FmdGood"
import TagFacesIcon from "@mui/icons-material/TagFaces"
import { FormikValues, useFormik } from 'formik';
import { useAppDispatch } from '../../Store/store';
import { createTweetReply } from '../../Store/Tweet/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px',
  boxShadow: 24,
  p: 4,
  outline:"none",
  borderRadius : 2
};

function ReplyModal({item, open, handleClose, handleOpen} : {
    item : any;
    open:boolean;
    handleOpen : any;
    handleClose : any;
}) {
  const navigate = useNavigate();  

  const [uploadingImage, setUploadingImage] = React.useState(false);
  
  const [selectedImage, setSelectedImage] = React.useState(null);

  const distpatch = useAppDispatch();


  const handleSelectImage = (event : any) => {
    setUploadingImage(true);
    const imageUrl=event.target.files[0];
    formik.setFieldValue("image", imageUrl);
    setSelectedImage(imageUrl);
    setUploadingImage(false);
  }

  const handleSubmit = (values : FormikValues) => {
    console.log("handleSubmit", values);
    distpatch(createTweetReply(values));
    handleClose();
  }

  const formik = useFormik({
    initialValues: {
        content: "",
        image : "",
        tweetId : item?.id
    },
    onSubmit : handleSubmit
  })

  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="flex space-x-5">
                <Avatar 
                    alt="username" 
                    src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                    className="cursor-pointer"
                    onClick={() => navigate(`/profile/${6}`)}
                />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex cursor-pointer items-center space-x-2">
                            <span className="font-semibold">John Wick</span>
                            <span className="text-gray-600">@johnwick . 2min</span>
                            <img src="https://w7.pngwing.com/pngs/80/808/png-transparent-verified-right-tick-ok-blue-icon-thumbnail.png" alt="" 
                            className="ml-2 w-5 h-5"
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <div onClick={() => navigate(`/tweet/${5}`)} className="cursor-pointer">
                            <p className="mb-2 p-0">nice tweet</p>
                        </div>
                    </div>
                </div>
            </div>
            <section className={`py-10`}>
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
                    </div>
                </div>
            </section>
        </Box>
      </Modal>
    </div>
  );
}

export default ReplyModal
