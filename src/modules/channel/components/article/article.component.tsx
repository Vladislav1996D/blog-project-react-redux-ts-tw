import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ChannelArticle } from '../../api/dto/global-channel.in'
import { TagList } from '../tag-list/tag-list.component'
import { ArticleAuthor } from '../article-author/article-author.component'
import { FavoriteButton } from '../favorite-button/favorite-button.component'

interface ArticleProps extends ChannelArticle {}

export const Article: FC<ArticleProps> = ({
  author,
  createdAt,
  favoritesCount,
  title,
  description,
  tagList,
  slug,
  favorited,
}) => {
  return (
    <article>
      <div className="border-t border-black/20 py-6">
        <div className="mb-4 font-light flex justify-between">
          <ArticleAuthor author={author} publishedAt={createdAt} />
          <FavoriteButton
            count={favoritesCount}
            slug={slug}
            isFavorited={favorited}
          />
        </div>
        <Link
          to={`/article/${encodeURIComponent(slug)}`}
          className="hover:no-underline"
        >
          <h1 className="mb-1 font-semibold text-2xl text-solution-black">
            {title}
          </h1>
          <p className="text-solution-darkenGray font-light mb-1">
            {description}
          </p>
          <div className="flex justify-between">
            <span className="text-solution-gray text-date font-light">
              Read more...
            </span>
            <TagList list={tagList} />
          </div>
        </Link>
      </div>
    </article>
  )
}
