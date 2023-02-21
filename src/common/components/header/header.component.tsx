import clsx from 'clsx'
import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../../modules/auth/hooks/use-auth'
import { Container } from '../container/container.component'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { isLoggedIn, logOut, user } = useAuth()

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx('py-navItem hover:text-black/60 hover:no-underline', {
      'text-black/30': !isActive,
      'text-black/80': isActive,
    })

  return (
    <header>
      <nav className="mb-4 py-4">
        <Container>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="font-titillium text-2xl mr-8 text-solution-bluegreen hover:no-underline hover:text-solution-bluegreen"
            >
              Solution
            </Link>
            <ul className="pl-0 mb-0 list-none flex">
              <li>
                <NavLink to="/" className={navLinkClasses} end>
                  Home
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="ml-4">
                    <NavLink to="/editor" className={navLinkClasses}>
                      <i className="ion-compose mr-1" />
                      New Article
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/settings" className={navLinkClasses}>
                      <i className="ion-gear-a mr-1" />
                      Settings
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink
                      to={`/@${user?.username}`}
                      className={navLinkClasses}
                    >
                      <img
                        src={user?.image}
                        alt={`${user?.username} avatar`}
                        className="w-6 h-6 rounded-full inline mr-2"
                      />
                      {user?.username}
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink
                      to="/"
                      className="py-navItem text-black/30 hover:text-black/60 hover:no-underline"
                      onClick={logOut}
                    >
                      Log out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="ml-4">
                    <NavLink to="/sign-in" className={navLinkClasses}>
                      Sing in
                    </NavLink>
                  </li>
                  <li className="ml-4">
                    <NavLink to="/sign-up" className={navLinkClasses}>
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  )
}
