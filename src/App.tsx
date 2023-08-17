import '@/App.css';
import lessStyle from './app.module.less';
import scssStyle from './app.module.scss';
import stylStyle from './app.module.styl';
import avatar1 from '@/assets/imgs/avatar-1.jpeg';
import avatar2 from '@/assets/imgs/avatar-2.webp';


function App(){
    return (
        <div>
           <div className={lessStyle['lessBox']}>
            <span className={lessStyle['box']}>less box</span>
           </div>
           <div className={scssStyle['scssBox']}>
            <span className={scssStyle['box']}>sass box</span>
           </div>
           <div className={stylStyle['stylBox']}>
            <span className={stylStyle['box']}>styl box</span>
           </div>
           <img src={avatar1} alt="" />
           <img src={avatar2} alt="" />
        </div>
    );
}

export default App