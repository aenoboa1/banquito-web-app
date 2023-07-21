import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const GuarantorModal = ({ onClose }) => {

    const [codigo, setCodigo] = useState('');
    const [tipo, setTipo] = useState('');
    const [nombre, setNombre] = useState('');

    GuarantorModal.propTypes = {
        onClose: PropTypes.func.isRequired,
    };

    const handleGuardar = () => {
        // Aquí puedes realizar la lógica para guardar los valores ingresados
        console.log('Código:', codigo);
        console.log('Tipo:', tipo);
        console.log('Nombre:', nombre);
        // Cerrar el modal
        onClose();
    };

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
        fontStyle: 'italic',
    };
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            {/* <div> */}
                <Modal
                    keepMounted
                    open={true}
                    onClose={onClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={style}>
                            <Typography sx={{ mb: 0.5, lineHeight: '2rem', }} color="text.secondary" align='center'
                                fontSize={30}>
                                <span style={{ fontWeight: 'bold' }}>Garante</span>
                            </Typography>
                            <Divider sx={{ backgroundColor: "#000" }} />

                            <TextField
                                label="Código "
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                fullWidth
                                sx={{ marginBottom: '1rem', }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        top: '-0.5rem',
                                    },
                                }}
                            />
                            <TextField
                                label="Tipo "
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                fullWidth
                                sx={{ marginBottom: '1rem' }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        top: '-0.5rem',
                                    },
                                }}
                            />
                            <TextField
                                label="Nombre "
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                fullWidth
                                sx={{ marginBottom: '1rem' }}
                                InputLabelProps={{
                                    sx: {
                                        fontSize: '18px',
                                        fontStyle: 'normal',
                                        top: '-0.5rem',
                                    },
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    marginTop: '10px',
                                    marginLeft: '3rem',
                                    backgroundColor: '#00202E'
                                }}
                                onClick={handleGuardar}
                            >
                                GUARDAR
                            </Button>
                        </Box>
                    </div>
                </Modal>
            {/* </div> */}
        </Grid>
    )
}
