let guest = 0;

function Cup() {
console.log(guest)
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      {/* <Cup />
      <Cup /> */}
    </>
  );
}