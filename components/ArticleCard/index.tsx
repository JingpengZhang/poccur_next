import Link from 'next/link'
import style from './style.module.scss'

interface articleDataType {
  id: number,
  cover: string,
  title: string,
  sort: string,
  status: number,
  description: string,
  create_time: string
}

interface propsType {
  data: articleDataType,
  layout?: 'horizental'
}

const ArticleCard = ({ data, layout }: propsType) => {
  return <Link href={`/blog/article/${data.id}`} className={[style.container, layout === 'horizental' ? style.horizontal : ''].join(' ')}>
    {/** 上部分 */}
    <div className={style.top}>
      {/** 封面盒子 */}
      <div className={style.coverBox}>
        <img src={data.cover} alt={data.title} />
      </div>
      {/** 主要信息 */}
      <div className={style.mainInfoBox}>
        {/** 分类 */}
        <div className={style.sortBox}>
          <span>{data.sort}</span>
        </div>
        {/** 标题 */}
        <p className={style.title}>
          {data.title}
        </p>
        {/** 概要 */}
        <p className={style.description}>
          {data.description}
        </p>
      </div>

    </div>
    {/** 下部分 */}
    <div className={style.bottom}>
      {/** 左边 */}
      <div className={style.left}>
        {/** 状态 */}
        {
          data.status === 0 &&
          (<span className={[style.status, style.statusPublic].join(' ')}>公开</span>)
        }
        {
          data.status === 1 &&
          (<span className={[style.status, style.statusPrivacy].join(' ')}>私密</span>)
        }
      </div>

      {/** 右边 */}
      <div className={style.right}>
        {/** 发表日期 */}
        <span className={style.createTime}>
          {data.create_time}
        </span>
      </div>
    </div>
  </Link>
}

export default ArticleCard