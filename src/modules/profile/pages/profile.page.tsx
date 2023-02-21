import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Container } from '../../../common/components/container/container.component'
import { useGetProfileChannelQuery } from '../../channel/api/repository'
import { ChannelToogle } from '../../channel/components/channel-toggle/channel-toggle.component'
import { Channel } from '../../channel/components/channel/channel.component'
import { usePageParam } from '../../channel/hooks/use-page-param.hook'
import { useGetProfileQuery } from '../api/repository'
import { ProfileBanner } from '../components/profile-banner/profile-banner.component'

interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  const { page } = usePageParam()
  const { profile } = useParams()
  const { pathname } = useLocation()

  const { data: profileInfo, isLoading: profileLoading } = useGetProfileQuery({
    username: profile!,
  })

  const { data, isLoading, isFetching, error } = useGetProfileChannelQuery({
    page,
    author: profile!,
    isFavorite: pathname.includes(
      `/@${encodeURIComponent(profile!)}/favorites`
    ),
  })

  const channelToggleItems = [
    {
      text: 'Favorited Articles',
      link: `/@${encodeURIComponent(profile!)}/favorites`,
    },
  ]

  if (profileLoading) {
    return null
  }

  return (
    <div>
      <ProfileBanner profile={profileInfo!.profile} />
      <Container>
        <ChannelToogle
          defaultText="My Articles"
          defaultLink={`/@${encodeURIComponent(profile!)}`}
          items={channelToggleItems}
        />
        <Channel
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />
      </Container>
    </div>
  )
}
