'use client';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationWrapperProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PaginationWrapper: React.FC<PaginationWrapperProps> = ({ page, totalPages, setPage }) => {
  return (
    <div className="w-full flex justify-start mt-4">
      <Pagination className="text-teal-800">
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              <PaginationPrevious href="#" />
            </button>
          </PaginationItem>

          {/* First Page */}
          <PaginationItem>
            <button onClick={() => setPage(1)}>
              <PaginationLink href="#" isActive={page === 1}>1</PaginationLink>
            </button>
          </PaginationItem>

          {/* Left Ellipsis */}
          {page > 3 && (
            <PaginationItem>
              <span className="px-2">...</span>
            </PaginationItem>
          )}

          {/* Middle Pages */}
          {[-1, 0, 1].map((offset) => {
            const p = page + offset;
            if (p > 1 && p < totalPages) {
              return (
                <PaginationItem key={p}>
                  <button onClick={() => setPage(p)}>
                    <PaginationLink href="#" isActive={page === p}>
                      {p}
                    </PaginationLink>
                  </button>
                </PaginationItem>
              );
            }
            return null;
          })}

          {/* Right Ellipsis */}
          {page < totalPages - 2 && (
            <PaginationItem>
              <span className="px-2">...</span>
            </PaginationItem>
          )}

          {/* Last Page */}
          {totalPages > 1 && (
            <PaginationItem>
              <button onClick={() => setPage(totalPages)}>
                <PaginationLink href="#" isActive={page === totalPages}>
                  {totalPages}
                </PaginationLink>
              </button>
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <button
              onClick={() => setPage(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
            >
              <PaginationNext href="#" />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWrapper;
