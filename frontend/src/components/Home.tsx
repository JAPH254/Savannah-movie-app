import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending, fetchSearch } from "../slices/MovieSlice";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";
import Navbar from "../components/Navbar";
import { RootState, AppDispatch } from "../store"; 
import { Movie } from "../types/movie";

export default function Home() {
  const d = useDispatch<AppDispatch>();
  const { list, q, status } = useSelector((s: RootState) => s.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (q) {
      d(fetchSearch({ q, page }));
    } else {
      d(fetchTrending(page));
    }
  }, [q, page, d]);

  return (
    <>
      <Navbar />
      <div className="mx-auto p-4">
        {status === "loading" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {list && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
              {list.results.map((m: Movie) => ( 
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

