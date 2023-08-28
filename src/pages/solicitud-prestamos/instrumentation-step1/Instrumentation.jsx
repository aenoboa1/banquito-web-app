import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm, } from 'react-hook-form';
import {
    Numbers, LocalAtm, AddCircle,
} from '@mui/icons-material';
import { Box, Divider, Grid, InputAdornment, Snackbar, Stack, TextField, Typography } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from 'react-router-dom';
import SoftButton from "../../../components/SoftButton";
import SoftTypography from "../../../components/SoftTypography";
import SoftBox from "../../../components/SoftBox";
import MuiAlert from "@mui/material/Alert";

const validationSchema = yup.object({
    guarantorCode: yup.string().required('El número de identificación es requerido'),
    // typeClient: yup.string().required('Seleccione un cliente'),
    // typeDocumentId: yup.string().required('Seleccione un tipo de documento'),
    currency: yup.string().required('Seleccione un tipo de moneda'),
    ammount: yup.string().required('Ingrese un monto'),
});


const Instrumentation = () => {

    const navigate = useNavigate();
    const [selectedTypeClient, setSelectedTypeClient] = useState('');
    const [selectedTypeDocumentId, setSelectedTypeDocumentId] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [elementosVisibles, setElementosVisibles] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [clientInfo, setClientInfo] = useState([]);
    const [isSaveAsset, setIsSaveAsset] = useState(false);


    useEffect(() => {
    }, [selectedTypeClient]);

    const typeClients = [
        { value: 'CUS', label: 'Naturales' },
        { value: 'GCO', label: 'Jurídicos' },
    ];

    const documentTypesJur = [
        { value: 'RUC1', label: 'RUC1' },
    ];

    const documentTypesNat = [
        { value: 'CID', label: 'Cédula' },
        { value: 'PAS', label: 'Pasaporte' },
        { value: 'RUC', label: 'RUC' },
    ];

    const currencyTypes = [
        { value: 'EUR', label: 'EURO' },
        { value: 'USD', label: 'US DOLLAR' },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            guarantorCode: '',
            guarantorType: '',
            typeDocumentId: '',
            currency: '',
            ammount: '',
        },
    });

    const onSubmit = (data) => {
        console.log("DATA --> ", data);

        const dataToSend = {
            amount: parseFloat(data.ammount), // Convertir el monto a número si es necesario
            guarantorCode: data.guarantorCode,
            guarantorType: data.guarantorType,
            currency: data.currency
        };

        createAPIEndpoint(ENDPOINTS.asset,
        ).postAsset(dataToSend, {}).then((res) => {

            setOpenSnackbar(true);
            setSnackbarMessage("Garantía creada correctamente");
            setSnackbarSeverity("success");
            setIsSaveAsset(true);
        }).catch(
            err => {
                console.log(err);
                setSnackbarSeverity("error");
            })
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

    const handleAddGuarantor = () => {
        const dataToSend = {
            code: clientInfo[0].documentId,
            type: "CUS",
            name: clientInfo[0].firstName + " " + clientInfo[0].lastName
        };
        // console.log("DATA --> ", dataToSend);

        createAPIEndpoint(ENDPOINTS.guarantor,
        ).postAsset(dataToSend, {}).then((res) => {

            setOpenSnackbar(true);
            setSnackbarMessage("Garante creado correctamente");
            setSnackbarSeverity("success");
        }).catch(
            err => {
                console.log(err);
                setSnackbarSeverity("error");
            })
    };

    const handleNextStep = () => {
        navigate("/prestamos/step2");
    };

    const handleTypeClientChange = (event) => {
        setSelectedTypeClient(event.target.value);
    };

    const handleTypeDocumentIdChange = (event) => {
        setSelectedTypeDocumentId(event.target.value);
    };

    const handleToggleElementos = () => {
        setElementosVisibles(!elementosVisibles);
    };

    return (
        <Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <SoftTypography variant="h5" component="div" align='center'>
                            Instrumentación
                        </SoftTypography>
                    </Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <SoftTypography variant="h5" component="div">
                            Garante
                        </SoftTypography>
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
                            name="guarantorType"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Tipo de Garante"
                                    {...register("guarantorType")}
                                    value={selectedTypeClient}
                                    onChange={handleTypeClientChange}
                                // error={Boolean(errors.guarantorType)}
                                // helperText={errors.guarantorType?.message}
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
                        {clientInfo.length > 0 && (
                            <Grid container style={{ position: 'relative', marginRight: '50px' }}>
                                <Grid item xs={12} sm={4} lg={12} xl={8}
                                    style={{ position: 'absolute', top: 0, left: "26%", padding: '10px', zIndex: 1 }}>
                                    <SoftBox p={5} borderRadius="10%" shadow={"sm"}>
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
                                        <Divider />
                                        <Box display="flex" flexDirection="column" alignItems="center"
                                            gap={2} py={2} >
                                            <SoftButton
                                                color={"primary"}
                                                variant={"gradient"}
                                                fullWidth
                                                onClick={handleAddGuarantor}
                                                label="Garante" startIcon={<AddCircle />}
                                            >
                                                Añadir Garante
                                            </SoftButton>
                                        </Box>
                                    </SoftBox>
                                </Grid>
                            </Grid>
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
                                            documentTypesNat.map((type) => (
                                                <MenuItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            documentTypesJur.map((type) => (
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
                    <Grid item xs={8}></Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            type="text"
                            id="guarantorCode"
                            label="Número de Identificación"
                            {...register("guarantorCode")}
                            value={identificationNumber}
                            onChange={(event) => setIdentificationNumber(event.target.value)}
                            error={Boolean(errors.guarantorCode)}
                            helperText={errors.guarantorCode?.message}
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
                            <Grid item xs={11}></Grid>
                            <Grid item xs={1}>
                                <SoftButton color="primary" variant="contained" onClick={handleSearch}>
                                    Buscar
                                </SoftButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={9}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}></Grid>

                    <Grid item xs={1}></Grid>
                    <Grid item xs={3}>
                        <SoftButton color={"primary"} variant={"contained"} fullWidth
                            onClick={handleToggleElementos}
                        // type={"submit"}
                        >
                            Añadir Garantía
                        </SoftButton>
                    </Grid>
                    <Grid item xs={8}>
                        {/* <Grid container>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <SoftButton color={"primary"} variant={"contained"} fullWidth
                                    onClick={handleAddGuarantor}>
                                    Añadir Garante
                                </SoftButton>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid> */}
                    </Grid>
                    {/* Elementos a ocultar/mostrar */}
                    {elementosVisibles && (
                        <Fragment>
                            <Grid item xs={12}>
                                <Divider color='#DDDDDD' />
                            </Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    id="ammount"
                                    label="Monto"
                                    {...register("ammount")}
                                    error={Boolean(errors.ammount)}
                                    helperText={errors.ammount?.message}
                                    inputProps={{ style: { textAlign: 'left' } }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocalAtm />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8}></Grid>

                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <Controller
                                    name="currency"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Tipo de moneda"
                                            error={Boolean(errors.currency)}
                                            helperText={errors.currency?.message}
                                        >
                                            {currencyTypes.map((type) => (
                                                <MenuItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={12}></Grid>

                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <SoftButton color={"primary"} variant={"contained"} fullWidth type={"submit"}>
                                    Guardar Garantía
                                </SoftButton>
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={12}></Grid>

                            <Grid item xs={8}></Grid>
                            <Grid item xs={3}>
                                <Grid container>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={9}>
                                        <SoftButton color={"primary"} variant={"contained"} fullWidth
                                            onClick={handleNextStep} disabled={!isSaveAsset}>
                                            Siguiente Paso
                                        </SoftButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Fragment>
                    )}
                </Grid>
            </form >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Stack>
    );
}



export default Instrumentation 