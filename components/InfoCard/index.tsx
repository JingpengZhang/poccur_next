import style from './style.module.scss'
import Link from 'next/link'

const InfoCard = () => {

  const socialWays = [
    {
      id: 1,
      icon: "icon-github-fill",
      link: ""
    },
    {
      id: 2,
      icon: "icon-mail-fill",
      link: ""
    }
  ]

  return (<div className={style.root}>
    <div className='web-info-box'>
      <div className='logo-box'>
        <img src='https://res-static.hc-cdn.cn/cloudbu-site/china/zh-cn/HWCdeveloper/kaifangnengli/lubanhui.png' />
      </div>
      <div className='info'>
        <span className='wesite-name'>
          Poccur
        </span>
        <div className='module-num'>
          <div className='module'>
            <span className='module-name'>文章</span>
            <span className='num'>20</span>
          </div>
          <div className='module'>
            <span className='module-name'>分类</span>
            <span className='num'>2</span>
          </div>
        </div>
      </div>
    </div>
    <div className='social-ways-box'>
      {
        socialWays.map(item => {
          return (<Link key={item.id} href={item.link} className='social-way'>
            <i className={['iconfont', item.icon].join(' ')} />
          </Link>)
        })
      }
    </div>
  </div>)
}

export default InfoCard