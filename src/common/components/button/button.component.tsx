import clsx from 'clsx'
import { ComponentProps, FC, PropsWithChildren } from 'react'

export enum ButtonStyleEnum {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  BLUEGREEN = 'BLUEGREEN',
  DANGER = 'DANGER',
}

enum ButtonVariantEnum {
  BASE = 'BASE',
  OUTLINE = 'OUTLINE',
}

enum ButtonSizeEnum {
  BASE = 'BASE',
  LG = 'LG',
}

interface ButtonProps {
  btnStyle?: keyof typeof ButtonStyleEnum
  size?: keyof typeof ButtonSizeEnum
  variant?: keyof typeof ButtonVariantEnum
  type?: ComponentProps<'button'>['type']
  disabled?: ComponentProps<'button'>['disabled']
  onClick?: ComponentProps<'button'>['onClick']
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  btnStyle = ButtonStyleEnum.DARK,
  size = ButtonSizeEnum.BASE,
  variant = ButtonVariantEnum.BASE,
  children,
  ...buttonProps
}) => {
  const btnClasses = clsx(
    'text-center align-middle cursor-pointer select-none border active:bg-solution-fwActiveGray disabled:opacity-80',
    {
      'border-solution-darkenGray text-solution-darkenGray hover:bg-solution-fwBgGray hover:text-white focus:bg-solution-fwBgGray':
        btnStyle === ButtonStyleEnum.DARK,
      'border-solution-darkenGray text-solution-darkenGray hover:bg-solution-fwBgGray hover:text-white':
        btnStyle === ButtonStyleEnum.LIGHT,
      'border-solution-bluegreen  active:bg-solution-darkBluegreen':
        btnStyle === ButtonStyleEnum.BLUEGREEN,
      'bg-solution-bluegreen text-white hover:bg-solution-bluegreen hover:border-solution-darkBluegreen hover:text-white':
        btnStyle === ButtonStyleEnum.BLUEGREEN &&
        variant === ButtonVariantEnum.BASE,
      'bg-white text-solution-bluegreen hover:bg-solution-bluegreen hover:text-white disabled:bg-solution-darkBluegreen disabled:text-white':
        btnStyle === ButtonStyleEnum.BLUEGREEN &&
        variant === ButtonVariantEnum.OUTLINE,
      'border-solution-red text-solution-red hover:bg-solution-red focus:bg-solution-red hover:text-white disabled:bg-solution-red disabled:text-white':
        btnStyle === ButtonStyleEnum.DANGER,
      'py-1 px-2 text-sm rounded-buttonSm': size === ButtonSizeEnum.BASE,
      'py-3 px-6 text-xl rounded': size === ButtonSizeEnum.LG,
    }
  )

  return (
    <button className={btnClasses} {...buttonProps}>
      {children}
    </button>
  )
}
