import '@/App.css';
import lessStyle from './app.module.less';
import scssStyle from './app.module.scss';
import stylStyle from './app.module.styl';
import avatar1 from '@/assets/imgs/avatar-1.jpeg';
import avatar2 from '@/assets/imgs/avatar-2.webp';
import testData from "@/test.json"
import Demo from '@/components/demo';
function App(){

    console.log(testData);
    // fetch(testData).then(res=>{
    //     console.log(res.json());
    // }).catch(err=>{

    // })
    return (
        <div>
           <div className={lessStyle['lessBox']}>
            <span className={lessStyle['box']}>less box</span>
            <p className={lessStyle['font-p']}>{'对于fant-family，可以去 google font 找一个字体'}</p>
           </div>
           <div className={scssStyle['scssBox']}>
            <span className={scssStyle['box']}>sass box</span>
           </div>
           <div className={stylStyle['stylBox']}>
            <span className={stylStyle['box']}>styl box</span>
           </div>
           <p>
            <i style={{color:'#00a9eb',fontSize:30}} className='iconfont icon-delete-02'></i>
           </p>
          <Demo></Demo>
           <img src={avatar1} alt="" />
           <img src={avatar2} alt="" />
        </div>
    );
}

export default App