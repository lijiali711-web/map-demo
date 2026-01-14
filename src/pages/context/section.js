import { useContext } from 'react'; //引入 useContext
import "./index.css";
import { LevelContext } from "../../Context/LevelContext"; //引入 把它们用 context provider 包裹起来  以提供 LevelContext 给它们：

export default function Section({ children }) {
  // “如果在 <Section> 组件中的任何子组件请求 LevelContext，给他们这个 level。”
  // 组件会使用 UI 树中在它上层最近的那个 <LevelContext.Provider> 传递过来的值。
  // todo 你将一个 level 参数传递给 <Section>。
  // todo  Section 把它的子元素包在 <LevelContext.Provider value={level}> 里面。
  //  todoHeading 使用 useContext(LevelContext) 访问上层最近的 LevelContext 提供的值。
  const level = useContext(LevelContext);

  return (
    <section className="section">
      {/* 通过value传值 */}
      {/* {<LevelContext.Provider value={level}>{children}</LevelContext.Provider>} */}
      {/* //todo 直接子级+1 由于 context 让你可以从上层的组件读取信息，每个 Section 都会从上层的 Section 读取 level，并自动向下层传递 level + 1。 */}
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
