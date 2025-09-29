import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../MovieCard";
import { Movie } from "../../types/movie";

// sample movie object
const movie: Movie = {
  id: 1,
  title: "Inception",
  release_date: "2010-07-16",
  vote_average: 8.8,
  vote_count: 12000,
  overview: "A thief who steals corporate secrets...",
  poster_path: "/poster.jpg",
  backdrop_path: "",
  adult: false,
  original_title: "Inception",
};

describe("MovieCard", () => {
  it("renders movie details", () => {
    render(
      <MemoryRouter>
        <MovieCard m={movie} />
      </MemoryRouter>
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(
      screen.getByText(/Released on 2010-07-16/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Average 8.8 with \(12000\) votes/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Summary/i)).toBeInTheDocument();
  });

  it("renders fallback when no poster_path", () => {
    const noPoster = { ...movie, poster_path: null as any };
    render(
      <MemoryRouter>
        <MovieCard m={noPoster} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No Image/i)).toBeInTheDocument();
  });

  it("shows skeleton loader before image loads and fades in after load", () => {
    render(
      <MemoryRouter>
        <MovieCard m={movie} />
      </MemoryRouter>
    );

    const img = screen.getByRole("img");

    // initially hidden
    expect(img).toHaveClass("opacity-0");

    // simulate load
    fireEvent.load(img);
    expect(img).toHaveClass("opacity-100");
  });

  it("links to movie details page", () => {
    render(
      <MemoryRouter>
        <MovieCard m={movie} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/movie/1");
  });
});
