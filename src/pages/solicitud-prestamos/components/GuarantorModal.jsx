import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';

export const GuarantorModal = ({ onClose }) => {

    GuarantorModal.propTypes = {
        onClose: PropTypes.func.isRequired,
    };

    const tiposGarante = [
        { key: 'CUS', value: 'CLIENTE' },
        { key: 'GCU', value: 'GRUPO' },
        { key: 'GCO', value: 'COMPAÑIA' },
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '5%',
        boxShadow: 24,
        p: 4,
        fontStyle: 'italic',
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
                            {({ errors, values, handleChange }) => (
                                <Form >
                                    <Typography sx={{ mb: 0.5, lineHeight: '2rem', marginBottom: '1rem' }}
                                        color="text.secondary"
                                        align='center'
                                        fontSize={30}
                                    >
                                        <span style={{ fontWeight: 'bold', }}>Garante</span>
                                    </Typography>
                                    <div className="form-field">
                                        <label htmlFor="codigo">Código:</label>
                                        <Field
                                            type="text"
                                            id="codigo"
                                            name="codigo"
                                            onChange={handleChange}
                                            value={values.codigo}
                                        />
                                        <ErrorMessage name="codigo" component="div" className="error" style={{ marginLeft: '1rem' }} />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="tipoDocumento">Tipo:</label>
                                        <Field as="select" id="tipoDocumento" name="tipoDocumento">
                                            <option value="">Seleccionar</option>
                                            {tiposGarante.map((tipo) => (
                                                <option key={tipo.key} value={tipo.value}>
                                                    {tipo.value}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="tipoDocumento" component="div" className="error" style={{ marginLeft: '1rem' }} />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <Field
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            onChange={handleChange}
                                            value={values.nombre}
                                        />
                                        <ErrorMessage name="nombre" component="div" className="error" style={{ marginLeft: '1rem' }} />
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
