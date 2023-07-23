import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export const InterestAccrual = ({ onClose }) => {

    InterestAccrual.propTypes = {
        onClose: PropTypes.func.isRequired,
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '5%',
        boxShadow: 24,
        p: 4,
        fontStyle: 'italic',
    };

    const initialValues = {
        tipoInteres: '',
        tasaInteres: '',
        diferencial: '',
        frecuenciaCarga: ''
    };

    //Validar campos
    const validateForm = (valores) => {
        let errores = {};
        // Validación diferencial
        if (!valores.diferencial) {
            errores.diferencial = 'Por favor ingresa un diferencial';
        } else if (!/^[0-9.]+$/.test(valores.diferencial)) {
            errores.diferencial = 'El diferencial solo puede contener números';
        }
        // Validacion frecuenciaCarga
        if (!valores.frecuenciaCarga) {
            errores.frecuenciaCarga = 'Por favor ingresa una frecuencia de carga'
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.frecuenciaCarga)) {
            errores.frecuenciaCarga = 'La frecuencia de carga solo puede contener letras y espacios'
        }
        // Validacion tipoInteres
        if (!valores.tipoInteres) {
            errores.tipoInteres = 'Por favor ingresa un tipo de interés'
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.tipoInteres)) {
            errores.tipoInteres = 'El tipo de interés de carga solo puede contener letras y espacios'
        }
        // Validación tasaInteres
        if (!valores.tasaInteres) {
            errores.tasaInteres = 'Por favor ingresa una tasa de interés';
        } else if (!/^\d+(\.\d{1,2})?$/.test(valores.monto)) {
            errores.tasaInteres = 'La tasa de interés debe ser un número válido';
        }
        return errores;
    }

    const handleSubmit = (values) => {
        console.log(values);
        onClose();
    };
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Modal
                keepMounted
                open={true}
                onClose={onClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Box sx={style}>
                        <Formik
                            initialValues={initialValues}
                            validate={validateForm}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, values, handleChange }) => (
                                <Form >
                                    <Typography sx={{ mb: 0.5, lineHeight: '2rem', marginBottom: '1rem' }}
                                        color="text.secondary"
                                        align='center'
                                        fontSize={30}
                                    >
                                        <span style={{ fontWeight: 'bold', }}>Acumulación de Intereses</span>
                                    </Typography>
                                    <div style={{ width: '500px' }}>
                                        <div className="form-field">
                                            <label htmlFor="tasaInteres">Tasa de interés:</label>
                                            <Field
                                                type="number"
                                                id="tasaInteres"
                                                name="tasaInteres"
                                                onChange={handleChange}
                                                value={values.tasaInteres}
                                                style={{ marginLeft: '2rem' }}
                                            />
                                            <ErrorMessage name="tasaInteres" component="div" className="error"
                                                style={{ marginLeft: '1rem' }} />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor="tipoInteres">Tipo de interés:</label>
                                            <Field
                                                type="text"
                                                id="tipoInteres"
                                                name="tipoInteres"
                                                onChange={handleChange}
                                                value={values.tipoInteres}
                                                style={{ marginLeft: '2rem' }}
                                            />
                                            <ErrorMessage name="tipoInteres" component="div" className="error"
                                                style={{ marginLeft: '1rem' }} />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor="periodoGracia">Diferencial:</label>
                                            <Field
                                                type="number"
                                                id="diferencial"
                                                name="diferencial"
                                                onChange={handleChange}
                                                value={values.diferencial}
                                                style={{ marginLeft: '2rem' }}
                                            />
                                            <ErrorMessage name="diferencial" component="div" className="error"
                                                style={{ marginLeft: '1rem' }} />
                                        </div>

                                        <div className="form-field">
                                            <label htmlFor="comisionMensual">Frecuencia de carga :</label>
                                            <Field
                                                type="text"
                                                id="frecuenciaCarga"
                                                name="frecuenciaCarga"
                                                onChange={handleChange}
                                                value={values.frecuenciaCarga}
                                                style={{ marginLeft: '2rem' }}
                                            />
                                            <ErrorMessage name="frecuenciaCarga" component="div" className="error"
                                                style={{ marginLeft: '1rem' }} />
                                        </div>
                                    </div>
                                    <div className="form-button">
                                        <Button
                                            type="submit"
                                            style={{
                                                backgroundColor: '#810000',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: '#fff'
                                            }}
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                </Form>
                            )
                            }
                        </Formik>
                    </Box>
                </div>
            </Modal>
        </Grid >
    )
}
