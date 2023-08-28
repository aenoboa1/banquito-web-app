import '../css/styles.css';
import {Button, Divider, InputLabel, Modal, OutlinedInput, Select, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react'

import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Form, Formik} from "formik";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuItem from "@mui/material/MenuItem";




export const BasicCard = () => {
    const [inputValue, setInputValue] = useState(null);
    const [account, setAccount] = useState('');
    const [debtorAccount, setDebtorAccount] = useState('');
    const [show, setShow] = useState(false);
    const [showNot, setShowNot] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [disabledTextF, setDisabledTextF] = useState(false);
    const [Error, setError] = useState("");
    const [searchAccount, setSearchAccount] = useState([]);
    const [clientAccountName, setClientAccountName] = useState("");
    const [doTrx, setDoTrx] = useState(false);
    const [trx, setTrx] = useState([]);
    const [valueTrx, setValueTrx] = useState(0);
    const [accountTrx, setAccountTrx] = useState();

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        axios.get('https://banquito-ws-cuentas-ntsumodxxq-uc.a.run.app/api/v1/account/information/00138015')
            .then(async (response) => {
                setAccount(response.data)
            })
            .catch((err) => {

            })
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: '16px',
        borderColor: 'secondary.main',
        boxShadow: 24,
        pt: 4,
        px: 6,
        pb: 5,
    };

    const handleOpenModal = () => {
        setOpen(true);
    };
    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleDoTrx = () => {
        setDoTrx(!doTrx);
    }

    const handleChangeSearch = (e) => {
        setInputValue(e.target.value);
        e.preventDefault();
        getAccountInfo(inputValue);
    };

    const handleAccountChange = (e) => {
        setDebtorAccount(e.target.value);
        e.preventDefault();
    }

    const getAccountInfo = (value) => {
        axios.get('https://banquito-ws-cuentas-ntsumodxxq-uc.a.run.app/api/v1/account/information/' + value)
            .then(async (response) => {
                if (response.data.codeInternalAccount === value) {
                    setSearchAccount(response.data)
                    setClientAccountName(response.data.clientAccount.firstName+" "+response.data.clientAccount.lastName)
                    setShowNot(false);
                    setShow(true);
                    setDisabledButton(true);
                    setDisabledTextF(true);
                } else {
                    setShowNot(true);
                    setError(response.statusText)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const submitTransfer = (trx) => {
        const {cuenta, monto, referencia} = trx;
        const debtorAccount = account.codeInternalAccount;
        const transactionType = "CRED";
        const transaction = {
            creditorAccount: cuenta,
            debtorAccount: debtorAccount,
            transactionType: transactionType,
            transactionAmount: monto,
            parentTransactionKey: null,
            amount: monto,
            reference: referencia

        }
        axios.post('https://banquito-ws-cuentas-ntsumodxxq-uc.a.run.app/api/v1/account-transaction',transaction)
            .then(async (response) => {
                if(response.status === 200){
                    setOpen(true)
                }
            }).catch((err) => {
            console.log(err);

        })
    }

    function ChildModal() {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
            submitTransfer(trx);
        };
        const handleClose = () => {
            setOpen(false);
            handleCloseModal();
        };

        return (
            <React.Fragment>
                <Button onClick={handleOpen}>CONFIRMAR</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{...style, width: 400, p: 2, m: 1}}>
                        <h3 id="child-modal-title">Transferencia realizada con éxito!</h3>
                        <Button onClick={handleClose}>Cerrar</Button>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }


    const AccountCard = () => {
        return (<Card sx={{
            minWidth: 500, ':hover': {
                boxShadow: 5,
            }
        }}>
            <Box sx={{width: '100%', maxWidth: 580, bgcolor: 'background.paper'}}>
                <Box sx={{my: 1, mx: 2}}>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={4}>
                            <Typography sx={{fontSize: 16}} gutterBottom>
                                <Box sx={{textAlign: 'left', m: 1}}>Propietario:</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{fontSize: 16}} gutterBottom>
                                <Box sx={{flexDirection: 'row-reverse', m:1}}>
                                    {clientAccountName}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{my: 1, mx: 2}}>
                    <Grid container spacing={1} columns={16}>
                        <Grid item xs={4}>
                            <Typography sx={{fontSize: 16}} gutterBottom>
                                <Box sx={{textAlign: 'left', m: 1}}>Cuenta:</Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{my: 0, mx: 2}}>
                    <Grid container spacing={1} columns={16}>
                        <Grid item xs={12}>
                            <Typography sx={{fontSize: 16}} color="text.secondary" gutterBottom variant="button">
                                <Box sx={{textAlign: 'left', m: 1}}>{
                                    searchAccount.productAccount === 'BASIC CURRENT BUSINESS ACCOUNT' ? 'Ahorro' : 'Corriente'
                                }</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{fontSize: 16}} gutterBottom>
                                <Box sx={{textAlign: 'left', m: 1}}>
                                    {searchAccount.codeInternalAccount}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle" color="#ad1414" sx={{height: 3}}/>
                <Box sx={{ justifyContent:'center', p:1,m:1}}>
                    <Grid container >
                       <Grid item sx={{ mx:'auto'}}>
                           <Button variant="contained" color="primary" startIcon={<AttachMoneyIcon />} onClick={handleDoTrx}>
                               Transferir
                           </Button>
                       </Grid>
                    </Grid>
                </Box>
            </Box>
        </Card>
        );
    }

    const TransferForm = () => {
        return (
            <Formik
                initialValues={{
                    cuenta: searchAccount.codeInternalAccount,
                    monto: '',
                    referencia: '',

                }}
                validate={(values) => {
                    let errors = {};
                    if (!values.cuenta) {
                        errors.cuenta = 'cuenta requerida!';
                    }
                    if (!values.monto) {
                        errors.monto = 'monto requerido!';
                    }
                    if (!values.referencia) {
                        errors.referencia = 'referencia requerida!';
                    }
                    return errors;
                }}
                onSubmit={(values, {resetForm}) => {
                    resetForm();
                    console.log(values);
                    setTrx(values);
                    setAccountTrx(searchAccount.codeInternalAccount);
                    setValueTrx(values.monto)
                    handleOpenModal();
                }}
            >
                {({errors, values, handleChange}) => (
                    <Box>
                        <Grid container sx={{justifyContent: 'center'}}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        Realizar Transferencia
                                    </Typography>
                                    <Box>
                                        <Form>
                                            <FormControl sx={{p: 1, m: 1, display: 'block'}}>
                                            <InputLabel id="cuentaLbl">Cuenta Origen</InputLabel>
                                            <Select fullWidth
                                                    labelId="cuentaLbl"
                                                    id='cuenta'
                                                    name="cuenta"
                                                    value={debtorAccount}
                                                    label="Cuenta de Origen"
                                                    onChange={handleAccountChange}
                                            >
                                                <MenuItem key={account.codeInternationalAccount}
                                                          value={account.codeInternalAccount}>{account.productAccount === 'BASIC CURRENT BUSINESS ACCOUNT' ? 'Ahorro' : 'Corriente'} - {account.codeInternalAccount}</MenuItem>
                                            </Select>
                                        </FormControl>
                                            <FormControl sx={{p: 1, m: 1, display: 'block'}}>
                                                <InputLabel htmlFor="monto" size="small">Monto</InputLabel>
                                                <OutlinedInput fullWidth id="monto" name="monto"
                                                               onChange={handleChange} value={values.monto}/>
                                                <ErrorMessage name="monto" component={() => (<FormHelperText
                                                    id="component-error-text">{errors.monto}</FormHelperText>)}/>
                                            </FormControl>
                                            <FormControl sx={{p: 1, m: 1, display: 'block'}}>
                                                <InputLabel htmlFor="referencia" size="small">Referencia</InputLabel>
                                                <OutlinedInput fullWidth id="referencia" name="referencia"
                                                               onChange={handleChange}
                                                               value={values.referencia}/>
                                                <ErrorMessage name="referencia" component={() => (<FormHelperText
                                                    id="component-error-text">{errors.referencia}</FormHelperText>)}/>
                                            </FormControl>
                                            <Box sx={{flexGrow: 1, justifyContent: 'center'}}>
                                                <Grid container spacing={2} columns={16}>
                                                    <Grid item xs={8}>
                                                        <Button type="submit" variant="contained"
                                                                color="primary">Transferir</Button>
                                                        <Modal
                                                            open={open}
                                                            onClose={handleCloseModal}
                                                            aria-labelledby="parent-modal-title"
                                                            aria-describedby="parent-modal-description"
                                                        >
                                                            <Box sx={{...style, width: 400}}>
                                                                <h2 id="parent-modal-title">Detalles de
                                                                    transferencia</h2>
                                                                <p id="parent-modal-description">
                                                                    Vas a transferir $ {valueTrx} a la
                                                                    cuenta {accountTrx}.
                                                                    Desea continuar?
                                                                </p>
                                                                <Box sx={{
                                                                    justifyContent: 'center',
                                                                    display: 'block',
                                                                    p: 1,
                                                                    m: 1
                                                                }}>
                                                                    <ChildModal/>
                                                                    <Button variant="filled" color="secondary"
                                                                            onClick={handleCloseModal}>Cerrar</Button>
                                                                </Box>
                                                            </Box>
                                                        </Modal>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Form>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Box>
                )}
            </Formik>
        )
    }



    return (
        <Grid
            container
            spacing={2}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 1,
                width: 1
            }}
        >

            <Grid item>
                <TextField
                    id="outlined-basic"
                    label="Cuenta"
                    variant="outlined"
                    size="small"
                    value={inputValue}
                    onChange={handleChangeSearch}
                    inputProps={{maxLength: 10}}
                    disabled={disabledTextF}
                />
            </Grid>
            <Grid item>
                <Button sx = {{marginLeft: '1rem'}}
                    className='buttonSearch'
                    variant="contained"
                    size="medium"
                    onClick={handleChangeSearch}
                    disabled={disabledButton}
                >
                    Validar
                </Button>
            </Grid>
            <Divider></Divider>
            <Grid sx={{m:1, p:1}}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{marginTop: "2rem"}}
            >
                {show ? <AccountCard/> : <></>}
            </Grid>
            {doTrx ? <TransferForm/> : <></>}
        </Grid>
    );
}