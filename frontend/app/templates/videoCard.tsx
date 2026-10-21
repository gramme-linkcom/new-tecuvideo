export interface Video {
    id:     string,
    title:  string,
    thumbnailUrl: string,
    views:  number,
    createdAt:string,
    postUser: string
}

export default function VideoCard({ video }: { video: Video }) {
    return (
        <div className="card card-compact group bg-neutral hover:brightness-125 shadow-sm hover:shadow-md transition-all cursor-pointer w-full max-w-none sm:max-w-70 md:max-w-100 mx-auto">
          <figure className="aspect-video relative overflow-hidden rounded-xl w-[93%] mx-auto mt-2">
            <img src={video.thumbnailUrl} alt={video.title} className="object-cover" />
          </figure>
          <div className="card-body p-3">
            <h2 className="card-title text-sm line-clamp-2 group-hover:text-accent transition-all">{video.title}</h2>
            <p className="text-xs opacity-60">
                {video.postUser}
            </p>
            <p className="text-xs opacity-60">
              <i className="bi bi-caret-right-square mr-2"></i>
              {video.views} • {video.createdAt}
            </p>
          </div>
        </div>
    )
}
