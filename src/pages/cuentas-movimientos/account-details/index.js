import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AccountProductsDetail from "./AccountProductDetail";

function TransactionsDetail() {
    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <AccountProductsDetail/>
        </DashboardLayout>
    );
}

export default TransactionsDetail;
