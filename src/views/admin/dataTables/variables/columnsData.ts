interface IColumnHeader {
  Header: string;
  accessor: string;
}

type Columns = IColumnHeader[];

export const columnsDataDevelopment: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataCheck: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataColumns: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataComplex: Columns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const depositRequestColumns: Columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "USER NAME",
    accessor: "username",
  },
  {
    Header: "FROM WALLET",
    accessor: "fromWallet",
  },
  {
    Header: "TO WALLET",
    accessor: "toWallet",
  },
  {
    Header: "HASH",
    accessor: "hash",
  },
  {
    Header: "AMOUNT",
    accessor: "amount",
  },
  {
    Header: "COIN NAME",
    accessor: "coinName",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
];
export const withdrawRequestColumns: Columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "USER NAME",
    accessor: "username",
  },
  {
    Header: "FROM WALLET",
    accessor: "fromWallet",
  },
  {
    Header: "TO WALLET",
    accessor: "toWallet",
  },
  {
    Header: "HASH",
    accessor: "hash",
  },
  {
    Header: "AMOUNT",
    accessor: "amount",
  },
  {
    Header: "COIN NAME",
    accessor: "coinName",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "ACTIONS",
    accessor: "actions",
  },
];
