import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:1,
  outline:"none"
};

export default function AuthModal({open, handleClose, modalNameChange} : {
    open : {
        value : boolean,
        modalName : string
    },
    handleClose : any,
    modalNameChange : any
}) {

    const navigate = useNavigate();
    function handleNavigate(): void {
        const path = open.modalName === "SIGNUP" ? "/signin" : "/signup";
        modalNameChange(open.modalName === "SIGNUP" ? "SIGNIN" : "SIGNUP")
        navigate(path);
    }
    
  return (
    <div>
      <Modal
        open={open.value}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h1 className='text-center font-bold text-3xl pb-20'>
                {open.modalName === "SIGNUP" ? "Create your account" : "Welcome back"}
            </h1>
            {open.modalName === "SIGNUP" ? <SignUpForm /> : <SignInForm />}
            <h1 className='text-center py-5 font-semibold text-lg text-gray-500'>
                {open.modalName === "SIGNUP" ? "Already have Account" : "If you don't have account"}
            </h1>
            <Button 
            variant="outlined"
            fullWidth
            onClick={handleNavigate}
            sx={{borderRadius: "29px", py:"15px"}}
            >
                {open.modalName === "SIGNUP" ? "Signin" : "Signup"}
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
