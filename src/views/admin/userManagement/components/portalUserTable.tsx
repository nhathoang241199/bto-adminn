import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "components/card/Card";
import useApi from "hooks/useApi";
import { useForm } from "react-hook-form";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { TableProps } from "views/admin/default/variables/columnsData";
import * as yup from "yup";

export type TChangePassword = {
  password: string;
  confirmPassword: string;
};

export default function PortalUserTable(props: TableProps) {
  const { columnsData, tableData } = props;
  const { changeUserPassword, banUser } = useApi();
  const columns = useMemo(() => columnsData, [columnsData]);
  const {
    isOpen: isOpenBanDialog,
    onOpen: onOpenBanDialog,
    onClose: onCloseBanDialog,
  } = useDisclosure();
  const data = useMemo(() => tableData, [tableData]);

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter a password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password confirmation do not match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TChangePassword>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TChangePassword) => {
    changeUserPassword({ userId: targetUserId, password: data.password });
    onClose();
    reset();
    props.mutate();
  };

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
  const banScheme = yup.object().shape({
    reason: yup.string().required("Please enter a reason"),
  });
  const [targetUserId, setTargetUserId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChangePasswordClick = (userId: string) => {
    onOpen();
    setTargetUserId(userId);
  };
  const handleBanClick = (userId: string) => {
    onOpenBanDialog();
    setTargetUserId(userId);
  };
  const {
    register: banRegister,
    handleSubmit: banHandleSubmit,
    reset: resetHandleSubmit,
    formState: { errors: banErrors },
  } = useForm<{ reason: string }>({
    resolver: yupResolver(banScheme),
  });
  const onSubmitBan = async (data: { reason: string }) => {
    await banUser({ userId: targetUserId, reason: data.reason });
    onCloseBanDialog();
    resetHandleSubmit();
    props.mutate();
  };
  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Portal user
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
                  } else if (cell.column.Header === "ACTIVE") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          <Icon
                            w="24px"
                            h="24px"
                            me="5px"
                            color={cell.value ? "green.500" : "red.500"}
                            as={cell.value ? MdCheckCircle : MdCancel}
                          />
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "AFF CODE") {
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
                  } else if (cell.column.Header === "EMAIL") {
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
                  } else if (cell.column.Header === "RANK") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "REGISTERED") {
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
                  } else if (cell.column.Header === "ACTION") {
                    data = (
                      <Flex align="center" direction="column" gap={2}>
                        <Button
                          variant="link"
                          size="sm"
                          colorScheme="brand"
                          onClick={() =>
                            handleChangePasswordClick(row.cells[0].value)
                          }
                        >
                          Change password
                        </Button>
                        <Button
                          size="sm"
                          variant="link"
                          colorScheme="red"
                          w="full"
                          onClick={() => handleBanClick(row.cells[0].value)}
                        >
                          Lock
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          reset();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isInvalid={!!errors.password}>
                <Input
                  mb="16px"
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <FormErrorMessage>
                    {errors.password?.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <Input
                  mt="16px"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <FormErrorMessage>
                    {errors.confirmPassword?.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              colorScheme="brand"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenBanDialog}
        onClose={() => {
          resetHandleSubmit();
          onCloseBanDialog();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reason</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isInvalid={!!banErrors.reason}>
                <Textarea
                  {...banRegister("reason")}
                  maxLength={1000}
                  placeholder="Enter the reason..."
                />
                {banErrors.reason && (
                  <FormErrorMessage>
                    {banErrors.reason?.message?.toString()}
                  </FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                resetHandleSubmit();
                onCloseBanDialog();
              }}
            >
              Close
            </Button>
            <Button
              onClick={banHandleSubmit(onSubmitBan)}
              type="submit"
              colorScheme="brand"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
