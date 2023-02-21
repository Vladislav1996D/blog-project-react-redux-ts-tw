import { FC } from 'react'
import { ChannelArticle } from '../../api/dto/global-channel.in'
import { Article } from '../article/article.component'

interface ArticleListProps {
  list: ChannelArticle[]
}

export const ArticleList: FC<ArticleListProps> = ({ list }) => {
  return (
    <div>
      {list.map((article) => (
        <Article key={article.slug} {...article} />
      ))}
    </div>
  )
}
