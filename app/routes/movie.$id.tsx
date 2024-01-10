import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmFiNGY0NjIwOWY0MjkxZmM3ZjhiMWM4N2VlMzA4NyIsInN1YiI6IjY1OWUxM2ZhMWQzNTYzMDBlZWU5NGU0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JhGpAfJ7JQ1EMxtb1uZDlCTy7yXcVjqDXozAm_J9EGg",
      },
    }
  );

  return json(await url.json());
}

export default function MovieId() {
  const data : any = useLoaderData();

  return (
    <div className="min-h-screen p-10">
      <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt="" className="h-[45vh] object-cover w-full rounded-lg" />
    
          <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

          <div className="flex gap-x-10 mt-10">
              <div className="w-1/2 font-medium">
                  <h1><span className="underline">Homepage:</span><Link to={data.homepage} target="_blank">Link</Link></h1>
                  <h1><span className="underline">Original Language: </span>{data.original_language}</h1>
                  <h1><span className="underline">Overview: </span>{data.overview}</h1>
                  <h1><span className="underline">Relase Date: </span>{data.release_date}</h1>
              </div>
              <div className="w-1/2">
                  <Outlet />
              </div>
          </div>
      </div>
  );
}
