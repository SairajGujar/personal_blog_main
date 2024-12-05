import List from './components/List'
import Navbar from './components/Navbar'
function Admin() {
  

  return (
    <>
      <Navbar admin={true}></Navbar>
      <div className='flex flex-col w-full bg-slate-400 items-center h-[100vh] justify-center'>
        <List admin={true}/>
      </div>
      
    </>
  )
}

export default Admin
