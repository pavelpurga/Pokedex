import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import cn from 'classnames'

import { set } from '../../store/theme/ThemeSlice'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './theme.module.scss'
import {useTypedSelector} from "../../store/store";

const Theme = ({ className }:any) => {
  const theme = useTypedSelector((state) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])
  const handleChange = () => dispatch(set(theme === 'dark' ? 'light' : 'dark'))

  return (
    <div
      className={cn(className, styles.root, theme === 'dark' ? styles.dark : styles.light)}
      onClick={handleChange}
    />
  )
}

export default Theme