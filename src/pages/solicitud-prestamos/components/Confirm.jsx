import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

export const Confirm = ({ onClose }) => {

    const navigate = useNavigate();

    Confirm.propTypes = {
        onClose: PropTypes.func.isRequired,
    };

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

    const handleNavigateToAccount = () => {
        onClose();
        navigate('cuentas');
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            {
                <div>
                    <Modal
                        keepMounted
                        open={true}
                        onClose={onClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={style}>
                                <Typography sx={{ mb: 0.5, lineHeight: '2rem', }} color="text.primary" align='center'
                                    fontSize={30}>
                                    <span style={{ fontWeight: 'bold' }}>
                                        Solicitud Generada
                                    </span>
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src="ok.png" alt="ok" style={{ width: '50%', height: 'auto', }} />
                                </div>
                                <Divider sx={{ backgroundColor: "#000" }} />
                                <div className="form-button">
                                    <Button
                                        type="submit"
                                        style={{
                                            backgroundColor: '#00202E',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: '#fff'
                                        }}
                                        onClick={handleNavigateToAccount}
                                    >
                                        REALIZAR OTRA TRANSACCIÓN
                                    </Button>
                                </div>
                                {/* <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        marginTop: '10px',
                                        marginLeft: '3rem',
                                        backgroundColor: '#00202E',
                                        color: '#fff'
                                    }}
                                >
                                    REALIZAR OTRA TRANSACCIÓN
                                </Button> */}
                            </Box>
                        </div>
                    </Modal>
                </div>
            }
        </Grid >
    )
}
