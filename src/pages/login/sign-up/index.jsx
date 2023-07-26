import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import banc from "./../../../assets/banc.jpg";
import PageLayout from 'examples/LayoutContainers/PageLayout';
import axios from "axios";
import { Formik, Field, Form } from 'formik';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Banquito
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {



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
                ¡Empecemos!
                Ingresa tus datos
              </Typography>


              <Formik
                initialValues={{
                  email: '', cedula: '',
                  user: '', 
                  password: '',
                }}
                onSubmit={data => {
                  console.log(data);

                  createAPIEndpoint(ENDPOINTS.accounts).fetch()
                    .then(function (res) {
                      for (let item of res.data) {
                        console.log(item)
                        if ("admin" === data.user && "123" === data.password) {
                          window.location.href = '/home';
                        } else {

                        }

                      }


                    })
                    .catch(function (res) {
                      console.log(res)
                    });
                }}

              >

                <Form component="form" noValidate sx={{ mt: 1 }}>


                  <Field as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Ingrese tu correo"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Field as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="cedula"
                    label="Ingresa tu cedula"
                    type="text"
                    id="cedula"
                    autoComplete="current-password"
                  />


                  <Field as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="user"
                    label="Ingrese un usuario"
                    name="user"
                    autoComplete="user"
                    autoFocus
                  />
                  <Field as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Ingresa una Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />

                  <Button
                    type="onSubmit"
                    color="error"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Enviar
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="sign-in" variant="body2">
                        Ya tienes una cuenta? Ingresa!
                      </Link>
                    </Grid>
                    <Grid item>

                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Form>
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </PageLayout>
  );
}