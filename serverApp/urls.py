from django.urls import path
from . import views

urlpatterns = [
    path("trending/", views.trending_movies, name="trending_movies"),
    path("search/", views.search_movies, name="search_movies"),
    path("movie/<int:tmdb_id>/", views.movie_details, name="movie_details"),
]
