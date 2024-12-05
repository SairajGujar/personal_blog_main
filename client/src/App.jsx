import List from "./components/List";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar admin={false}></Navbar>

      <div className='flex flex-col w-full bg-slate-400 items-center h-[100vh] justify-center'>
        <List admin={false}/>
      </div>
    </>
  );
}

export default App;
