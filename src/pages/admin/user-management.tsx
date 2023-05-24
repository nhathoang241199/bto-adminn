import { Box, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import { TableData } from "views/admin/default/variables/columnsData";
import useAdminUser from "hooks/useAdminUser";
import AdminUserTable from "views/admin/userManagement/components/adminUserTable";
import PortalUserTable from "views/admin/userManagement/components/portalUserTable";
import {
  adminUserColumns,
  blackListColumns,
  portalUserColumns,
} from "views/admin/userManagement/variables/columnsData";
import usePortalUser from "hooks/usePortalUser";
import BlackListTable from "views/admin/userManagement/components/blackListTable";
import useBlackList from "hooks/useBlackList";

export default function UserManagement() {
  const { adminUserTableData, isLoading } = useAdminUser();
  const { portalUserTableData, isLoading: isLoadingUserPortal } =
    usePortalUser();
  const { blackListTableData, isLoading: isLoadingBlackList } = useBlackList();

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
            />
          )}
          {portalUserTableData && (
            <PortalUserTable
              columnsData={portalUserColumns}
              tableData={portalUserTableData as unknown as TableData[]}
            />
          )}
          {blackListTableData && (
            <BlackListTable
              columnsData={blackListColumns}
              tableData={blackListTableData as unknown as TableData[]}
            />
          )}
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
