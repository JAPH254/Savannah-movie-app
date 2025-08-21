import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MovieList: React.FC = () => {
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      {loading && <Loader />}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
