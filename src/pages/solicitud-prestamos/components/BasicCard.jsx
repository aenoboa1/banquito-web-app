import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import '../css/styles.css';

const bull = (
	<Box
		component="span"
		sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	>
	</Box>
);

export default function BasicCard() {

	const [selectedValue, setSelectedValue] = useState('');
	const tiposDocumento = ['CI', 'Pasaporte', 'RUC'];
	const tiposPrestamo = ['Personal', 'Crédito'];
	const tiposPeriodoGracia = ['interes', 'completo', 'parcial'];

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
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
	// Define la función para manejar la presentación de los datos del formulario
	const handleSubmit = (values) => {
		// Aquí puedes hacer lo que desees con los valores seleccionados
		console.log(values);
	};

	return (
		<Formik
			initialValues={initialValues}
			validate={(valores) => {
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
				return errores;
			}}
			onSubmit={handleSubmit}
		>
			{({ errors, values, handleChange }) => (
				<Form className="form-container" >
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						{/* Columna 1 */}
						<div>
							<div className="radio-container">
								<label htmlFor="nombre" style={{ fontWeight: 'bold' }}>Tipo:</label>
								<Field
									type="radio"
									name="tipoCliente"
									value="nat"
									style={{ marginLeft: '30%' }}
								/>
								<label style={{ marginLeft: '5%', fontSize: '16px' }}>Natural</label>

								<Field
									type="radio"
									name="tipoCliente"
									value="jur"
								/>
								<label style={{ marginLeft: '5%', fontSize: '16px' }}>Jurídico</label>
							</div>
							<div className="form-field">
								<label htmlFor="nombre">Nombre:</label>
								<Field
									type="text"
									id="nombre"
									name="nombre"
									// as={TextField}
									onChange={handleChange}
									value={values.nombre}
								/>
								<ErrorMessage name="nombre" component={() => (<div className="error" >
									{errors.nombre}</div>)} />
							</div>
							<div className="form-field">
								<label htmlFor="apellido">Apellido:</label>
								<Field
									type="text"
									id="apellido"
									name="apellido"
								/>
								<ErrorMessage name="apellido" component="div" className="error" />
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
								<ErrorMessage name="tipoDocumento" component="div" className="error" />
							</div>
							<div className="form-field">
								<label htmlFor="codigo">Código de documento:</label>
								<Field
									type="text"
									id="codigo"
									name="codigo"
								/>
								<ErrorMessage name="codigo" component="div" className="error" />
							</div>
							<div className="form-field">
								<label htmlFor="monto">Monto:</label>
								<Field type="text" id="monto" name="monto" />
								<ErrorMessage name="monto" component="div" className="error" />
							</div>
							<div className="form-field">
								<label htmlFor="plazoMeses">Plazo para devolución (meses):</label>
								<Field
									type="text"
									id="plazoMeses"
									name="plazoMeses"
								/>
								<ErrorMessage name="plazoMeses" component="div" className="error" />
							</div>
						</div>

						{/* Columna 2 */}
						<div>
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
								<ErrorMessage name="tipoPrestamo" component="div" className="error" />
							</div>
							<div className="form-field">
								<label htmlFor="tasaInteres">Tasa de interés:</label>
								<Field
									type="text"
									id="tasaInteres"
									name="tasaInteres"
								/>
								<ErrorMessage name="tasaInteres" component="div" className="error" />
							</div>
							<div className="form-field">
								<label htmlFor="tipoPeriodoGracia">Tipo de período de gracia:</label>
								<Field as="select" id="tipoPeriodoGracia" name="tipoPeriodoGracia">
									<option value="">Seleccionar</option>
									{tiposPeriodoGracia.map((tipo) => (
										<option key={tipo} value={tipo}>
											{tipo}
										</option>
									))}
								</Field>
								<ErrorMessage name="tipoPeriodoGracia" component="div" className="error" />
							</div>
							<div className="form-field">
								<label htmlFor="periodoGracia">Período de gracia (meses):</label>
								<Field
									type="text"
									id="periodoGracia"
									name="periodoGracia"
								/>
								<ErrorMessage name="periodoGracia" component="div" className="error" />
							</div>
							<div className="form-field">
								<label htmlFor="comisionMensual">Comisión mensual:</label>
								<Field
									type="text"
									id="comisionMensual"
									name="comisionMensual"
								/>
								<ErrorMessage name="comisionMensual" component="div" className="error" />
							</div>
						</div>
					</div>
					<div className="form-button">
						<button
							type="submit"
							style={{
								// marginBottom: '10px',
								// marginLeft: '12rem',
								backgroundColor: '#810000'
							}}>
							Generar Solicitud
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
