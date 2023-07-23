import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, CardMedia, Divider, Grid, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const ConfirmTransfer = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        fontStyle: 'italic',
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleNavigateToTransfer = () => {
        handleClose();
        navigate('/transacciones');
    };

    return (
        
        
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '16rem' }}>
                    
                    <Card sx={{ width: 926, height: 400, minWidth: 300, border: '1px solid #df2c3f', borderRadius: '10px', marginY: '30px' }}>
                        <CardContent sx={{ textAlign: 'start' }} className='p-tag'>
                            <Typography sx={{ mb: 1.5, lineHeight: '5rem' }} color="text.secondary">
                                Se transferirá la cantidad de: 80 $
                            </Typography>
                            <Typography sx={{ mb: 1.5, lineHeight: '5rem' }} color="text.secondary">
                                De la cuenta: XXXXXXXX10
                            </Typography>
                            <Typography sx={{ mb: 1.5, lineHeight: '5rem' }} color="text.secondary">
                                A la cuenta: XXXXXXXX90
                            </Typography>
                            <Typography sx={{ mb: 1.5, lineHeight: '5rem' }} color="text.secondary">
                                Nombre de beneficiario: Marcelo Arias
                            </Typography>
                        </CardContent>
                    </Card>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginBottom: '10px',
                                marginRight: '20rem',
                                backgroundColor: '#00202E',
                                color: '#FFFFFF'
                            }}
                            onClick={handleNavigateToTransfer}
                        >
                            CANCELAR
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            style={{
                                marginBottom: '10px',
                                marginLeft: '20rem',
                                backgroundColor: '#810000',
                                color: '#FFFFFF'
                            }}
                            onClick={handleOpen}
                        >
                            CONFIRMAR
                        </Button>
                    </div>
                </div>
            </Grid>
            {
                <div style={{ marginLeft: '16rem' }}>
                    <Modal
                        keepMounted
                        open={open}
                        onClose={false}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <Typography sx={{ mb: 0.5, lineHeight: '2rem', }} color="text.primary" align='center' fontSize={30}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Transacción Exitosa
                                </span>
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src="ok.png" alt="ok" style={{ width: '50%', height: 'auto', }} />
                            </div>
                            <Divider sx={{ backgroundColor: "#000" }} />

                            <Typography sx={{ mb: 0.5, lineHeight: '2rem' }} color="text.secondary">
                                Transferencia realizada por: <span style={{ fontWeight: 'bold' }}> 80 $</span>
                            </Typography>
                            <Typography sx={{ mb: 0.5, lineHeight: '2rem' }} color="text.secondary">
                                A la cuenta: <span style={{ fontWeight: 'bold' }}> XXXXXXXXX90</span>
                            </Typography>
                            <Typography sx={{ mb: 0.5, lineHeight: '2rem' }} color="text.secondary">
                                Beneficiario: <span style={{ fontWeight: 'bold' }}>Marcelo Arias</span>
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    marginTop: '10px',
                                    marginLeft: '4rem',
                                    backgroundColor: '#00202E',
                                    color: '#FFFFFF'
                                }}
                                onClick={handleNavigateToTransfer}
                            >
                                REALIZAR OTRA TRANSACCIÓN
                            </Button>
                        </Box>
                    </Modal>
                </div>
            }
        </Grid>
    );
}