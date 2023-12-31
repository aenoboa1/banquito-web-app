import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export const GuarantorModal = ({ onClose }) => {

    GuarantorModal.propTypes = {
        onClose: PropTypes.func.isRequired,
    };

    const tiposGarante = [
        { key: 'CUS', value: 'Cliente' },
        { key: 'GCU', value: 'Grupo' },
        { key: 'GCO', value: 'Compañia' },
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '5%',
        boxShadow: 24,
        p: 4,
    };

    const initialValues = {
        nombre: '',
        tipoDocumento: '',
        codigo: ''
    };

    const validateForm = (valores) => {
        let errores = {};
        // Validación codigo
        if (!valores.codigo) {
            errores.codigo = 'Por favor ingresa el código';
        }
        // Validacion nombre
        if (!valores.nombre) {
            errores.nombre = 'Por favor ingresa un nombre'
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = 'El nombre solo puede contener letras y espacios'
        }
        // Validación tipoDocumento
        if (!valores.tipoDocumento) {
            errores.tipoDocumento = 'Debes seleccionar un tipo';
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
                            {({ values, handleChange }) => (
                                <Form >
                                    <Typography sx={{ mb: 0.5, lineHeight: '2rem', marginBottom: '1rem' }}
                                        color="text.secondary"
                                        align='center'
                                        fontSize={30}
                                    >
                                        <span style={{ fontWeight: 'bold', }}>Garante</span>
                                    </Typography>

                                    <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
                                        <Field name="codigo" as={TextField} label="Código" fullWidth
                                            onChange={handleChange}
                                            value={values.codigo} />
                                        <ErrorMessage name="codigo" component="div" className="error"
                                            style={{
                                                color: 'red', fontSize: '16px',
                                                fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
                                            }} />
                                    </Box>

                                    <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                        <Field as="select" id="tipoDocumento" name="tipoDocumento"
                                            style={{
                                                width: '20rem', fontFamily: 'Arial, sans-serif',
                                                fontSize: '18px', textAlign: 'center',
                                                height: '2rem'
                                            }}
                                        >
                                            <option value="" style={{ marginLeft: '1rem' }}>
                                                Seleccionar el tipo de garante</option>
                                            {tiposGarante.map((tipo) => (
                                                <option key={tipo.key} value={tipo.value}>
                                                    {tipo.value}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="tipoDocumento" component="div" className="error"
                                            style={{
                                                color: 'red', fontSize: '16px',
                                                fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
                                            }} />
                                    </Box>

                                    <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
                                        <Field name="nombre" as={TextField} label="Nombre" fullWidth
                                            onChange={handleChange}
                                            value={values.nombre} />
                                        <ErrorMessage name="nombre" component="div" className="error"
                                            style={{
                                                color: 'red', fontSize: '16px',
                                                fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
                                            }} />
                                    </Box>

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
