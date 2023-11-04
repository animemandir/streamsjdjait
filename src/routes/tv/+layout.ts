import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch, params }) => {
  const fetchDetails = async () => {
    const { id } = params;
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
    if (!response.ok) {
      console.error(`Failed to fetch TV details: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data;
  }

  const fetchRecommendations = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch TV recommendations: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data.results; 
  }
  
  const fetchSimilar = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch similar TV shows: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data.results; 
  }
  
  const fetchCasts = async (id: string | undefined) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      console.error(`Failed to fetch TV casts: ${response.status}`);
      return null; 
    }
    const data = await response.json();
    return data.cast;
  }

  const { id } = params;
  const [details, recommendations, similar, casts] = await Promise.all([
    fetchDetails(),
    fetchRecommendations(id),
    fetchSimilar(id),
    fetchCasts(id),
  ]);
  
  return {
    details,
    recommendations,
    similar,
    casts,
  };
}) satisfies LayoutLoad;