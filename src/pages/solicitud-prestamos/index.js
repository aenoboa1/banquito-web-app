import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Instrumentation from "./instrumentation-step1/Instrumentation";

function Prestamos() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Instrumentation />
    </DashboardLayout>
  );
}

export default Prestamos;
