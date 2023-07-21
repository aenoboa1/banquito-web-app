/**
 =========================================================
 * Soft UI Dashboard React - v4.0.1
 =========================================================

 * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import Header from "pages/mi-perfil/components/Header";
import {useEffect, useState} from "react";
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import useStateContext from "../../hooks/useStateContext";

function MyProfile() {
    const [info, setInfo] = useState()
    const [isFetched, setIsFetched] = useState(false);
    const {context, setContext} = useStateContext()

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.accounts)
            .fetchById(12,
                {},
            )
            .then(res => {
                setInfo(res.data)
                setIsFetched(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <>
            <DashboardLayout>

                {isFetched ?
                    <>
                        <Header fullname={info.firstName.concat(" ", info.lastName)}/>
                        <SoftBox mt={5} mb={5}>
                            <Grid container spacing={5} direction="column"
                                  alignItems="center"
                            >
                                <Grid item>


                                    <ProfileInfoCard
                                        title="Datos Personales"
                                        info={{
                                            'Primer Nombre': info.firstName,
                                            'Segundo Nombre': info.lastName,
                                            'Tipo de Documento': info.typeDocumentId,
                                            'Dirección de Correo': info.emailAddress,
                                            'Genero': info.gender,
                                            'Fecha De Nacimiento': info.birthDate
                                        }}
                                        action={{route: "", tooltip: "Edit Profile"}}
                                    />


                                </Grid>
                            </Grid>
                        </SoftBox>

                    </> : null
                }
            </DashboardLayout>
        </>
    );
}

export default MyProfile;
