import { Box, SimpleGrid } from "@chakra-ui/react";
import usePortalUser from "hooks/usePortalUser";
import AdminLayout from "layouts/admin";
import { TableData } from "views/admin/default/variables/columnsData";
import PortalUserTable from "views/admin/userManagement/components/portalUserTable";
import { portalUserColumns } from "views/admin/userManagement/variables/columnsData";

export default function PortalUser() {
  const {
    portalUserTableData,
    isLoading: isLoadingUserPortal,
    mutate: mutatePortalUser,
  } = usePortalUser();

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          {portalUserTableData && (
            <PortalUserTable
              columnsData={portalUserColumns}
              tableData={portalUserTableData as unknown as TableData[]}
              mutate={mutatePortalUser}
            />
          )}
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
