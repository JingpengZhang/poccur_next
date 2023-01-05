import Link from 'next/link'
import style from './style.module.scss'

const BulletinBoard = () => {

  const bulletins = [
    {
      id: 1,
      type: 'link',
      title: '在留言板留下你的足迹吧在留言板留下你的足迹吧在留言板留下你的足迹吧在留言板留下你的足迹吧',
      link: ''
    },
    {
      id: 2,
      type: 'text',
      title: '右键可以切换主题哦！右键可以切换主题哦！右键可以切换主题哦！右键可以切换主题哦！',
      link: ''
    }
  ]

  return (<div className={style.root}>
    <div className='header'>
      <i className='iconfont icon-chat-1-line' />
      <span>公告</span>
    </div>
    <div className='content'>
      <ul className='list'>
        {
          bulletins.map((item) => {
            if (item.type === 'link') {
              return (<li key={item.id}>
                <Link href={item.link}>
                  <i className='iconfont icon-link-m' />
                  <p>{item.title}</p>
                </Link>
              </li>)
            }
            return (<li key={item.id}><p>{item.title}</p></li>)
          })
        }
      </ul>
    </div>
  </div>)
}

export default BulletinBoard