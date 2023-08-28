import React, { useState, useEffect } from 'react';
import {Chip, Paper} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { DataGrid, esES } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import numeral from 'numeral';
import {ArrowDownward, ArrowUpward, Cancel, CheckCircleOutline, DoneAll} from "@mui/icons-material"; // Import numeral.js

export default function DetailGrid() {
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.accountTransaction)
            .fetchTransactionHistory(data.codeInternalAccount)
            .then((res) => {
                console.log(res.data);
                setTransactions(res.data); // Use the provided JSON data here
            })
            .catch((err) => {});

    }, []);

    const columns = [
        {
            field: 'creationDate',
            headerName: 'Fecha',
            width: 150,
            valueFormatter: ({ value }) => {
                const formattedDate = new Date(value).toLocaleDateString('es-ES');
                return formattedDate;
            },
        },

        {
            field: 'reference',
            headerName: 'Descripción',
            width: 400,
            renderCell: (params) => {
                const boldTextStyle = {
                    fontWeight: 'bold',
                };

                return (
                    <div style={boldTextStyle}>
                        {params.value}
                    </div>
                );
            },
        },

        {
            field: 'amount',
            headerName: 'Monto',
            width: 150,
            renderCell: (params) => {
                const isCredit = params.row.transactionType === 'CRED';
                const formattedAmount = numeral(params.value).format('$0,0.00');
                const cellStyle = {
                    backgroundColor: isCredit ? '#AEEEEE' : '#FFC0CB',
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    borderRadius: '4px', // Optional: Add some rounded corners
                };

                return (
                    <div >
                        {formattedAmount}
                    </div>
                );
            },
        },
        {
            field: 'transactionType',
            headerName: 'Tipo',
            width: 150,
            renderCell: (params) => {
                const isCredit = params.value === 'CRED';
                const label = isCredit ? 'Crédito' : 'Débito';
                const icon = isCredit ? <ArrowUpward /> : <ArrowDownward />;
                const color = isCredit ? 'primary' : 'secondary';

                return (
                    <Chip
                        icon={icon}
                        label={label}
                        color={color}
                    />
                );
            },
        },
        { field: 'debtorAccount', headerName: 'Cuenta del Destinatario', width: 250 },
        {
            field: 'state',
            headerName: 'Estado',
            width: 150,
            renderCell: (params) => {
                const stateMapping = {
                    POS: { label: 'Publicado', icon: <CheckCircleOutline/>, color: 'success' },
                    EXE: { label: 'Ejecutado', icon: <DoneAll/>, color: 'success' }, // Updated color to 'success'
                    REV: { label: 'Revertido', icon: <Cancel/>, color: 'error' },
                };
                const stateInfo = stateMapping[params.value] || { label: params.value, icon: null, color: 'default' };

                return (
                    <Chip
                        icon={stateInfo.icon}
                        label={stateInfo.label}
                        color={stateInfo.color}
                    />
                );
            },
        },
    ];

    const MyCustomNoRowsOverlay = () => (
        <Typography>No tiene transacciones</Typography>
    );

    return (
        <div className="card">
            <DataGrid
                rows={transactions}
                columns={columns}
                autoHeight
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                pageSize={10}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{
                    noRowsOverlay: MyCustomNoRowsOverlay
                }}
                getRowId={(row) => row.uniqueKey} // Specify the uniqueKey property as the row id
            />
        </div>
    );
}
