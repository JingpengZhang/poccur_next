import React from 'react'
import style from './style.module.scss'

const Footer: React.FC = () => {
  return (<div className={style.root}>
    <div className={style.left}>
      <span>Copyright © 1998 - 2023 Tencent. All Rights Reserved. 腾讯公司 版权所有</span>
    </div>
    <div className={style.right}></div>
  </div>)
}

export default Footer