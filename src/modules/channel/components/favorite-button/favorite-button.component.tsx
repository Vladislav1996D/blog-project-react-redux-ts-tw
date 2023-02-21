import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../../../../common/components/button/button.component'
import { routes } from '../../../../core/routes'
import { useAuth } from '../../../auth/hooks/use-auth'
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from '../../api/repository'

interface FavoriteButtonProps {
  count: number
  slug: string
  isFavorited: boolean
  extented?: boolean
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  count,
  extented = false,
  slug,
  isFavorited = false,
}) => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [triggerFavoriteMutation, favoriteMutationState] =
    useFavoriteArticleMutation()
  const [triggerUnFavoriteMutation, unfavoriteMutationState] =
    useUnfavoriteArticleMutation()

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      navigate(routes.signIn.path)
      return
    }

    try {
      if (isFavorited) {
        await triggerUnFavoriteMutation({ slug }).unwrap()
      } else {
        await triggerFavoriteMutation({ slug }).unwrap()
      }
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later")
    }

    
  }

  return (
    <Button
      btnStyle="BLUEGREEN"
      variant={isFavorited ? 'BASE' : 'OUTLINE'}
      onClick={handleFavoriteClick}
      disabled={
        favoriteMutationState.isLoading || unfavoriteMutationState.isLoading
      }
    >
      <i className="ion-heart"></i>
      <span className="ml-1 font-normal">
        {extented && 'Favorite Article ('}
        {count}
        {extented && ')'}
      </span>
    </Button>
  )
}
