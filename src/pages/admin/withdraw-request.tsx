import { Box, SimpleGrid } from "@chakra-ui/react";
import useAdminWallet from "hooks/useAdminWallet";
import useWithdrawRequest from "hooks/useWithdrawRequest";
import AdminLayout from "layouts/admin";
import WithdrawRequestTable from "views/admin/dataTables/components/withdrawRequestTable";
import { withdrawRequestColumns } from "views/admin/dataTables/variables/columnsData";
import { TableData } from "views/admin/default/variables/columnsData";

export default function WithdrawRequest() {
  const { adminWalletTableData, isError } = useAdminWallet();
  const { withdrawTableData, mutate } = useWithdrawRequest();

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          {withdrawTableData && (
            <WithdrawRequestTable
              columnsData={withdrawRequestColumns}
              tableData={withdrawTableData as unknown as TableData[]}
              mutate={mutate}
              walletData={adminWalletTableData}
            />
          )}
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
