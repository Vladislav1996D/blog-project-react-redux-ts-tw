import clsx from 'clsx'
import { FC } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

interface ChanneToggleItem {
  text: string
  link: string
}

interface ChannelToogleProps {
  defaultText?: string
  defaultLink?: string
  items?: ChanneToggleItem[]
}

export const ChannelToogle: FC<ChannelToogleProps> = ({
  defaultText = 'Global Channel',
  defaultLink = '/',
  items = [],
}) => {
  const [searchParams] = useSearchParams()
  const tag = searchParams.get('tag')

  const globalChannelClasses = ({ isActive }: { isActive: boolean }) => {
    return clsx('border-solution-bluegreen py-3 px-4 hover:no-underline', {
      'text-black/30 hover:text-black/60': tag || !isActive,
      'border-b-2': !tag && isActive,
    })
  }

  return (
    <div className="h-8">
      <ul className="flex">
        <li>
          <NavLink to={defaultLink} className={globalChannelClasses} end>
            {defaultText}
          </NavLink>
          {items.map((item) => (
            <NavLink
              to={item.link}
              className={globalChannelClasses}
              key={item.link}
            >
              {item.text}
            </NavLink>
          ))}
          {tag && (
            <span className="bg-white border-b-2 border-solution-bluegreen py-3 px-4 hover:no-underline hover:text-solution-bluegreen text-solution-bluegreen">
              # {tag}
            </span>
          )}
        </li>
      </ul>
    </div>
  )
}
