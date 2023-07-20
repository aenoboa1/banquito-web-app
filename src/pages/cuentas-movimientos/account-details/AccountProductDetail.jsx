import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import DetailGrid from "../components/DetailGrid";
import {useLocation, useNavigate} from "react-router-dom";

export default function AccountProductsDetail() {
    const location = useLocation();
    const data = location.state;
    const items = [
        {label: 'Mis Productos', href: '#'},
        {label: 'Cuentas', href: '#'},
        {label: data.id, href: '/accounts/'},
        {label: 'Últimos Movimientos', href: '#'}
    ];

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts([data]);
    }, []);

    const gridItem = (product) => {
        return (
            <Grid item xs={12} sm={12} lg={12} xl={4} p={4}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">{product.id}</span>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">{product.code}</span>
                        </div>
                    </div>
                    <Divider/>
                    <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">Saldo disponible</div>
                        <div className="text-2xl font-bold">${product.availableBalance}</div>
                    </div>
                </div>
            </Grid>
        );
    };

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'grid')
            return gridItem(product);
    };

    return (
        <div>
            {/*<Breadcrumbs aria-label="breadcrumb">
                {items.map((item, index) => (
                    index === items.length - 1 ?
                        <Link key={index} color="inherit" href={item.href}>
                            {item.label}
                        </Link> :
                        <Link key={index} color="inherit" href={item.href} onClick={() => navigate(item.href)}>
                            {item.label}
                        </Link>
                ))}
            </Breadcrumbs>*/}


            <DetailGrid/>

        </div>
    )
}
