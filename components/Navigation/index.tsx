import React, { useEffect, useState, useRef } from 'react'
import style from './style.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'antd';

const Navigation: React.FC = () => {
  const router = useRouter()

  const menuList = [
    {
      id: 1,
      title: '首页',
      router: "/"
    },
    {
      id: 2,
      title: '前端',
      router: '/blog',
      children: [
        {
          id: 10,
          title: 'Vue',
          router: "/blog/vue"
        },
        {
          id: 11,
          title: 'React',
          router: "/blog/react"
        }
      ]
    },
    {
      id: 3,
      title: '菜单3',
      router: "/testss",
      children: [
        {
          id: 10,
          title: '菜单3-1',
          router: "/parent/child2"
        },
        {
          id: 11,
          title: '菜单3-2',
          router: "/parent/child"
        }
      ]
    },
    {
      id: 4,
      title: '菜单4',
      router: "/menu4"
    },
  ]

  // 当前展开的菜单
  const [activeMenuId, setActiveMenuId] = useState(0)
  const toggleActiveMenuId = (id: number) => {
    activeMenuId === id ? setActiveMenuId(0) : setActiveMenuId(id)
  }

  const menuListRef = useRef(null)

  const docClickCallback = (ev: MouseEvent) => {

    if (menuListRef.current) {
      if ((menuListRef.current as any).contains(ev.target)) {
        return;
      }
      setActiveMenuId(0)
    }
  }

  useEffect(() => {
    if (activeMenuId !== 0) {
      document.addEventListener('click', docClickCallback, false)
      return () => {
        document.removeEventListener('click', docClickCallback, false)
      }
    }
  }, [activeMenuId])

  return (<div className={style.container}>
    {/** 导航栏左侧 */}
    <div className={style.left}>
      {/** LOGO */}
      <img className={style.logo} src='https://tdesign.gtimg.com/site/baseLogo-light.png' />
      {/** Menu */}
      <ul className={style.menuList} ref={menuListRef}>
        {menuList.map(item => {
          if (item.children) {
            return (<li key={item.id} className={router.asPath.indexOf(`${item.router}/`) !== -1 ? style.active : ''} >
              <span onClick={() => toggleActiveMenuId(item.id)}>{item.title}</span>
              {/** 子菜单 */}
              <ul className={style.subMenu} style={{ height: (activeMenuId === item.id) ? '56px' : '0px' }}>
                {item.children.map(sub_item => {
                  return (<li key={sub_item.id} className={router.asPath === sub_item.router ? style.active : ''}><Link href={sub_item.router}>{sub_item.title}</Link></li>)
                })}
              </ul>
            </li>)
          }
          return (<li key={item.id} className={router.asPath === item.router ? style.active : ''}><Link href={item.router}>{item.title}</Link></li>)
        })}
      </ul>
    </div>
    {/** 导航栏右侧 */}
    <div className={style.right}>
      <Button type='text' style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ width: '18px', height: '18px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M5.33 3.271a3.5 3.5 0 0 1 4.254 4.963l10.709 10.71-1.414 1.414-10.71-10.71a3.502 3.502 0 0 1-4.962-4.255L5.444 7.63a1.5 1.5 0 1 0 2.121-2.121L5.329 3.27zm10.367 1.884l3.182-1.768 1.414 1.414-1.768 3.182-1.768.354-2.12 2.121-1.415-1.414 2.121-2.121.354-1.768zm-6.718 8.132l1.414 1.414-5.303 5.303a1 1 0 0 1-1.492-1.327l.078-.087 5.303-5.303z" /></svg>
      </Button>
    </div>
  </div>)
}

export default Navigation