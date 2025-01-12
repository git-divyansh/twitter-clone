import { Button, Grid } from '@mui/material'
import TwitterLogo from "../../assets/twitter-logo.jpg";
import { GoogleLogin } from '@react-oauth/google';
import AuthModal from './AuthModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {

  const handleSuccess = () => {

  }

  const handleError = () => {

  }

  const [openAuthModal, setOpenAuthModal] = useState(
    {
      value : false,
      modalName : ""
    }
  );
  const handleOpenAuthModal = (name : string) => setOpenAuthModal(
    {
      value : true,
      modalName : name
    }
  );
  const handleCloseAuthModal = () =>{
    setOpenAuthModal(
      prev => ({...prev, value : false})
    );
  }
  const handleModalNameChange = (name : string) => {
    setOpenAuthModal(
      prev => ({...prev, modalName : name})
    );
  }

  return (
    
    <div>
      <Grid className='overflow-y-hidden' container>
        <Grid className='hidden lg:block' item lg = {7}>
          <img src={TwitterLogo} alt=""  className="w-full h-screen" />
        </Grid>
        <Grid className='px-10' lg={5} item xs={12}>
          <div>
            <h1 className='mt-10 font-bold text-7xl'>Happening Now</h1>
            <h1 className='fon-bold text-3xl py-16'>Join Twitter Today</h1>
            <div className='w-[60%]'>
              <div className='w-full'>
                <GoogleLogin width={"full"} onSuccess={handleSuccess} onError={handleError}/>
                <p className='py-5 text-center'>OR</p>
                <Button 
                onClick={() => handleOpenAuthModal("SIGNUP")}
                fullWidth variant='contained' size='large' sx={{
                  borderRadius:"29px",
                  py:"7px",
                }}>Create Account</Button>
                <p className='text-sm mt-2'>
                  
                </p>
              </div>
              <div>
                <h1 className='flex text-lg font-bold'>Already Have Account?</h1>
                <Button 
                onClick={() => handleOpenAuthModal("SIGNIN")}
                fullWidth variant='outlined' size='large' 
                sx={{
                    borderRadius:"29px",
                    py:"7px",
                  }}>Login to your Account</Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal 
      open={openAuthModal}
      handleClose={handleCloseAuthModal}
      modalNameChange = {handleModalNameChange}
      />
    </div>
  )
}

export default Authentication
