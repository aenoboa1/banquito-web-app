import React from 'react';
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
    identificationNumber: yup.string().required('El número de identificación es requerido'),
    typeClient: yup.string().required('Seleccione un cliente'),
    typeDocumentId: yup.string().required('Seleccione un tipo de documento'),
    currencyType: yup.string().required('Seleccione un tipo de moneda'),
    ammount: yup.string().required('Ingrese un monto'),
});


const InstrumentationStepTwo = () => {

    const navigate = useNavigate();

    const typeClients = [
        { value: 'ACT', label: 'Naturales' },
        { value: 'INA', label: 'Jurídicos' },
    ];

    const documentTypes = [
        { value: 'CID', label: 'Cédula' },
        { value: 'PAS', label: 'Pasaporte' },
        { value: 'RUC', label: 'RUC' },
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
            currencyType: '',
            ammount: 0,
        },
    });

    const onSubmit = (data) => {
        console.log("DATA --> ", data);

    };

    const handleNextStep = () => {
        navigate("/prestamos/step3");
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
                        id="identificationNumber"
                        label="Número de Identificación"
                        {...register("identificationNumber")}
                        error={Boolean(errors.identificationNumber)}
                        helperText={errors.identificationNumber?.message}
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
                    <SoftTypography variant="h5" component="div" align='center'>
                        Usuario Encontrado
                    </SoftTypography>
                </Grid>

                <Grid item xs={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={3}>
                            <SoftButton color="primary" variant="contained" type="submit">
                                Buscar
                            </SoftButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                    <SoftTypography variant="h5" component="div" align='center'>
                        Información
                    </SoftTypography>
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
                                error={Boolean(errors.typeClient)}
                                helperText={errors.typeClient?.message}
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
                    <SoftTypography variant="h5" component="div" align='center'>
                        Usuario Encontrado
                    </SoftTypography>
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
                                select // tell TextField to render select
                                label="Tipo de Documento"
                                error={Boolean(errors.typeDocumentId)}
                                helperText={errors.typeDocumentId?.message}
                            >
                                {documentTypes.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={8}>
                    <SoftTypography variant="h5" component="div" align='center'>
                        Información
                    </SoftTypography>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        type="text"
                        id="identificationNumber"
                        label="Número de Identificación"
                        {...register("identificationNumber")}
                        error={Boolean(errors.identificationNumber)}
                        helperText={errors.identificationNumber?.message}
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
                        <Grid item xs={8}></Grid>
                        <Grid item xs={3}>
                            <SoftButton color="primary" variant="contained" type="submit">
                                Buscar
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