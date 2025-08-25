type Props = {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
};

export default function Pagination({ page, totalPages, onPage }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200"
      >
        Prev
      </button>
      <span className="text-sm font-medium">
        Page {page} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
}
