import { useRoutes, useNavigate } from 'react-router';
import routes from './router'
import Map from "./components/Map";
import LineCom from "./components/LIneCom/index";
import Chart from "./pages/Chart";
import Game from './pages/game/index'
import TestChun from './pages/testChun'
import ContextTest from './pages/context/index'
import ThroughContext from './pages/through/index'
import ImgTable from './pages/imgTable/index'
import Funnel from './components/Funnel/index.js'
import Huan from './pages/Huan/index'
import MyLayOut from './pages/MyLayOut'
import './App.less'

function App() {
  console.log(routes, 'routes');

  const element = useRoutes(routes);
  return (
    <div className="App" style={{ margin: '0 auto' }}>
      {/* <header className="App-header">
      FunnelFunnelFunnel 漏斗图
      </header>
       <Funnel></Funnel> */}
      {/* <header className="App-header">
     横向滚动
      </header>
       <Huan></Huan> */}

      {/* <header className="App-header">
       地图地图地图
      </header>
       <Map></Map> */}
      {/* <header className="App-header">折线图折线图</header> */}
      {/* <Chart></Chart> */}
      {/* <header className="App-header">井字棋游戏--React</header> */}
      {/* <Game></Game> */}
      {/* <header className="App-header">纯函数--React</header>
      <TestChun></TestChun> */}
      {/* <div style={{width:'800px',margin:'0 auto'}}>
       <header className="App-header">context--React</header>
      <ContextTest></ContextTest>
      </div> */}
      {/* <div style={{width:'800px',margin:'0 auto'}}>
       <header className="App-header">context--React-穿过中间层级</header>
      <ThroughContext></ThroughContext>
      </div> */}

      {/* 图片 */}
      {/* <div style={{ width: '800px', margin: '0 auto' }}>
        <header className="App-header">context--React-穿过中间层级</header>
        <ImgTable></ImgTable>
      </div> */}
      {/* <MyLayOut></MyLayOut> */}
      {element}
    </div>
  );
}


export default App;
