import { Suspense, useState, lazy } from 'react'
import '@/App.css'
import lessStyle from './app.module.less'
import scssStyle from './app.module.scss'
import stylStyle from './app.module.styl'
import avatar1 from '@/assets/imgs/avatar-1.jpeg'
import avatar2 from '@/assets/imgs/avatar-2.webp'
// import Demo from '@/components/demo';
import LazyWrapper from '@/components/lazyWrapper'

const PrefetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName:'PrefetchDemo' */
      /* webpackPrefetch:true */
      '@/components/prefetchDemo'
    )
)
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName:'PreloadDemo' */
      /* webpackPreload:true */
      '@/components/preloadDemo'
    )
)

function App() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <div className={lessStyle.lessBox}>
        <span className={lessStyle.box}>less box</span>
        <p className={lessStyle['font-p']}>{'对于fant-family，可以去 google font 找一个字体'}</p>
      </div>
      <div className={scssStyle.scssBox}>
        <span className={scssStyle.box}>sass box</span>
      </div>
      <div className={stylStyle.stylBox}>
        <span className={stylStyle.box}>styl box</span>
      </div>
      <p>
        <i style={{ color: '#00a9eb', fontSize: 30 }} className='iconfont icon-delete-02'></i>
      </p>
      <button onClick={() => setShow(!show)}>点击看看</button>
      <Suspense fallback={null}>
        <LazyWrapper path='demo' />
      </Suspense>
      {show && (
        <>
          <Suspense fallback={null}>
            <PrefetchDemo></PrefetchDemo>
          </Suspense>
          <Suspense fallback={null}>
            <PreloadDemo></PreloadDemo>
          </Suspense>
        </>
      )}
      {/* <Demo></Demo> */}
      <img src={avatar1} alt='' />
      <img src={avatar2} alt='' />
    </div>
  )
}

export default App
