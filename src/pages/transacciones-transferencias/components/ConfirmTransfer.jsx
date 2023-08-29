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
                  
                    <Card sx={{ width: 450, height:400, minWidth: 300, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',borderRadius: '5px', marginY: '30px' }}>
                        <Typography sx={{ mb: 0.9, lineHeight: '7rem', }} color="text.primary" align='center' fontSize={25}>
                                <span style={{ fontWeight: 'bold' }}>
                                    ¿Desea confirmar la Transacción?
                                </span>
                            </Typography>
                            <Divider/>    
                        <CardContent sx={{ textAlign: 'center' }} className='p-tag'>
                        
                            <Typography sx={{ mb: 1.5, lineHeight: '3rem' }} color="text.secondary">
                                Se transferirá la cantidad de: 80 $
                            </Typography>
                            <Typography sx={{ mb: 1.5, lineHeight: '3rem' }} color="text.secondary">
                                De la cuenta: XXXXXXXX10
                            </Typography>
                            <Typography sx={{ mb: 1.5, lineHeight: '3rem' }} color="text.secondary">
                                A la cuenta: XXXXXXXX90
                            </Typography>
                            <Typography sx={{ mb: 1.5, lineHeight: '3rem' }} color="text.secondary">
                                Nombre de beneficiario: Marcelo Arias
                            </Typography>
                        </CardContent>
                    </Card>
                    
                
                    <div>
                        
                    </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{
                                width: '450px',
                                marginBottom: '10px',
                                marginLeft: '0rem',
                                backgroundColor: '#810000',
                                color: '#FFFFFF'
                            }}
                            onClick={handleOpen}
                        >
                            CONFIRMAR
                        </Button>    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                width: '450px',
                                marginBottom: '10px',
                                marginLeft: '0rem',
                                backgroundColor: '#00202E',
                                color: '#FFFFFF'
                            }}
                            onClick={handleNavigateToTransfer}
                        >
                            CANCELAR
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
                        <Box sx={style} style={{border: 'rgba(192,192,192,0.3)', borderRadius:'5px',}}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src="ok.png" alt="ok" style={{ width: '80px', height: 'auto', }} />
                            </div>
                            <Typography sx={{ mb: 0.9, lineHeight: '4rem', }} color="text.primary" align='center' fontSize={20}>
                                <span style={{ fontWeight: 'bold' }}>
                                    Transacción Exitosa
                                </span>
                            </Typography>
                            
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
                            <Divider sx={{ backgroundColor: "#000" }} />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    width: '330px',
                                    marginTop: '10px',
                                    marginLeft: '0rem',
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
