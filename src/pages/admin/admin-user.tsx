import { Box, SimpleGrid } from "@chakra-ui/react";
import useAdminUser from "hooks/useAdminUser";
import AdminLayout from "layouts/admin";
import { TableData } from "views/admin/default/variables/columnsData";
import AdminUserTable from "views/admin/userManagement/components/adminUserTable";
import { adminUserColumns } from "views/admin/userManagement/variables/columnsData";

export default function AdminUser() {
  const { adminUserTableData, mutate } = useAdminUser();

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          {adminUserTableData && (
            <AdminUserTable
              columnsData={adminUserColumns}
              tableData={adminUserTableData as unknown as TableData[]}
              mutate={mutate}
            />
          )}
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
