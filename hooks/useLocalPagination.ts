export const useLocalPagination = <T>({
  data,
  pageNumber,
  pageSize,
  searchTerm = '',
  searchFields = [],
}: {
  data: T[]
  pageSize: number
  pageNumber: number
  searchTerm?: string
  searchFields?: (keyof T)[]
}) => {
  const filteredData = searchTerm
    ? data.filter((item) =>
        searchFields.some((field) => {
          const fieldValue = item[field]
          return fieldValue
            ? String(fieldValue).toLowerCase().includes(searchTerm.toLowerCase())
            : false
        })
      )
    : data

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / pageSize)

  const dataSource = filteredData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  return {
    dataSource,
    totalItems,
    totalPages,
  }
}
