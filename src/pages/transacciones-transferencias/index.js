import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { ConfirmTransfer } from "./components/ConfirmTransfer";
import {BasicCard} from "./components/BasicCard";



function Transferencias() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
        <BasicCard/>
    </DashboardLayout>
  );
}

export default Transferencias;
