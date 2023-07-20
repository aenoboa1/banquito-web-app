import React, {useState, useEffect} from 'react';
import {Button, Divider, Breadcrumbs, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {AccountProductService} from "../service/AccountProductService";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SoftBox from "../../../components/SoftBox";
import SoftButton from "../../../components/SoftButton";
import {AccountBalanceWallet, FolderDelete} from "@mui/icons-material";
import Icon from "../../../assets/theme/components/icon";
import SoftTypography from "../../../components/SoftTypography";

export const AccountProduct = () => {

    const items = [{label: 'Mis Productos'}, {label: 'Cuentas'}];
    const home = {icon: 'pi pi-home'}
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [data, setData] = useState({data: []});
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        AccountProductService.getAccountProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    const listItem = (product) => {
        return (
            <Grid item xs={20}>
                <SoftBox display="flex" flexDirection="column" alignItems="flex-start" p={4} gap={4}>
                    <div className="col-12">
                        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                            <div
                                className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">

                                <div className="flex flex-column align-items-center sm:align-items-start gap-3">

                                    <div className="text-2xl font-bold text-900">{product.id}</div>
                                    <div className="text-2xl font-bold text-900">{product.code}</div>
                                    <div className="flex align-items-center gap-3">

                                <span className="flex align-items-center gap-2">
                                    <Button label="Detalle" id={product.id} icon="pi pi-money-bill" size="small" rounded
                                            onClick={() =>
                                                navigate('detail', {state: product})
                                            }>
                                    </Button>
                                </span>

                                    </div>
                                </div>

                                <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={2}>
                                    <Typography variant="subtitle1" component="span" fontWeight="600">
                                        Saldo disponible: ${product.availableBalance}
                                    </Typography>
                                    <Typography variant="h6" component="span" fontWeight="600">
                                        Saldo Contable: ${product.totalBalance}
                                    </Typography>
                                </Box>

                            </div>
                        </div>
                    </div>
                </SoftBox>
            </Grid>
        );
    };


    const gridItem = (product) => {
        return (
            <Grid item xs={20} sm={12} lg={12} xl={4} p={4}>
                <SoftBox p={5} borderRadius="5%" shadow={"sm"}>

                    <Grid container spacing={2}>
                        <Grid item xs={6} md={8}>
                            <SoftTypography component="span" fontWeight="600">
                                {product.id}
                            </SoftTypography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <SoftTypography component="span" fontWeight="600">
                                {product.code}
                            </SoftTypography>
                        </Grid>
                    </Grid>


                    <Divider/>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} py={2}>

                        <Typography variant="subtitle3" component="span" fontWeight="600">

                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={6} md={8}>
                                <Typography component="span" fontWeight="600">
                                    Saldo disponible:
                                </Typography>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Typography component="span" fontWeight="600">
                                    ${product.availableBalance}
                                </Typography>
                            </Grid>
                        </Grid>

                        <SoftButton label="Detalle" id={product.id} startIcon={<AccountBalanceWallet/>}
                                    onClick={() =>
                                        navigate('detail', {state: product})
                                    }
                                    variant={"gradient"}
                                    color={"dark"}


                        >
                            Detalle
                        </SoftButton>


                    </Box>
                </SoftBox>
            </Grid>
        );
    };

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return listItem(product);
        else if (layout === 'grid')
            return gridItem(product);
    };


    return (
        <div>

            {/*() <Breadcrumbs aria-label="breadcrumb">
                {items.map((item, index) => (
                    <Typography
                        key={index}
                        color={index === items.length - 1 ? 'textPrimary' : 'inherit'}
                    >
                        {item.label}
                    </Typography>
                ))}
            </Breadcrumbs>*/}


            <Grid container spacing={2}>
                {products.map((product) => itemTemplate(product, layout))}
            </Grid>
        </div>
    )

}