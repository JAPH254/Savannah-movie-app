import os
import requests
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_GET
from django.views.decorators.cache import cache_page

API_KEY = "0ffc2bc185ef370f2648715ff28a4f98"
BASE_URL = "https://api.themoviedb.org/3"

def _fetch(endpoint: str, params: dict = None):
    """Helper to hit TMDB with API key injected."""
    if params is None:
        params = {}
    params["api_key"] = API_KEY
    url = f"{BASE_URL}{endpoint}"
    r = requests.get(url, params=params, timeout=10)
    return r.json(), r.status_code


@cache_page(60 * 5)
@require_GET
def trending_movies(request):
    page = request.GET.get("page", "1")
    data, status = _fetch("/trending/movie/week", {"page": page})
    return JsonResponse(data, status=status)


@cache_page(60 * 5)
@require_GET
def search_movies(request):
    q = request.GET.get("q")
    if not q:
        return HttpResponseBadRequest("Missing query parameter ?q=")
    page = request.GET.get("page", "1")
    data, status = _fetch("/search/movie", {"query": q, "page": page, "include_adult": "false"})
    return JsonResponse(data, status=status)


@cache_page(60 * 10)
@require_GET
def movie_details(request, tmdb_id: int):
    """Return details + credits + reviews for a given TMDB movie."""
    data, status = _fetch(
        f"/movie/{tmdb_id}",
        {"append_to_response": "credits,reviews"},
    )
    return JsonResponse(data, status=status)
