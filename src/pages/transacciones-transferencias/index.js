import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BasicCard from "./components/BasicCard";
import { ConfirmTransfer } from "./components/ConfirmTransfer";



function Transferencias() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <BasicCard />
    </DashboardLayout>
  );
}

export default Transferencias;
