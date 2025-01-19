import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormikValues, useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';

import CloseIcon from "@mui/icons-material/Close";
import "./ProfileModal.css"
import { RootState, useAppDispatch } from '../../Store/store';
import { updateUserProfile } from '../../Store/Auth/Action';
import { uploadToCloudinary } from '../../Utils/uploadToCloudinary';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:"none"
};

function ProfileModal({open, handleOpen, handleClose} : {
    open:boolean
    handleOpen : any,
    handleClose : any
}) {
    
  const disptach = useAppDispatch();
  const [uploading, setUploading] = React.useState(false);

  const [selectedImage, setSelectedImage] = React.useState<string | undefined>("");

  const {auth} = useSelector((state : RootState) => state);

  const clearForm = () => {
    formik.setFieldValue("fullName", "");
    formik.setFieldValue("website", "");
    formik.setFieldValue("location", "");
    formik.setFieldValue("bio", "");
    formik.setFieldValue("backgroundImage", "");
    formik.setFieldValue("image", "");
    handleClose();
  }

  const handleSubmit = (values : FormikValues) => {
    disptach(updateUserProfile(values));
    setSelectedImage("");
    clearForm();
    console.log("values :", values);
  }

  const handleImageChange = async (event : any) => {
    setUploading(true)
    const {name} = event.target;
    const file = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue(name, file);
    setSelectedImage(file);
    setUploading(false);
  }

  const formik = useFormik({
    initialValues:{
        fullName: auth.user?.fullName,
        website: auth.user?.website,
        location: auth.user?.location,
        bio: auth.user?.bio,
        backgroundImage: auth.user?.backgroundImage,
        image: auth.user?.image
    },
    onSubmit: handleSubmit
  })

  return (
    <div>

      <Modal
        open={open}
        onClose={clearForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center space-x-3'>
                    <IconButton onClick={clearForm} aria-lable="delete">
                        <CloseIcon />
                    </IconButton>
                    <p className='text-sm'>Edit Profile</p> 
                </div>
                <Button type='submit'>Save</Button>
            </div>
            <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh] border-radius'>
                <div>
                    <>  
                        <div className='w-full'>
                            <div className='relative'>
                                <img src="https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg" className='w-full h-[12rem] object-cover object-center'/>
                                <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' name='backgroundImage'
                                onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                            <div className='relative'>
                                <Avatar 
                                    className=""
                                    alt={auth.user?.fullName} src={selectedImage || auth.user?.image}
                                    sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
                                    />
                                    <input type="file" 
                                    name='image' className='absolute top-0 left-0 w-[10rem] h-full opacity-0' onChange={handleImageChange} />
                            </div>
                        </div>
                    </>
                </div>
                <div className='space-y-3'>
                    <TextField 
                        fullWidth
                        id="fullName"
                        name='fullName'
                        label="Full Name"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                    <TextField 
                        fullWidth
                        multiline
                        rows={4}
                        id="bio"
                        name='bio'
                        label="Bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        error={formik.touched.bio && Boolean(formik.errors.bio)}
                        helperText={formik.touched.bio && formik.errors.bio}
                    />
                    <TextField 
                        fullWidth
                        id="website"
                        name='website'
                        label="Website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                    <TextField 
                        fullWidth
                        id="location"
                        name='location'
                        label="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        error={formik.touched.location && Boolean(formik.errors.location)}
                        helperText={formik.touched.location && formik.errors.location}
                    />
                    <div className='my-3'>
                        <p className='text-lg'>Birth date . Edit</p>
                        <p className='text-2xl'>October 26, 1999</p>
                    </div>
                    <p className='py-3 text-lg'>Edit professional profile</p>
                </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileModal
