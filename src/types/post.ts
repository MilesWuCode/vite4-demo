export type Post = {
  id: string
  title: string
  content: string
  cover: string
  reaction: Reaction
  user: {
    id: string
    name: string
    avatar: string
  }
}

export type Posts = {
  cached_at: Date
  data: Post[]
  meta: {
    current_page: number
    per_page: number
    last_page: number
  }
}

export type Reaction = {
  like_count: number
  dislike_count: number
  like_state: 'like' | 'dislike' | ''
  favorite_state: boolean
}

export type FavoriteCatch = {
  state: boolean
  time: Date
}
