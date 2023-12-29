
import Headers from './Headers'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
  
  return (<>
    <Headers />
    
     <main className=''  >
      <Toaster/>
     {children}
     </main >
    <Footer />
    </>
  )
}

export default Layout
