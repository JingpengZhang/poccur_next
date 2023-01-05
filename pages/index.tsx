import style from './style.module.scss'
import Layout from '../layouts/layout';
import Card from '../components/Card';
import ArticleCard from '../components/ArticleCard';
import Link from 'next/link';
import InfoCard from '../components/InfoCard';
import BulletinBoard from '../components/BulletinBoard';

const Index: React.FC = () => {

  const articles = [
    {
      id: 1,
      cover: 'https://img-blog.csdnimg.cn/img_convert/751ef4450d8fad6a553f36957667ca6a.jpeg',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    },
    {
      id: 2,
      cover: 'https://bbs-img.huaweicloud.com/blogs/img/20221220/1671518307965558565.jpg',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    },
    {
      id: 3,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    }
    , {
      id: 4,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    }
  ]

  const sorts = [
    {
      id: 1,
      title: 'Vue',
      articleNum: 22,
      link: '/blog/vue'
    },
    {
      id: 2,
      title: 'React',
      articleNum: 12,
      link: '/blog/react'
    },
  ]

  return (
    <div className={style.root}>
      <Layout pageWidth='1200px'>
        <div className='main'>
          {/** 左边 */}
          <div className='left'>
            <Card type={'sqare'} title='列表'>
              <ul className='articleList'>
                {articles.map(item => {
                  return (<li key={item.id}>
                    <ArticleCard
                      data={item}
                      layout={'horizental'}
                    /></li>)
                })}
              </ul>
            </Card>
          </div>
          {/** 右边 */}
          <div className='right'>
            {/** 网站信息卡片 */}
            <InfoCard />

            {/** 公告栏 */}
            <div style={{ marginTop: '30px' }}>
              <BulletinBoard />
            </div>

            {/** 分类列表 */}
            <div style={{ marginTop: '30px' }}>
              <Card type={'simple'} title='分类'>
                <ul className='sort-list'>
                  {sorts.map(item => {
                    return (<li key={item.id}>
                      <Link href={item.link} className='sort-link'>
                        <span className='title'>{item.title}</span>
                        <span className='articleNum'>{item.articleNum}</span>
                      </Link>
                    </li>)
                  })}
                </ul>
              </Card>
            </div>

          </div>
        </div>



      </Layout>
    </div>
  )
}

export default Index