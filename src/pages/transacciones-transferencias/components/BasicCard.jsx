import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {Modal, styled} from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";



export const BasicCard = () => {
    const [inputValue, setInputValue] = useState(null);
    const [account, setAccount] = useState(null);
    const [show, setShow] = useState(false);
    const [showNot, setShowNot] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [disabledTextF, setDisabledTextF] = useState(false);
    const [trx, setTrx] = useState([]);
    const [valueTrx, setValueTrx] = useState(0);
    const [accountTrx, setAccountTrx] = useState();
    const [value, setValue] = useState("");
    const [Error, setError] = useState("");
    const [result, setResult] = useState([]);
    const [searchAccount, setSearchAccount] = useState([]);
    const [clientAccountName, setClientAccountName] = useState("");
    const [transactions, setTransactions] = useState([]);

    const [open, setOpen] = React.useState(false);

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

    const [sendTrx, setSendTrx] = useState(false);

    const handleChangeSearch = (e) => {
        setInputValue(e.target.value);
        e.preventDefault()
        getAccountInfo(inputValue);
    };

    const getAccountInfo = (value) => {
        axios.get('https://banquito-ws-cuentas-ntsumodxxq-uc.a.run.app/api/v1/account/information/' + value)
            .then(async (response) => {
                if (response.data.codeInternalAccount === value) {
                    setSearchAccount(response.data)
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
        const debtorAccount = searchAccount.codeInternalAccount;
        const transactionType = "DEB";
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
        return (<Grid>
            <Card sx={{p: 1, m: 1}}>
                <CardContent>
                    <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                        <Grid item xs={8}>
                            <Typography sx={{mb: 1.5, lineHeight: '250%'}} color="text.secondary">
                                Propietario: {searchAccount.clientAccount.firstName} {searchAccount.clientAccount.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography sx={{mb: 1.5, lineHeight: '250%'}} color="text.secondary">
                                Saldo Disponible: ${searchAccount.availableBalance}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Divider></Divider>
        </Grid>);
    }

    return (
        <>
            <Grid
                container
                spacing={5}
                direction="column"
                alignItems="center"
                sx={{minHeight: '100vh'}}
            >
                <Grid item xs={6}>
                    <Paper

                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="Validar cuenta"
                            onChange={event => {                                 //adding the onChange event
                                setValue(event.target.value)
                            }}
                        />
                        <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={handleChangeSearch}>
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </Grid>
                {
                    // conditional rendering
                    result.length === 0 ? (
                        <>
                            {Error ? (
                                <>
                                    <Grid item xs={6}>
                                        No se encontro ninguna cuenta con ese número
                                    </Grid>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <Grid item xs={6}>
                                <AccountCard/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    Últimos Movimientos
                                </Typography>
                            </Grid>
                            <Divider/>
                        </>
                    )}

            </Grid>


        </>
    )
}