interface IColumnHeader {
  Header: string;
  accessor: string;
}

type Columns = IColumnHeader[];

export const adminUserColumns: Columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "USER NAME",
    accessor: "username",
  },
  {
    Header: "ROLE",
    accessor: "role",
  },
];

export const portalUserColumns: Columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "ACTIVE",
    accessor: "active",
  },
  {
    Header: "AFF CODE",
    accessor: "affCode",
  },
  {
    Header: "USER NAME",
    accessor: "username",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "RANK",
    accessor: "rank",
  },
  {
    Header: "REGISTERED",
    accessor: "registered",
  },
  {
    Header: "ACTION",
    accessor: "action",
  },
];

export const blackListColumns: Columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "ACTIVE",
    accessor: "active",
  },
  {
    Header: "AFF CODE",
    accessor: "affCode",
  },
  {
    Header: "USER NAME",
    accessor: "username",
  },
  {
    Header: "EMAIL",
    accessor: "email",
  },
  {
    Header: "RANK",
    accessor: "rank",
  },
  {
    Header: "REGISTERED",
    accessor: "registered",
  },
  {
    Header: "ACTION",
    accessor: "action",
  },
];
