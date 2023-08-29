
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { GuarantorModal } from './GuarantorModal';
import { GuaranteeModal } from './GuaranteeModal';
import { InterestAccrual } from './InterestAccrual';
import { Box, Button, Divider, Modal, Typography, Grid, RadioGroup, FormControlLabel, Radio, MenuItem, TextField, Select, InputLabel } from '@mui/material';
import { Confirm } from './Confirm';

export default function BasicCard() {

	const tiposDocumentoNat = [
		{ key: 'CI', value: 'CI' },
		{ key: 'PASS', value: 'Pasaporte' },
		{ key: 'RUC', value: 'RUC' },
	];
	
	const tiposDocumentoJur = [
		{ key: 'RUC', value: 'RUC' },
	];

	const tiposPrestamo = [
		{ key: 'CUS', value: 'Personal' },
		{ key: 'CRE', value: 'Crédito' },
	];

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
			{({ values, handleChange }) => (
				<Form className="form-container">
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Box sx={{ marginTop: '1rem', marginBottom: '2.35rem' }}>
								<Field name="tipoCliente" type="radio" label>
									{({ field }) => (
										<RadioGroup {...field} row style={{
											marginLeft: '1rem',
											justifyContent: 'space-evenly'
										}}>
											<FormControlLabel value="natural" control={<Radio />}
												label="Natural" />
											<FormControlLabel value="juridico" control={<Radio />}
												label="Jurídico" />
										</RadioGroup>
									)}
								</Field>
								<ErrorMessage name="tipoCliente" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>
							{/* {errors.tipoCliente && touched.tipoCliente && <div >{errors.tipoCliente}
							</div>} */}

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
								<Field name="nombre" as={TextField} label="Nombre"
									fullWidth onChange={handleChange}
									value={values.nombre} type="text" />
								<ErrorMessage name="nombre" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
								<Field name="apellido" as={TextField} label="Apellido"
									fullWidth onChange={handleChange}
									value={values.apellido} />
								<ErrorMessage name="apellido" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
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
										Seleccionar el tipo de documento</option>
									{tiposDocumentoNat.map((tipo) => (
										<option key={tipo.key} value={tipo.value}>
											{tipo.value}
										</option>
									))}
								</Field>
								<ErrorMessage name="tipoDocumento" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
								<Field name="codigo" as={TextField} label="Código" fullWidth
									onChange={handleChange}
									value={values.codigo} />
								<ErrorMessage name="codigo" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
								<Field name="monto" as={TextField} label="Monto" fullWidth
									onChange={handleChange}
									value={values.monto} />
								<ErrorMessage name="monto" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>
						</Grid>

						<Grid item xs={6}>
							<Box sx={{ marginTop: '1rem', marginBottom: '2rem' }} className="form-field">
								<Field name="plazoMeses" as={TextField}
									label="Plazo para devolución (meses)"
									fullWidth onChange={handleChange}
									value={values.plazoMeses} />
								<ErrorMessage name="plazoMeses" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
								<Field as="select" id="tipoPrestamo" name="tipoPrestamo"
									style={{
										marginLeft: '1rem', width: '20rem',
										fontFamily: 'Arial, sans-serif', fontSize: '18px',
										textAlign: 'center', height: '2rem'
									}}>
									<option value="">Seleccionar el tipo de préstamo</option>
									{tiposPrestamo.map((tipo) => (
										<option key={tipo.key} value={tipo.value}>
											{tipo.value}
										</option>
									))}
								</Field>
								<ErrorMessage name="tipoPrestamo" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
								<Field name="tasaInteres" as={TextField} label="Tasa de interés"
									fullWidth onChange={handleChange}
									value={values.tasaInteres} />
								<ErrorMessage name="tasaInteres" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
								<Field name="tipoPeriodoGracia" as={TextField}
									label="Tipo de período de gracia" fullWidth
									onChange={handleChange}
									value={values.tipoPeriodoGracia} />
								<ErrorMessage name="tipoPeriodoGracia" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '1rem', marginBottom: '1rem' }} className="form-field">
								<Field name="periodoGracia" as={TextField} label="Período de gracia (meses)"
									fullWidth
									onChange={handleChange}
									value={values.periodoGracia} />
								<ErrorMessage name="periodoGracia" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>

							<Box sx={{ marginTop: '2rem', marginBottom: '2rem' }} className="form-field">
								<Field name="comisionMensual" as={TextField}
									label="Comisión mensual"
									fullWidth
									onChange={handleChange}
									value={values.comisionMensual}

								/>
								<ErrorMessage name="comisionMensual" component="div" className="error"
									style={{
										color: 'red', fontSize: '12px',
										fontFamily: 'Arial, sans-serif', marginLeft: '1rem'
									}} />
							</Box>
						</Grid>

						<Grid item xs={6}>
							<Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
								<Button
									style={{
										fontSize: '12px', fontWeight: 'bold',
										backgroundColor: '#232527', color: '#FFF'
									}}
									onClick={handleOpenModal}
									disabled={showButton1}
								>
									Agregar Garante
								</Button>
								{modalOpen1 && <GuarantorModal onClose={handleCloseModal} />}

								<Button
									style={{
										fontSize: '12px', fontWeight: 'bold',
										backgroundColor: '#232527', color: '#FFF'
									}}
									onClick={handleOpenModal2}
									disabled={showButton2}
								>
									Agregar Garantía
								</Button>
								{modalOpen2 && <GuaranteeModal onClose={handleCloseModal2} />}
							</Box>
						</Grid>

						{/* Segunda columna */}
						<Grid item xs={6}>
							<Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
								<Button
									style={{
										fontSize: '12px', fontWeight: 'bold',
										backgroundColor: '#232527', color: '#FFF'
									}}
									onClick={handleOpenModal3}
									disabled={showButton3}
								>
									Acumulación de intereses
								</Button>
								{modalOpen3 && <InterestAccrual onClose={handleCloseModal3} />}

								<Button
									style={{
										backgroundColor: '#810000', fontSize: '12px',
										fontWeight: 'bold', color: '#fff'
									}}
									disabled={showButton4}
									type="submit"
								>
									Generar Solicitud
								</Button>
								{modalOpen4 && <Confirm onClose={handleCloseModal4} />}
							</Box>
						</Grid>

					</Grid>
				</Form>
			)}
		</Formik>
	);
}
