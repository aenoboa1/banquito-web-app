import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import banc from "./../../../assets/banc.jpg";
import PageLayout from 'examples/LayoutContainers/PageLayout';
import "./dise.css";
import { createloginEndpoint, ENDPOINTS } from "../../../api";
import {useNavigate} from "react-router-dom";
import useStateContext from "../../../hooks/useStateContext";

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Ingrese su usuario'),
    password: yup
        .string()
        .required('Ingrese su Contraseña'),
});

const defaultTheme = createTheme();

export default function SignIn() {

    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createloginEndpoint(ENDPOINTS.login).post(
                values
            ).then(
                (res) => {
                    setContext({
                        username: res.data.username,
                        email: res.data.email,
                        token: res.data.token
                    })
                    navigate('/home');
                }).catch(
                (error) => {
                    if (error.response && error.response.data && error.response.data.message === "Invalid credentials") {
                        formik.setStatus('El usuario o la contraseña son incorrectos.');
                    } else {
                        formik.setStatus('Ocurrió un error al iniciar sesión.');
                    }
                }
            )
        },
    });

    return (
        <PageLayout>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://i.ibb.co/PCh8wDG/banc.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: "#ffffff",
                            backgroundSize: '85% auto',
                            backgroundPosition: 'left',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <img src={banc} alt="hyper" height={50} className="mb-3" />
                            <Avatar sx={{ m: 1, bgcolor: 'error' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Iniciar Sesion
                            </Typography>

                            <form onSubmit={formik.handleSubmit} noValidate>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Ingrese su usuario"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    {...formik.getFieldProps('username')}
                                    error={formik.touched.username && formik.errors.username ? true : false}
                                    helperText={formik.touched.username && formik.errors.username ? formik.errors.username : ''}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Ingrese su Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...formik.getFieldProps('password')}
                                    error={formik.touched.password && formik.errors.password ? true : false}
                                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                />

                                {formik.status && <Typography color="error">{formik.status}</Typography>}
                                <Button
                                    type="submit"
                                    color="error"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Ingresar
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Olvidaste tu Contraseña?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href={"sign-up"} variant="body2">
                                            No tienes una cuenta? Solicitala!
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </PageLayout>
    );
}
