'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCurrentPage, setItemsPerPage } from '@/store/slices/filterSlice'

interface PaginationProps {
  totalItems: number
}


export function Pagination({ totalItems }: PaginationProps) {
  const dispatch = useAppDispatch()
  const { currentPage, itemsPerPage } = useAppSelector(
    (state) => state.filter
  )

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  return (
    <div className="mt-8 space-y-4">
      <div className="card p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="items-per-page" className="text-sm font-medium">
            Items per page:
          </label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
            className="px-3 py-2 rounded-lg font-medium"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>

        <span className="text-sm text-foreground opacity-60">
          {totalItems > 0 ? `1-${Math.min(itemsPerPage, totalItems)}` : 0} of {totalItems} items
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
          disabled={currentPage === 1}
          className="btn-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              const diff = Math.abs(page - currentPage)
              return diff <= 1 || page === 1 || page === totalPages
            })
            .map((page, index, array) => (
              <div key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-2 py-1 text-foreground opacity-40">···</span>
                )}
                <button
                  onClick={() => dispatch(setCurrentPage(page))}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    currentPage === page
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {page}
                </button>
              </div>
            ))}
        </div>

        <button
          onClick={() =>
            dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))
          }
          disabled={currentPage === totalPages}
          className="btn-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>

        <span className="text-sm text-foreground opacity-60 ml-auto">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  )
}
