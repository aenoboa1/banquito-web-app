import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '../css/styles.css';
import { GuarantorModal } from './GuarantorModal';
import { GuaranteeModal } from './GuaranteeModal';
import { InterestAccrual } from './InterestAccrual';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import { Confirm } from './Confirm';

export default function BasicCard() {

	const tiposDocumento = ['CI', 'Pasaporte', 'RUC'];
	const tiposPrestamo = ['Personal', 'Crédito'];

	const [modalOpen1, setModalOpen1] = useState(false);
	const [modalOpen2, setModalOpen2] = useState(false);
	const [modalOpen3, setModalOpen3] = useState(false);
	const [modalOpen4, setModalOpen4] = useState(false);

	const [showButton1, setButtonOpen1] = useState(false);
	const [showButton2, setButtonOpen2] = useState(true);
	const [showButton3, setButtonOpen3] = useState(true);
	const [showButton4, setButtonOpen4] = useState(true);

	const handleOpenModal = () => {
		setModalOpen1(true);
		setButtonOpen1(true);
		setButtonOpen2(false);
	};

	const handleCloseModal = () => {
		setModalOpen1(false);
	};
	const handleOpenModal2 = () => {
		setModalOpen2(true);
		setButtonOpen2(true);
		setButtonOpen3(false);
	};

	const handleCloseModal2 = () => {
		setModalOpen2(false);
	};
	const handleOpenModal3 = () => {
		setButtonOpen3(true);
		setModalOpen3(true);
		setButtonOpen4(false);
	};

	const handleCloseModal3 = () => {
		setModalOpen3(false);
	};

	const handleCloseModal4 = () => {
		setModalOpen4(false);
	};

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

	// Inicializa el estado inicial de los valores del formulario
	const initialValues = {
		tipoCliente: '',
		nombre: '',
		apellido: '',
		tipoDocumento: '',
		codigo: '',
		monto: '',
		plazoMeses: '',
		tipoPrestamo: '',
		tasaInteres: '',
		tipoPeriodoGracia: '',
		periodoGracia: '',
		comisionMensual: '',
	};

	//Validar campos
	const validateForm = (valores) => {
		let errores = {};
		// Validación codigo
		if (!valores.codigo) {
			errores.codigo = 'Por favor ingresa el código del documento';
		} else if (!/^[0-9.]+$/.test(valores.codigo)) {
			errores.codigo = 'El código del documento solo puede contener números';
		} else if (valores.codigo.length !== 10) {
			errores.codigo = 'Por favor ingresa los 10 dígitos';
		}
		// Validación plazo
		if (!valores.plazoMeses) {
			errores.plazoMeses = 'Por favor ingresa el plazo para la devolución';
		} else if (!/^[0-9.]+$/.test(valores.plazoMeses)) {
			errores.plazoMeses = 'El plazo para devolución solo puede contener números';
		}
		// Validación plazo
		if (!valores.periodoGracia) {
			errores.periodoGracia = 'Por favor ingresa el período de gracia';
		} else if (!/^[0-9.]+$/.test(valores.periodoGracia)) {
			errores.periodoGracia = 'El período de gracia solo puede contener números';
		}
		// Validacion nombre
		if (!valores.nombre) {
			errores.nombre = 'Por favor ingresa un nombre'
		} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
			errores.nombre = 'El nombre solo puede contener letras y espacios'
		}
		// Validacion apellido
		if (!valores.apellido) {
			errores.apellido = 'Por favor ingresa un apellido'
		} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido)) {
			errores.apellido = 'El apellido solo puede contener letras y espacios'
		}
		// Validación monto
		if (!valores.monto) {
			errores.monto = 'Por favor ingresa un monto';
		} else if (!/^\d+(\.\d{1,2})?$/.test(valores.monto)) {
			errores.monto = 'El monto debe ser un número válido';
		}
		// Validación comisión
		if (!valores.comisionMensual) {
			errores.comisionMensual = 'Por favor ingresa una comisión';
		} else if (!/^\d+(\.\d{1,2})?$/.test(valores.monto)) {
			errores.comisionMensual = 'La comisión mensual debe ser un número válido';
		}
		//validación tipoCliente
		if (!valores.tipoCliente) {
			errores.tipoCliente = 'Debes seleccionar un tipo de cliente';
		}
		// Validación tasaInteres
		if (!valores.tasaInteres) {
			errores.tasaInteres = 'Por favor ingresa una tasa de interés';
		} else if (!/^\d+(\.\d{1,2})?$/.test(valores.monto)) {
			errores.tasaInteres = 'La tasa de interés debe ser un número válido';
		}
		// Validación tipoDocumento
		if (!valores.tipoDocumento) {
			errores.tipoDocumento = 'Debes seleccionar un tipo de documento';
		}
		// Validación tipoPrestamo
		if (!valores.tipoPrestamo) {
			errores.tipoPrestamo = 'Debes seleccionar un tipo de préstamo';
		}
		// Validación tipoPeriodoGracia
		if (!valores.tipoPeriodoGracia) {
			errores.tipoPeriodoGracia = 'Por favor ingresa un tipo de período de gracia'
		} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.tipoPeriodoGracia)) {
			errores.tipoPeriodoGracia = 'El tipo de período de gracia solo puede contener letras y espacios'
		}
		return errores;
	}

	const handleSubmit = (values) => {
		setModalOpen4(true);
		console.log(values);
	};

	return (
		<Formik
		initialValues={initialValues}
		validate={validateForm}
		onSubmit={handleSubmit}
		>
			{({ errors, values, handleChange }) => (
				<Form className="form-container" >
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						{/* Columna 1 */}
						<div style={{ width: '500px' }}>
							<div className="radio-container">
								<label htmlFor="nombre" style={{ fontWeight: 'bold' }}>Tipo:</label>
								<Field
									type="radio"
									name="tipoCliente"
									value="natural"
									style={{ marginLeft: '30%' }}
								/>
								<label style={{ marginLeft: '3%', fontSize: '16px' }}>Natural</label>

								<Field
									type="radio"
									name="tipoCliente"
									value="jurídico"
									style={{ marginLeft: '1rem' }}
								/>
								<label style={{ marginLeft: '3%', fontSize: '16px' }}>Jurídico</label>
								<div className="form-field">
									<ErrorMessage name="tipoCliente" component="div" className="error"
										style={{ marginLeft: '1.5rem' }} />
								</div>

							</div>
							<div className="form-field">
								<label htmlFor="nombre">Nombres:</label>
								<Field
									type="text"
									id="nombre"
									name="nombre"
									onChange={handleChange}
									value={values.nombre}
								/>
								<ErrorMessage name="nombre" className="error" component="div"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="apellido">Apellidos:</label>
								<Field
									type="text"
									id="apellido"
									name="apellido"
									onChange={handleChange}
									value={values.apellido}
								/>
								<ErrorMessage name="apellido" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">

								<label htmlFor="tipoDocumento">Tipo de documento:</label>
								<Field as="select" id="tipoDocumento" name="tipoDocumento">
									<option value="">Seleccionar</option>
									{tiposDocumento.map((tipo) => (
										<option key={tipo} value={tipo}>
											{tipo}
										</option>
									))}
								</Field>
								<ErrorMessage name="tipoDocumento" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="codigo">Código de documento:</label>
								<Field
									type="text"
									id="codigo"
									name="codigo"
									onChange={handleChange}
									value={values.codigo}
								/>
								<ErrorMessage name="codigo" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="monto">Monto:</label>
								<Field type="text" id="monto" name="monto" />
								<ErrorMessage name="monto" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="plazoMeses">Plazo para devolución (meses):</label>
								<Field
									type="text"
									id="plazoMeses"
									name="plazoMeses"
									onChange={handleChange}
									value={values.plazoMeses}
								/>
								<ErrorMessage name="plazoMeses" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
						</div>

						{/* Columna 2 */}
						<div style={{ width: '500px' }}>
							<div className="form-field">
								<label htmlFor="tipoPrestamo">Tipo de préstamo:</label>
								<Field as="select" id="tipoPrestamo" name="tipoPrestamo">
									<option value="">Seleccionar</option>
									{tiposPrestamo.map((tipo) => (
										<option key={tipo} value={tipo}>
											{tipo}
										</option>
									))}
								</Field>
								<ErrorMessage name="tipoPrestamo" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="tasaInteres">Tasa de interés:</label>
								<Field
									type="text"
									id="tasaInteres"
									name="tasaInteres"
									onChange={handleChange}
									value={values.tasaInteres}
								/>
								<ErrorMessage name="tasaInteres" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="tipoPeriodoGracia">Tipo de período de gracia:</label>
								<Field
									type="text"
									id="tipoPeriodoGracia"
									name="tipoPeriodoGracia"
									onChange={handleChange}
									value={values.tipoPeriodoGracia}

								/>
								<ErrorMessage name="tipoPeriodoGracia" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="periodoGracia">Período de gracia (meses):</label>
								<Field
									type="text"
									id="periodoGracia"
									name="periodoGracia"
									onChange={handleChange}
									value={values.periodoGracia}
								/>
								<ErrorMessage name="periodoGracia" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
							<div className="form-field">
								<label htmlFor="comisionMensual">Comisión mensual:</label>
								<Field
									type="text"
									id="comisionMensual"
									name="comisionMensual"
									onChange={handleChange}
									value={values.comisionMensual}
								/>
								<ErrorMessage name="comisionMensual" component="div" className="error"
									style={{ marginLeft: '1.5rem' }} />
							</div>
						</div>
					</div>

					<div className="form-button">
						<Button
							style={{
								fontSize: '12px',
								fontWeight: 'bold',
							}}
							onClick={handleOpenModal}
							disabled={showButton1}
						>
							Agregar Garante
						</Button>
					</div>
					{modalOpen1 && <GuarantorModal onClose={handleCloseModal} />}

					<div className="form-button">
						<Button
							style={{
								fontSize: '12px',
								fontWeight: 'bold',
							}}
							onClick={handleOpenModal2}
							disabled={showButton2}
						>
							Agregar Garantía
						</Button>
					</div>
					{modalOpen2 && <GuaranteeModal onClose={handleCloseModal2} />}


					<div className="form-button">
						<Button
							style={{
								fontSize: '12px',
								fontWeight: 'bold',
							}}
							onClick={handleOpenModal3}
							disabled={showButton3}
						>
							Acumulación de intereses
						</Button>
					</div>
					{modalOpen3 && <InterestAccrual onClose={handleCloseModal3} />}
					<div className="form-button">
						<Button
							style={{
								backgroundColor: '#810000',
								fontSize: '12px',
								fontWeight: 'bold',
								color: '#fff'
							}}
							disabled={showButton4}
							type="submit"
						>
							Generar Solicitud
						</Button>
					</div>
					{modalOpen4 && <Confirm onClose={handleCloseModal4} />}
				</Form>
			)
			}
			{/* {
				<div>
					<Modal
						keepMounted
						open={open}
						onClose={false}
						aria-labelledby="keep-mounted-modal-title"
						aria-describedby="keep-mounted-modal-description"
					>
						<Box sx={style}>
							<Typography sx={{ mb: 0.5, lineHeight: '2rem', }} color="text.primary" align='center'
								fontSize={30}>
								<span style={{ fontWeight: 'bold' }}>
									Transacción Exitosa
								</span>
							</Typography>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<img src="ok.png" alt="ok" style={{ width: '50%', height: 'auto', }} />
							</div>
							<Divider sx={{ backgroundColor: "#000" }} />
							<Button
								variant="contained"
								color="primary"
								style={{
									marginTop: '10px',
									marginLeft: '3rem',
									backgroundColor: '#00202E'
								}}
								onClick={handleNavigateToAccount}
							>
								REALIZAR OTRA TRANSACCIÓN
							</Button>
						</Box>
					</Modal>
				</div>
			} */}
		</Formik >
	);
}
