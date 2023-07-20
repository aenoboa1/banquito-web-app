import React, {useState, useEffect} from 'react';
import {Paper} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {DataGrid, esES} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";

export default function DetailGrid() {
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();
    const data = location.state;

    useEffect(() => {

        setTransactions(data.accountTransactions);
    }, [data.accountTransactions]);

    const columns = [
        {field: 'date', headerName: 'Fecha', width: 150},
        {field: 'reference', headerName: 'Descripción', width: 250},
        {field: 'amount', headerName: 'Monto', width: 150},
        {field: 'type', headerName: 'Tipo', width: 150},
        {field: 'id', headerName: 'Código', width: 150},
        {field: 'debtor', headerName: 'Destinatario', width: 250},
        {field: 'balance', headerName: 'Saldo', width: 150},
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
            />
        </div>
    );
}
