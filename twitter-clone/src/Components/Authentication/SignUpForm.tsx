import { Button, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { blue } from "@mui/material/colors"
import { useFormik } from "formik"
import { useState } from "react";
import * as Yup from 'yup'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../Store/Auth/Action";
import { useDispatch } from "react-redux";

const curretYear = new Date().getFullYear();
const years = Array.from({length:100}, (_, i) => curretYear-i)
const days = Array.from({length:31}, (_, i) => i + 1)
const months = [
    {value: 1, label:"January"},
    {value: 2, label:"February"},
]
const SignUpForm = () => {

    const dispatch = useDispatch<any>();

    const validationSchema = Yup.object().shape({
        email:Yup.string().email("Invalid email").required("Email is Required"),
        password: Yup.string().required("Password is required")
    })

    const formik = useFormik({
        initialValues:{
            fullName: "",
            email : "",
            password : "",
            dateOfBirth : {
                day : '',
                month : '',
                year : ''
            }
        },
        validationSchema,
        onSubmit:(values : any ) => {
            const {day, month, year} = values.dateOfBirth;
            const dateOfBirth = `${year}-${month}-${day}`
            values.dateOfBirth = dateOfBirth;
            console.log("Form value", values);
            dispatch(registerUser(values));
        }
    })

    const handleDateChange = (name : string) => (event : any) => {
        formik.setFieldValue("dateOfBirth", {
            ...formik.values.dateOfBirth,
            [name] : event.target.value
        })
    }

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    
    const [showPassword, setShowPassword] = useState<boolean>(true);

  return (
    <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>            
            <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        label="fullName"
                        name="fullName"
                        variant="outlined"
                        size="medium"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && typeof formik.errors.fullName === "string" && formik.errors.fullName ? formik.errors.fullName : ""}

                    />
            </Grid> 
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
                            helperText={formik.touched.email && typeof formik.errors.email === "string" && formik.errors.email ? formik.errors.email : ""}
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
                    helperText={formik.touched.password && typeof formik.errors.password === "string" && formik.errors.password ? formik.errors.password : ""}
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
        
        
            <Grid item xs={4}>
                <InputLabel>
                    Day
                </InputLabel>
                <Select name="day" 
                fullWidth
                onChange={handleDateChange("day")}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth.day || ""}>
                    {days.map((day) => 
                    <MenuItem key={day} value={day}>
                        {day}
                    </MenuItem>)}
                </Select>
            </Grid>
            <Grid item xs={4}>
                <InputLabel>
                    Month
                </InputLabel>
                <Select name="month" 
                fullWidth
                onChange={handleDateChange("month")}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth.month || ""}>
                    {months.map((months) => 
                    <MenuItem key={months.value} value={months.label}>
                        {months.label}
                    </MenuItem>)}
                </Select>
            </Grid>
            <Grid item xs={4}>
                <InputLabel>
                    Year
                </InputLabel>
                <Select name="year" 
                fullWidth
                onChange={handleDateChange("year")}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth.year || ""}>
                    {years.map((years) => 
                    <MenuItem key={years} value={years}>
                        {years}
                    </MenuItem>)}
                </Select>
            </Grid>
         
        
            <Grid item xs={12} marginTop={2}>
                <Button sx={{borderRadius:"29px", py:"15px", bgcolor:blue[500]}} 
                type="submit"
                fullWidth 
                variant="contained"
                size="large"
                >Signup</Button>
            </Grid>
        </Grid>
    </form>
  )
}

export default SignUpForm
