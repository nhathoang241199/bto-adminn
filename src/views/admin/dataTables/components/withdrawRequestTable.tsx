import {
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import {
  ColumnData,
  TableData,
  TableProps,
} from "views/admin/default/variables/columnsData";
import useApi from "hooks/useApi";

type Props = {
  columnsData: ColumnData;
  tableData: any;
  mutate: any;
  walletData: any;
};

export default function WithdrawRequestTable(props: Props) {
  const { columnsData, tableData, walletData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const { rejectWithdraw, aprroveWithdraw, loading } = useApi();
  const [fromAdminWallet, setFromAdminWallet] = useState(
    walletData?.[0]?.address || "",
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedRequestId, setSelectedRequestId] = useState("0");

  const handleChooseAdminWallet = (event: ChangeEvent<HTMLSelectElement>) => {
    setFromAdminWallet(event.target.value);
  };

  const handleApprove = async () => {
    const adminWallet = walletData.find(
      (item: any) => item.address === fromAdminWallet,
    );
    const withdrawRequest = tableData.find(
      (item: any) => item.id === selectedRequestId,
    );

    if (adminWallet.balance < withdrawRequest.amount) {
      toast({
        title: "Approve fail",
        description: "Wallet balance is not enough",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      await aprroveWithdraw(selectedRequestId, fromAdminWallet);
      onClose();
      props.mutate();
    }
  };

  const handleReject = async (requestId: string) => {
    await rejectWithdraw(requestId);
    props.mutate();
  };
  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "scroll" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Admin user
        </Text>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data;
                  if (cell.column.Header === "ID") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "USER NAME") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "FROM WALLET") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {`${cell.value.slice(0, 6)}...${cell.value.slice(
                          cell.value.length - 4,
                          cell.value.length,
                        )}`}
                      </Text>
                    );
                  } else if (cell.column.Header === "TO WALLET") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {`${cell.value.slice(0, 6)}...${cell.value.slice(
                          cell.value.length - 4,
                          cell.value.length,
                        )}`}
                      </Text>
                    );
                  } else if (cell.column.Header === "HASH") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {`${cell.value.slice(0, 6)}...${cell.value.slice(
                          cell.value.length - 4,
                          cell.value.length,
                        )}`}
                      </Text>
                    );
                  } else if (cell.column.Header === "AMOUNT") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "COIN NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <Flex color={textColor} fontSize="sm" fontWeight="700">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "approval"
                              ? "green.500"
                              : cell.value === "pending"
                              ? "orange.500"
                              : "red.500"
                          }
                          as={
                            cell.value === "approval"
                              ? MdCheckCircle
                              : cell.value === "pending"
                              ? MdOutlineError
                              : MdCancel
                          }
                        />
                        {cell.value}
                      </Flex>
                    );
                  } else if (
                    cell.column.Header === "ACTIONS" &&
                    row.cells[8].value === "pending"
                  ) {
                    data = (
                      <Flex
                        color={textColor}
                        fontSize="sm"
                        fontWeight="700"
                        gap={2}
                      >
                        <Button
                          onClick={() => {
                            setSelectedRequestId(row.cells[0].value);
                            onOpen();
                          }}
                          size="sm"
                          variant="link"
                          colorScheme={"green"}
                        >
                          Approve
                        </Button>
                        /
                        <Button
                          onClick={() => handleReject(row.cells[0].value)}
                          size="sm"
                          variant="link"
                          colorScheme={"red"}
                        >
                          Reject
                        </Button>
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <div className="pagination">
        <Button
          variant="link"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>{" "}
        <Button
          variant="link"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <Button
          variant="link"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>{" "}
        <Button
          variant="link"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>{" "}
        <span>
          | Go to page:{" "}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose admin wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select onChange={handleChooseAdminWallet} value={fromAdminWallet}>
              {walletData &&
                walletData.map(
                  (wallet: { address: string; balance: number }) => (
                    <option key={wallet.address} value={wallet.address}>
                      {`${wallet.address.slice(0, 6)}...${wallet.address.slice(
                        wallet.address.length - 4,
                        wallet.address.length,
                      )}`}
                      {"     "}({wallet.balance.toFixed(2)} USDT)
                    </option>
                  ),
                )}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={loading}
              onClick={handleApprove}
              type="submit"
              colorScheme="brand"
            >
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
