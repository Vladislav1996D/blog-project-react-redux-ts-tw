import { FC } from 'react'
import { useGetPopularTagsQuery } from '../../api/repository'
import { TagList } from '../tag-list/tag-list.component'

interface TagCloudProps {}

export const TagCloud: FC<TagCloudProps> = () => {
  const { data, isLoading, isFetching, error } = useGetPopularTagsQuery('')

  if (isLoading || isFetching) {
    return (
      <div className="bg-solution-tagCloudBg p-3 pt-1.5">
        <p className="mb-2">Loading popular tags...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-solution-tagCloudBg p-3 pt-1.5">
        <p className="mb-2">Error while loading popular tags...</p>
      </div>
    )
  }

  return (
    <div className="bg-solution-tagCloudBg p-3 pt-1.5">
      <p className="mb-2">Popular Tags</p>
      <TagList list={data!.tags} itemStyle="DARK" itemAs="a" />
    </div>
  )
}
