import style from './index.module.scss'
import Layout from '../../../layouts/layout'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import Card from '../../../components/Card'
import { useState } from 'react';

const Article = () => {


  const editorId = 'my-editor'

  const content = `

在 Vue2 中，通过编程式导航多次携带相同的参数跳转到同一页面，会报如下错误

\`\`\`shell
Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/search/asd?k=ASD".
\`\`\`

这是因为 vue-router 的 \`push\` 方法和 \`replace\` 方法会返回 \`promise\` ，需要对 \`promise\` 进行处理，之所以声明式导航跳转方式不会出现此类问题是因为 vue-router 底层已经处理好了，对于编程式导航，我们需要手动处理一下。

## 方式一

### 芳芳放

在调用 \`push\` 或 \`replace\` 进行路由跳转时，添加处理 \`promise\` 返回值的函数。

\`\`\`javascript
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword,toUpperCase()}},()=>{},()=>{})
\`\`\`

## 方式二

方式一需要在每次通过编程式导航进行路由跳转时通过手动传入 \`promise\` 处理函数，我们可以在路由的配置文件中，对 \`push\` 和 \`replace\` 方法进行重写，达到一劳永逸的目的。

\`\`\`javascript
// 重写 push 方法
let originPush = VueRouter.prototype.push; // 保存 VueRouter 原型对象上的 push 方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
// 重写 replace 方法
let originReplace = VueRouter.prototype.replace; // 保存 VueRouter 原型对象上的 replace 方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, resolve, reject);
  } else {
    originReplace.call(
      this,
      () => {},
      () => {}
    );
  }
};
\`\`\`
  
`

  // 目录
  const [catalogList, setCatalogList] = useState<any[]>([])

  return (<Layout pageWidth='1200px'>
    <div className={style.root}>
    
      {/**
        <div className='article-cover-box'>
          <img src='https://bbs-img.huaweicloud.com/blogs/img/20221220/1671518307965558565.jpg' />
          <div className='fuzzy-cover'></div>
       </div>
      */}

      <div className='left'>
        <div className='article-container'>
          <h1 className='title'>Vue 解决编程式导航多次携带相同参数跳转同一页面报错问题</h1>
          <div className='article-info'>
            <span>发表于：2022-2-20 16:19</span>
          </div>
          <MdEditor editorId={editorId} previewOnly modelValue={content} onGetCatalog={setCatalogList}></MdEditor>
        </div>
      </div>
      <div className='right'>
        <div className='catalogue'>
          <Card title='目录' type={'simple'}>

            <ul className='catalog-list'>
              {
                catalogList.length !== 0 && catalogList.map((item) => {
                  return (<li key={item.text}>
                    <a href={`#${item.text}`} style={{ marginLeft: 20 * (item.level - 1) + 'px' }}>{item.text}</a>
                  </li>)
                })
              }
            </ul>

          </Card>
        </div>


      </div>
    </div>
  </Layout>)
}

export default Article