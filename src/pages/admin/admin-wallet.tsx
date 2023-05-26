import { Box, SimpleGrid } from "@chakra-ui/react";
import useAdminWallet from "hooks/useAdminWallet";
import AdminLayout from "layouts/admin";
import AdminWalletTable from "views/admin/adminWallet/components/adminWallet";
import { adminWalletColumns } from "views/admin/adminWallet/variables/columnsData";
import { TableData } from "views/admin/default/variables/columnsData";

export default function AdminWallet() {
  const { adminWalletTableData, mutate } = useAdminWallet();

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          {adminWalletTableData && (
            <AdminWalletTable
              columnsData={adminWalletColumns}
              tableData={adminWalletTableData as unknown as TableData[]}
              mutate={mutate}
            />
          )}
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
