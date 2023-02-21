import { FC, useEffect } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { Header } from './common/components/header/header.component'
import { routes } from './core/routes'
import { PrivateRoute } from './modules/auth/components/private-route.component'
import { useAuth } from './modules/auth/hooks/use-auth'

interface AppProps {}

export const App: FC<AppProps> = () => {
  const isGlobalChannelPage = useMatch(routes.globalChannel)
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => {
    if (isGlobalChannelPage && auth.isLoggedIn)  {
      navigate(routes.personalChannel.path)
    }
  }, [])

  return (
    <div className="pb-16">
      <Header />
      <Routes>
        {Object.values(routes).map((route) => {
          if (route.private) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute>
                    <route.Element />
                  </PrivateRoute>
                }
              />
            )
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Element />}
            />
          )
        })}
      </Routes>
    </div>
  )
}
