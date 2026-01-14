import { useContext } from 'react';
import { LevelContext } from '../../Context/throughContext';

export default function Section({ children, isFancy }) {
    console.log(LevelContext)
  const level = useContext(LevelContext);
  console.log( level,'level')
  return (
    <section className={
      'section ' +
      (isFancy ? 'fancy' : '')
    }>
        {level}=level
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}