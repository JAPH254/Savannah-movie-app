import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchTrending, fetchSearch } from "../slices/moviesSlice";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";
import Navbar from "../components/Navbar";

export default function Home() {
  const d = useAppDispatch();
  const { list, q, status } = useAppSelector((s) => s.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    q ? d(fetchSearch({ q, page })) : d(fetchTrending(page));
  }, [q, page]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        {status === "loading" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {list && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {list.results.map((m) => (
                <MovieCard key={m.id} m={m} />
              ))}
            </div>
            <Pagination
              page={list.page}
              totalPages={Math.min(list.total_pages, 500)}
              onPage={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}
