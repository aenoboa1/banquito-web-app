import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import '../css/styles.css';

const BasicCard = () => {
	// Función de manejo de envío del formulario
	const handleSubmit = (values) => {
		// Aquí puedes agregar la lógica para enviar los datos del formulario
		console.log(values);
	};

	// Función de validación del formulario
	const validateForm = (valores) => {
		const errores = {};

		// Validación del campo Monto
		if (!valores.monto) {
			errores.monto = 'El monto es requerido';
		} else if (isNaN(valores.monto) || parseFloat(valores.monto) <= 0) {
			errores.monto = 'El monto debe ser un número mayor a 0';
		} else if (!/^\d+(\.\d{1,2})?$/.test(valores.monto)) {
			errores.monto = 'El monto debe ser un número válido';
		}
		// Validación cedula
		if (!valores.cedula) {
			errores.cedula = 'El código del documento es requerido';
		} else if (!/^[0-9.]+$/.test(valores.cedula)) {
			errores.cedula = 'El código del documento solo puede contener números';
		} else if (valores.cedula.length !== 10) {
			errores.cedula = 'Por favor ingresa los 10 dígitos';
		}
		// Validación cuenta
		if (!valores.cuenta) {
			errores.cuenta = 'El n° de cuenta es requerido';
		} else if (!/^[0-9.]+$/.test(valores.cuenta)) {
			errores.cuenta = 'El el n° de cuenta solo puede contener números';
		} else if (valores.cuenta.length !== 10) {
			errores.cuenta = 'Por favor ingresa los 10 dígitos';
		}
		// Validacion nombre
		if (!valores.nombres) {
			errores.nombres = 'Los nombres son requeridos'
		} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombres)) {
			errores.nombres = 'El nombre solo puede contener letras y espacios.'
		}
		// Validacion apellido
		if (!valores.apellidos) {
			errores.apellidos = 'Los apellidos son requeridos'
		} else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellidos)) {
			errores.apellidos = 'El apellido solo puede contener letras y espacios.'
		}
		// Validacion correo
		if (!valores.email) {
			errores.email = 'El correo electronico es requerido'
		} else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
			errores.email = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
		}

		
		return errores;
	};

	return (
		<Formik
			initialValues={{
				monto: '',
				nombres: '',
				apellidos: '',
				email: '',
				cedula: '',
				cuenta: '',
			}}
			validate={validateForm}
			onSubmit={handleSubmit}
		>
			{({ errors, values, handleChange }) => (
				<Form className="formulario">
					<div style={{ marginLeft: '16rem' }}>
						<label htmlFor="nombre">Monto</label>
						<Field
							type="text"
							name="monto"
							label="Monto"
							onChange={handleChange}
							value={values.monto}
							style={{ marginLeft: '20%', marginBottom: '1rem' }}
						/>
						<ErrorMessage name="monto" component={() => (<div className="error" >
							{errors.monto}</div>)} />
					</div>

					<Box display="flex" justifyContent="center" my={2}>
						<Card sx={{ minWidth: 300 }}>
							<CardContent>
								<Typography variant="h6" gutterBottom>
									<span>AH0123</span><span style={{ marginLeft: '6rem' }}>1234567890</span>
								</Typography>
								<Divider sx={{ my: 1, height: 2 }} />
								<Typography variant="body2" gutterBottom>
									Saldo disponible<span style={{ marginLeft: '3rem' }}>$1909.09</span>
								</Typography>
							</CardContent>
						</Card>
					</Box>

					<Typography variant="h6" align="left" fontWeight='bold' marginBottom={'1rem'} marginLeft={'10rem'}>
						Datos del Beneficiario
					</Typography>
					<div style={{ marginLeft: '16rem', marginBottom: '10px' }}>
						<label htmlFor="nombre">Nombres</label>
						<Field
							type="text"
							name="nombres"
							label="Nombres"
							onChange={handleChange}
							value={values.nombres}
							sx={{ mb: 2 }}
							style={{ marginLeft: '17%' }}
						/>
						<ErrorMessage name="nombres" component={() => (<div className="error" >
							{errors.nombres}</div>)} />
					</div>
					<div style={{ marginLeft: '16rem', marginBottom: '10px' }}>
						<label htmlFor="nombre">Apellidos</label>
						<Field
							type="text"
							name="apellidos"
							label="Apellidos"
							onChange={handleChange}
							value={values.apellidos}
							sx={{ mb: 2 }}
							style={{ marginLeft: '16.8%' }}
						/>
						<ErrorMessage name="apellidos" component={() => (<div className="error" >
							{errors.apellidos}</div>)} />
					</div>
					<div style={{ marginLeft: '16rem', marginBottom: '10px' }}>
						<label htmlFor="nombre">Email</label>
						<Field
							type="email"
							name="email"
							label="Email"
							onChange={handleChange}
							value={values.email}
							sx={{ mb: 2 }}
							style={{ marginLeft: '21%' }}
						/>
						<ErrorMessage name="email" component={() => (<div className="error" >
							{errors.email}</div>)} />
					</div>
					<div style={{ marginLeft: '16rem', marginBottom: '10px' }}>
						<label htmlFor="nombre">Cédula</label>
						<Field
							type="text"
							name="cedula"
							label="Cédula"
							onChange={handleChange}
							inputProps={{ maxLength: 10 }}
							value={values.cedula}
							sx={{ mb: 2 }}
							style={{ marginLeft: '19.5%' }}
						/>
						<ErrorMessage name="cedula" component={() => (<div className="error" >
							{errors.cedula}</div>)} />
					</div>
					<div style={{ marginLeft: '16rem', marginBottom: '10px' }}>
						<label htmlFor="nombre">Número de cuenta</label>
						<Field
							type="text"
							name="cuenta"
							label="Número de cuenta"
							onChange={handleChange}
							inputProps={{ maxLength: 10 }}
							value={values.cuenta}
							sx={{ mb: 2 }}
							style={{ marginLeft: '7.7%' }}
						/>
						<ErrorMessage name="cuenta" component={() => (<div className="error" >
							{errors.cuenta}</div>)} />
					</div>
					<div className="form-button">
						<button
							type="submit"
							style={{ backgroundColor: '#810000', marginLeft: '-20px', fontSize: '12px', fontWeight: 'bold' }}>
							Guardar
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default BasicCard;
