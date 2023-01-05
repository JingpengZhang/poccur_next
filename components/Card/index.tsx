import style from './style.module.scss'

interface propsType {
  title: string,
  type?: 'sqare' | 'simple',
  width?: string,
  height?: string,
  children?: any
}

const Card = ({ title, type, width, height, children }: propsType) => {
  return <div style={{ width, height }} className={style.root}>
    <div className={['container', type ? `card-${type}` : 'card-sqare'].join(' ')}>
      {/** 头部 */}
      <div className='header'>
        <div className='left'>
          <span className='title'>{title}</span>
        </div>
        <div className='right'></div>
      </div>
      {/** 内容 */}
      <div className='content'>
        {children}
      </div>
    </div>
  </div>
}
export default Card