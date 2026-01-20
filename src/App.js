import { useRoutes } from 'react-router';
import routes from './router'
import './App.less'

function App() {
  const element = useRoutes(routes);
  // console.log('App渲染，当前路由元素:', element);
  // console.log('当前路径:', window.location.pathname);

  return (
    <div className="App">
      {element}
    </div>
  );
}


export default App;
