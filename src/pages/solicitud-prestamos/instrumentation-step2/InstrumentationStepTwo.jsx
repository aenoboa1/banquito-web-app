import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Numbers, AddCircle,
} from '@mui/icons-material';
import { Box, Divider, Grid, InputAdornment, TextField } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useNavigate } from 'react-router-dom';
import SoftButton from "../../../components/SoftButton";
import SoftTypography from "../../../components/SoftTypography";
import SoftBox from "../../../components/SoftBox";

const validationSchema = yup.object({
    identificationNumber: yup.string().required('El número de identificación es requerido.'),
    // typeClient: yup.string().required('Seleccione un cliente.'),
    // typeDocumentId: yup.string().required('Seleccione un tipo de documento.'),
    accountNumber: yup.string().required('El número de cuenta es requerido.'),
});


const InstrumentationStepTwo = () => {

    const navigate = useNavigate();
    const [selectedTypeClient, setSelectedTypeClient] = useState('');
    const [selectedTypeDocumentId, setSelectedTypeDocumentId] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [clientInfo, setClientInfo] = useState([]);
    const [infoAccount, setInfoAccount] = useState(null);
    const [infoClientAccount, setInfoClientAccount] = useState(null);
    const [flagAccount, setFlagAccount] = useState(true);
    const [flagClientNat, setFlagClientNat] = useState(true);

    const typeClients = [
        { value: 'CUS', label: 'Naturales' },
        { value: 'GCO', label: 'Jurídicos' },
    ];

    const documentTypesCUS = [
        { value: 'CID', label: 'Cédula' },
        { value: 'PAS', label: 'Pasaporte' },
        { value: 'RUC', label: 'RUC' },
    ];

    const documentTypesGCO = [
        { value: 'RUC1', label: 'RUC1' },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            identificationNumber: '',
            typeClient: '',
            typeDocumentId: '',
            accountNumber: '',
        },
    });

    const onSubmit = (data) => {
        console.log("DATA --> ", data);

    };

    const handleSearchCustomers = () => {
        createAPIEndpoint(ENDPOINTS.customers)
            .fetchByTypeDocumentAndDocumentId(selectedTypeDocumentId, identificationNumber)
            .then((res) => {
                console.log(res.data);
                setClientInfo(res.data);
                setFlagClientNat(true);
            })
            .catch((error) => {
                console.error(error);
                setClientInfo([]);
                setFlagClientNat(false);
                return [];
            });
    };

    const handleSearchAccount = () => {
        createAPIEndpoint(ENDPOINTS.account)
            .fetchByCodeInternalAccount(accountNumber)
            .then((res) => {
                console.log("Cuenta", res.data);
                console.log("Info Cliente", res.data.clientAccount);
                setInfoAccount(res.data);
                setInfoClientAccount(res.data.clientAccount);
                setFlagAccount(true);
            })
            .catch((error) => {
                console.error(error);
                setInfoAccount(null);
                setInfoClientAccount(null);
                setFlagAccount(false);
                return [];
            });
    };

    const handleNextStep = () => {
        navigate("/prestamos/step3");
    };

    const handleTypeClientChange = (event) => {
        setSelectedTypeClient(event.target.value);
    };

    const handleTypeDocumentIdChange = (event) => {
        setSelectedTypeDocumentId(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SoftTypography variant="h5" component="div" align='center'>
                        Instrumentación
                    </SoftTypography>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        type="text"
                        id="accountNumber"
                        label="Número de Cuenta"
                        {...register("accountNumber")}
                        value={accountNumber}
                        onChange={(event) => setAccountNumber(event.target.value)}
                        error={Boolean(errors.accountNumber)}
                        helperText={errors.accountNumber?.message}
                        inputProps={{ style: { textAlign: 'left' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    {
                        (infoAccount != null && infoClientAccount != null) ? (
                            <SoftTypography variant="h5" component="div" align='center'>
                                Cuenta Encontrado
                            </SoftTypography>
                        ) : (<></>)
                    }
                </Grid>


                <Grid item xs={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <SoftButton color="primary" variant="contained" onClick={handleSearchAccount}>
                                Buscar Cuenta
                            </SoftButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                    {
                        infoAccount === null && infoClientAccount === null && !flagAccount ? (
                            <Grid container style={{ position: 'relative' }}>
                                <Grid item xs={12} sm={4} lg={12} xl={8}
                                    style={{ position: 'absolute', top: -40, left: "30%", padding: '10px', zIndex: 1 }}>
                                    <SoftBox p={2} borderRadius="10%" shadow={"sm"}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8} md={8}>
                                                <SoftTypography component="span" fontWeight="light"
                                                    fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                                                    <strong>No existe la cuenta</strong><br />
                                                </SoftTypography>
                                            </Grid>
                                        </Grid>
                                    </SoftBox>
                                </Grid>
                            </Grid>
                        ) : (
                            infoAccount !== null && infoClientAccount !== null ? (
                                <Grid container style={{ position: 'relative' }}>
                                    <Grid item xs={12} sm={4} lg={12} xl={8}
                                        style={{ position: 'absolute', top: -40, left: "30%", padding: '10px', zIndex: 1 }}>
                                        <SoftBox p={2} borderRadius="10%" shadow={"sm"}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8} md={8}>
                                                    <SoftTypography component="span" fontWeight="light"
                                                        fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                                                        <strong>Nombre y Apellido:</strong> {infoClientAccount.firstName} {infoClientAccount.lastName} <br />
                                                    </SoftTypography>
                                                    <SoftTypography component="span" fontWeight="light"
                                                        fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                                                        <strong>Email:</strong> {infoClientAccount.emailAddress} <br />
                                                    </SoftTypography>
                                                    <Box display="flex" flexDirection="column" gap={2} py={0}>
                                                        <Grid container spacing={1}>
                                                            <Grid item xs={6} md={10}>
                                                                <SoftTypography component="span" fontWeight="bold" fontSize="14px">
                                                                    Saldo disponible:
                                                                </SoftTypography>
                                                            </Grid>
                                                            <Grid item xs={6} md={1}>
                                                                <SoftTypography component="span" fontWeight="light" fontSize="14px">
                                                                    ${infoAccount.totalBalance}
                                                                </SoftTypography>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </SoftBox>
                                    </Grid>
                                </Grid>
                            ) : <></>
                        )}
                </Grid>

                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <Divider color='#DDDDDD' />
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Controller
                        name="typeClient"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Tipo de Usuario"
                                {...register("typeClient")}
                                value={selectedTypeClient}
                                onChange={handleTypeClientChange}
                            // error={Boolean(errors.typeClient)}
                            // helperText={errors.typeClient?.message}
                            >
                                {typeClients.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={8}>
                    {
                        clientInfo.length === 0 && !flagClientNat ? (<></>
                        ) : (
                            clientInfo.length != 0 ? (
                                <SoftTypography variant="h5" component="div" align='center'>
                                    Usuario Encontrado
                                </SoftTypography>
                            ) : (<></>)
                        )}
                </Grid>


                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Controller
                        name="typeDocumentId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                select
                                label="Tipo de Documento"
                                {...register("typeDocumentId")}

                                value={selectedTypeDocumentId}
                                onChange={handleTypeDocumentIdChange}
                            // error={Boolean(errors.typeDocumentId)}
                            // helperText={errors.typeDocumentId?.message}
                            >
                                {
                                    selectedTypeClient === 'CUS' ? (
                                        documentTypesCUS.map((type) => (
                                            <MenuItem key={type.value} value={type.value}>
                                                {type.label}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        documentTypesGCO.map((type) => (
                                            <MenuItem key={type.value} value={type.value}>
                                                {type.label}
                                            </MenuItem>
                                        ))
                                    )
                                }
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={8}>
                    {
                        clientInfo.length === 0 && !flagClientNat ? (
                            <Grid container style={{ position: 'relative' }}>
                                <Grid item xs={12} sm={4} lg={12} xl={8}
                                    style={{ position: 'absolute', top: -30, left: "30%", padding: '10px', zIndex: 1 }}>
                                    <SoftBox p={3} borderRadius="10%" shadow={"sm"}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8} md={8}>
                                                <SoftTypography component="span" fontWeight="light"
                                                    fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                                                    <strong>No existe el cliente</strong><br />
                                                </SoftTypography>
                                            </Grid>
                                        </Grid>
                                    </SoftBox>
                                </Grid>
                            </Grid>
                        ) : (
                            clientInfo.length != 0 ? (
                                <Grid container style={{ position: 'relative' }}>
                                    <Grid item xs={12} sm={4} lg={12} xl={8}
                                        style={{ position: 'absolute', top: -30, left: "30%", padding: '10px', zIndex: 1 }}>
                                        <SoftBox p={3} borderRadius="10%" shadow={"sm"}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8} md={8}>
                                                    <SoftTypography component="span" fontWeight="light"
                                                        fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                                                        <strong>Nombre y Apellido:</strong> {clientInfo[0].firstName} {clientInfo[0].lastName} <br />
                                                    </SoftTypography>
                                                    <SoftTypography component="span" fontWeight="light"
                                                        fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                                                        <strong>Email:</strong> {clientInfo[0].emailAddress} <br />
                                                    </SoftTypography>
                                                    <SoftTypography component="span" fontWeight="light"
                                                        fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                                                        <strong>Género:</strong> {clientInfo[0].gender === 'M' ? 'Masculino' : 'Femenino'}
                                                    </SoftTypography>
                                                </Grid>
                                            </Grid>
                                        </SoftBox>
                                    </Grid>
                                </Grid>
                            ) : <></>
                        )}
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        type="text"
                        id="identificationNumber"
                        label="Número de Identificación"
                        {...register("identificationNumber")}
                        value={identificationNumber}
                        onChange={(event) => setIdentificationNumber(event.target.value)}
                        error={Boolean(errors.identificationNumber)}
                        helperText={errors.identificationNumber?.message}
                        inputProps={{ style: { textAlign: 'left' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={8}></Grid>

                <Grid item xs={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <SoftButton color="primary" variant="contained" onClick={handleSearchCustomers}>
                                Buscar Cliente
                            </SoftButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}></Grid>

                <Grid item xs={8}></Grid>
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={9}>
                            <SoftButton color={"primary"} variant={"contained"} fullWidth
                                onClick={handleNextStep}>
                                Siguiente Paso
                            </SoftButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </form >
    );
}



export default InstrumentationStepTwo; 