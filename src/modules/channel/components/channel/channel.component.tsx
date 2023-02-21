import { FC } from 'react'
import ReactPaginate from 'react-paginate'
import { ChannelData } from '../../api/repository'
import { CHANNEL_PAGE_SIZE } from '../../consts'
import { usePageParam } from '../../hooks/use-page-param.hook'
import { ArticleList } from '../article-list/article-list.component'

interface ChannelProps {
  isLoading: boolean
  isFetching: boolean
  error: any
  data?: ChannelData
}

export const Channel: FC<ChannelProps> = ({
  isLoading,
  isFetching,
  error,
  data,
}) => {
  const { page, setPage } = usePageParam()
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected)
  }

  if (isLoading || isFetching) {
    return <p className="mt-6">Channel loading...</p>
  }

  if (error) {
    return <p className="mt-6">Error while loading channel</p>
  }

  if (data?.articlesCount === 0) {
    return <p className="mt-6">No articles are here... yet</p>
  }

  return (
    <>
      <ArticleList list={data?.articles || []} />
      <nav className="my-6">
        <ReactPaginate
          pageCount={Math.ceil((data?.articlesCount || 0) / CHANNEL_PAGE_SIZE)}
          pageRangeDisplayed={Math.ceil(
            (data?.articlesCount || 0) / CHANNEL_PAGE_SIZE
          )}
          previousLabel={null}
          nextLabel={null}
          containerClassName="flex my-4"
          pageClassName="group"
          pageLinkClassName="p-3 text-solution-bluegreen bg-white border border-solution-lightenGrey -ml-px group-[&:nth-child(2)]:rounded-l 
           group-[&:nth-last-child(2)]:rounded-r hover:bg-solution-pageHoverBg"
          activeClassName="active group"
          activeLinkClassName="group-[.active]:bg-solution-bluegreen group-[.active]:text-white group-[.active]:border-solution-bluegreen"
          onPageChange={handlePageChange}
          forcePage={page}
        />
      </nav>
    </>
  )
}
