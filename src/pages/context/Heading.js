
import { useContext } from 'react'; //引入 useContext
import { LevelContext } from '../../Context/LevelContext';

export default function Heading({children }) {
  // useContext 是一个 Hook。和 useState 以及 useReducer一样，
  // 你只能在 React 组件中（不是循环或者条件里）立即调用 Hook。
  // useContext 告诉 React Heading 组件想要读取 LevelContext。
  const level = useContext(LevelContext); //不再通过props传递
    switch (level) {
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      case 5:
        return <h5>{children}</h5>;
      case 6:
        return <h6>{children}</h6>;
      default:
        throw Error('未知的 level：' + level);
    }
  }
  