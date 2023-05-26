interface IColumnHeader {
  Header: string;
  accessor: string;
}

type Columns = IColumnHeader[];

export const adminWalletColumns: Columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "ACTIVE",
    accessor: "active",
  },
  {
    Header: "ADDRESS",
    accessor: "address",
  },
  {
    Header: "ROLE",
    accessor: "role",
  },
  {
    Header: "CREATE AT",
    accessor: "createdAt",
  },
  {
    Header: "BALANCE",
    accessor: "balance",
  },
];
