export function getHeaderList() {
  return [
    {
      Header: 'NAME',
      accessor: 'name',
    },
    {
      Header: 'TYPE',
      accessor: 'type',
    },
    {
      Header: 'VALUE',
      accessor: 'value',
    },
    {
      Header: 'MAX USERS',
      accessor: 'maxUsers',
    },
    {
      Header: 'USED COUNT',
      accessor: 'usedCount',
    },
    {
      Header: 'START DATE',
      accessor: 'startDate',
    },
    {
      Header: 'END DATE',
      accessor: 'endDate',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ]
}
