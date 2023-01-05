import { useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../../layouts/layout"
import style from './style.module.scss'
import ArticleCard from "../../components/ArticleCard"

const Blog = () => {
  const router = useRouter()

  const articles = [
    {
      id: 1,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    },
    {
      id: 2,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
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
    },
    {
      id: 4,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    },
    {
      id: 5,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    },
    {
      id: 6,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    },

    {
      id: 7,
      cover: 'https://static001.geekbang.org/infoq/95/9542f9f9a1899d7ecb4533fc2acf8ea2.png',
      title: 'Git使用教程之本地仓库的基本操作',
      sort: 'Git',
      status: 0,
      description: 'Git每次会提取整个代码仓库的完整镜像，相当于对整个代码仓库都进行了一次备份，这样计时版本服务器除了问题，我们可以直接采用本地仓库恢复！结合本地版本管理功能，远程版本管理服务器出问题了，我们依然能继续写自己的代码，当他恢复的时候我们再提交我们的本地版本！',
      create_time: '2022/12/30 22:39:11'
    },
  ]

  return (
    <Layout>
      <div className={style.container}>
        <h1>Blog {router.query.sort}</h1>
        <ul className={style.blogList}>
          {
            articles.map(item => {
              return (<li key={item.id}>
                <ArticleCard
                  data={item}
                /></li>)
            })
          }
        </ul>
      </div>
    </Layout >
  )
}

export default Blog