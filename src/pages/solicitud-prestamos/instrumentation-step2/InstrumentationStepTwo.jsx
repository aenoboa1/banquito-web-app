import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Email, ContactPhone, Comment, Group,
    LocationOn, GpsFixed, ConfirmationNumber, Numbers, LocalAtm,
} from '@mui/icons-material';
import { Box, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import FormControl from "@mui/material/FormControl";
import SoftButton from "../../../components/SoftButton";
import { useNavigate } from 'react-router-dom';
import SoftTypography from "../../../components/SoftTypography";

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
    const [clientInfo, setClientInfo] = useState([]);
    const [clientAccount, setClienAccount] = useState([]);

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

    const handleSearch = () => {
        createAPIEndpoint(ENDPOINTS.customers)
            .fetchByTypeDocumentAndDocumentId(selectedTypeDocumentId, identificationNumber)
            .then((res) => {
                console.log(res.data);
                setClientInfo(res.data);
            })
            .catch((error) => {
                console.error(error);
                setClientInfo([]);
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
                        clientAccount.length > 0 && (
                            <SoftTypography variant="h5" component="div" align='center'>
                                Usuario Encontrado
                            </SoftTypography>
                        )
                    }
                </Grid>


                <Grid item xs={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <SoftButton color="primary" variant="contained">
                                Buscar Cuenta
                            </SoftButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                    {
                        clientAccount.length > 0 && (
                            <SoftTypography variant="h5" component="div" align='center'>
                                Información
                            </SoftTypography>
                        )
                    }
                </Grid>

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
                        clientInfo.length > 0 && (
                            <SoftTypography variant="h5" component="div" align='center'>
                                Usuario Encontrado
                            </SoftTypography>
                        )
                    }
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
                        clientInfo.length > 0 && (
                            <SoftTypography variant="h6" component="div" align='center'>
                                Nombre y Apellido: {clientInfo[0].firstName} {clientInfo[0].lastName} <br />
                                Email: {clientInfo[0].emailAddress} <br />
                                Género: {clientInfo[0].gender === 'M' ? 'Masculino' : 'Femenino'}
                            </SoftTypography>
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
                            <SoftButton color="primary" variant="contained" onClick={handleSearch}>
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