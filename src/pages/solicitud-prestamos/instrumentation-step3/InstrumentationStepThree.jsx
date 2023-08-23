import React, { Fragment, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Email, ContactPhone, Comment, Group,
    LocationOn, GpsFixed, ConfirmationNumber, Numbers, LocalAtm, Business,
} from '@mui/icons-material';
import { Autocomplete, Box, CircularProgress, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import FormControl from "@mui/material/FormControl";
import SoftButton from "../../../components/SoftButton";
import { useNavigate } from 'react-router-dom';
import SoftTypography from "../../../components/SoftTypography";

const validationSchema = yup.object({
    identificationNumber: yup.string().required('Ingrese un número de identificación'),
    branchId: yup.string().required('Seleccione una sucursal'),
    loanType: yup.string().required('Seleccione un tipo de préstamo'),
    amount: yup.string().required('Ingrese un monto'),
    tipoPeriodoGracia: yup.string().required('Ingrese un tipo de periodo de gracia'),
    periodoGracia: yup.string().required('Ingrese un período de gracia'),
    monthlyCommission: yup.string().required('Ingrese una comisión mensual'),
    deadlineReturn: yup.string().required('Ingrese un plazo para la devolución'),
    name: yup.string().required('Ingrese un nombre'),
});


const InstrumentationStepThree = () => {

    const navigate = useNavigate();

    const loanTypes = [
        { value: 'CRE', label: 'Crédito' },
        { value: 'CON', label: 'Contado' },
    ];

    const [openBranches, setOpenBranches] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = openBranches && options.length === 0;

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                createAPIEndpoint(ENDPOINTS.bankEntity).fetchBranches('64b1892b9c2c3b03c33a736f'
                    ,
                    {}
                ).then(
                    res => {
                        console.log(res.data);
                        setOptions(res.data);
                    }).then(
                        err => console.log(err)
                    )
            }
        })();
        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!openBranches) {
            setOptions([]);
        }
    }, [openBranches]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            identificationNumber: '',
            loanType: '',
            amount: 0,
            branchId: '',
            tipoPeriodoGracia: '',
            periodoGracia: '',
            monthlyCommission: '',
            name: '',
            deadlineReturn: '',
        },
    });

    const onSubmit = (data) => {
        console.log("DATA --> ", data);

    };

    const handleNextStep = () => {
        navigate("/prestamos/step2");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SoftTypography variant="h5" component="div" align='center'>
                        SOLICITUD DE PRÉSTAMO
                    </SoftTypography>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    {/* Branch */}
                    <Controller
                        name="branchId"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                id="branchId"
                                open={openBranches}
                                onOpen={() => {
                                    setOpenBranches(true);
                                }}
                                onClose={() => {
                                    setOpenBranches(false);
                                }}
                                getOptionSelected={(option, value) =>
                                    value === undefined || value === "" || option.uniqueKey === value.uniqueKey
                                }
                                isOptionEqualToValue={(option, value) => option.uniqueKey === value?.uniqueKey}
                                getOptionLabel={(option) => option.name || ''}

                                options={options}
                                loading={loading}
                                loadingText={"Cargando Sucursales..."}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Seleccione una Sucursal"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <Fragment>
                                                    {loading ?
                                                        <CircularProgress color="inherit"
                                                            size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </Fragment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Business />
                                                </InputAdornment>
                                            ),
                                        }}
                                        error={Boolean(errors.branchId)}
                                        helperText={errors.branchId?.message}
                                    />
                                )}
                                onChange={(_event, data) => field.onChange(data?.uniqueKey ?? '')}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        id="tipoPeriodoGracia"
                        label="Tipo de Periodo de Gracia"
                        {...register("tipoPeriodoGracia")}
                        error={Boolean(errors.tipoPeriodoGracia)}
                        helperText={errors.tipoPeriodoGracia?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <Controller
                        name="typeDocumentId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                select // tell TextField to render select
                                label="Tipo de préstamos"
                                error={Boolean(errors.loanType)}
                                helperText={errors.loanType?.message}
                            >
                                {loanTypes.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        id="periodoGracia"
                        label="Período de gracia (meses)"
                        {...register("periodoGracia")}
                        error={Boolean(errors.periodoGracia)}
                        helperText={errors.periodoGracia?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        id="amount"
                        label="Monto"
                        {...register("amount")}
                        error={Boolean(errors.amount)}
                        helperText={errors.amount?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        id="monthlyCommission"
                        label="Comisión mensual"
                        {...register("monthlyCommission")}
                        error={Boolean(errors.monthlyCommission)}
                        helperText={errors.monthlyCommission?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        id="name"
                        label="Nombre"
                        {...register("name")}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        type="text"
                        id="deadlineReturn"
                        label="Plazo para devolución (meses)"
                        {...register("deadlineReturn")}
                        error={Boolean(errors.deadlineReturn)}
                        helperText={errors.deadlineReturn?.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Numbers />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={1}></Grid>


                {/* Buttom */}
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>

                    <SoftButton color={"primary"} variant={"contained"} fullWidth type={"submit"}>
                        Solicitar Préstamo
                    </SoftButton>
                </Grid>
                <Grid item xs={4}></Grid>

            </Grid>
        </form >
    );
}



export default InstrumentationStepThree 