import React, { useState } from 'react'
import type { ITableProps } from '../interfaces/Components'
import '../styles/components/Table.scss'

export const Table: React.FunctionComponent<ITableProps> = ({
  data,
  columns,
  pageSize = 10,
  handleGithubUserClick
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / pageSize)

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  data-label={col.header}
                  onClick={() => handleGithubUserClick(row)}
                >
                  {col.render ? col.render(row) : row[col.accessor || '']}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
