import { FC } from 'react'
import { useMatch, useSearchParams } from 'react-router-dom'
import { Banner } from '../../../common/components/banner/banner.component'
import { Container } from '../../../common/components/container/container.component'
import { routes } from '../../../core/routes'
import { useAuth } from '../../auth/hooks/use-auth'
import { useGetGlobalChannelQuery } from '../api/repository'
import { ChannelToogle } from '../components/channel-toggle/channel-toggle.component'
import { Channel } from '../components/channel/channel.component'
import { TagCloud } from '../components/tag-cloud/tag-cloud.component'
import { usePageParam } from '../hooks/use-page-param.hook'

interface GlobalChannelPageProps {}

export const GlobalChannelPage: FC<GlobalChannelPageProps> = () => {
  const { isLoggedIn } = useAuth()
  const personalChannel = useMatch(routes.personalChannel.path)

  const [searchParams] = useSearchParams()
  const { page } = usePageParam()

  const { data, error, isLoading, isFetching } = useGetGlobalChannelQuery({
    page,
    tag: searchParams.get('tag'),
    isPersonalChannel: personalChannel !== null,
  })

  const channelToggleItems = []
  if (isLoggedIn) {
    channelToggleItems.push({
      text: 'Your Channel',
      link: '/personal-channel',
    })
  }

  return (
    <>
      {!isLoggedIn && <Banner />}
      <Container>
        <ChannelToogle items={channelToggleItems} />
        <div className="flex">
          <div className="w-3/4">
            <Channel
              data={data}
              error={error}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </div>
          <div className="w-1/4 pl-3">
            <TagCloud />
          </div>
        </div>
      </Container>
    </>
  )
}
