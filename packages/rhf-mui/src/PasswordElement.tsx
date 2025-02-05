import {
  MouseEvent,
  ReactNode,
  useState,
  RefAttributes,
  forwardRef,
  Ref,
} from 'react'
import TextFieldElement, {TextFieldElementProps} from './TextFieldElement'
import {IconButton, IconButtonProps, InputAdornment} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {FieldPath, FieldValues} from 'react-hook-form'

export type PasswordElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TextFieldElementProps<TFieldValues, TName> & {
  iconColor?: IconButtonProps['color']
  renderIcon?: (password: boolean) => ReactNode
}

type PasswordElementComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: PasswordElementProps<TFieldValues, TName> &
    RefAttributes<HTMLDivElement>
) => JSX.Element

const PasswordElement = forwardRef(function PasswordElement<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: PasswordElementProps<TFieldValues, TName>,
  ref: Ref<HTMLDivElement>
): JSX.Element {
  const {
    iconColor,
    renderIcon = (password) => (password ? <Visibility /> : <VisibilityOff />),
    ...rest
  } = props
  const [password, setPassword] = useState<boolean>(true)
  return (
    <TextFieldElement
      {...rest}
      ref={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position={'end'}>
            <IconButton
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) =>
                e.preventDefault()
              }
              onClick={() => setPassword(!password)}
              tabIndex={-1}
              color={iconColor ?? 'default'}
            >
              {renderIcon(password)}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={password ? 'password' : 'text'}
    />
  )
}) as PasswordElementComponent

export default PasswordElement
