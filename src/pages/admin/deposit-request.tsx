import { Box, SimpleGrid } from "@chakra-ui/react";
import useDepositRequest from "hooks/useDepositRequest";
import AdminLayout from "layouts/admin";
import DepositRequestTable from "views/admin/dataTables/components/depositRequestTable";
import { depositRequestColumns } from "views/admin/dataTables/variables/columnsData";
import { TableData } from "views/admin/default/variables/columnsData";

export default function DepositRequest() {
  const { depositTableData, mutate } = useDepositRequest();

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          {depositTableData && (
            <DepositRequestTable
              columnsData={depositRequestColumns}
              tableData={depositTableData as unknown as TableData[]}
              mutate={mutate}
            />
          )}
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
