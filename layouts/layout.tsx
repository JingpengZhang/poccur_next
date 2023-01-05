import React from 'react'
import style from './layout.module.scss'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Head from 'next/head'

interface propsType {
  pageWidth?: string,
  children?: any
}

const Layout = (props: propsType) => {

  return (
    <>
      <Head>
        <title>Poccur</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_3851908_iqo5a9n2uek.css" />
      </Head>


      <div className={style.appLayout}>
        <Navigation />
        <div className={style.content} style={{ width: props.pageWidth ? props.pageWidth : '100%' }}>
          {props.children}
        </div>
        <div className={style.footer}>
          <Footer />
        </div>

      </div>
    </>
  )
}

export default Layout