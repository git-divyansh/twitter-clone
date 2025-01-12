import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { loginUser } from "../../Store/Auth/Action"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch } from "../../Store/store"

const validationSchema = Yup.object().shape({
    email:Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is required")
})

const SignInForm = () => {

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues:{
            email : "",
            password : "",
        },
        validationSchema,
        onSubmit:(values) => {
            dispatch(loginUser(values));
            console.log("Form value", values);
        }
    })

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const [showPassword, setShowPassword] = useState<boolean>(true);
    
  return (
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    size="medium"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    fullWidth
                    type={showPassword ? "password" : "text"}
                    label="Password"
                    name="password"
                    variant="outlined"
                    size="medium"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid className="mt-20" item xs={12}>
                <Button sx={{borderRadius:"29px", py:"15px", bgcolor:blue[500]}} 
                type="submit"
                fullWidth 
                variant="contained"
                size="large"
                >Signin</Button>
            </Grid>
        </Grid>
    </form>
  )
}

export default SignInForm
