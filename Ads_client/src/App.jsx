import './App.css'
import All_Onclicka from './website/Ads/All_Onclicka'
import PageNo1 from './website/Page_no_1/Page_no_1'
import PageNo2 from './website/Page_no_2/Page_no_2'
import PageNo3 from './website/Page_no_3/Page_no_3'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() { 

  return (
    <BrowserRouter>
        <All_Onclicka />
      <Routes>
        <Route path='/:id' element={<PageNo1 />} />
        <Route path='/' element={<PageNo1 />} />
        <Route path='/2/:id' element={<PageNo2 />} />
        <Route path='/2' element={<PageNo2 />} />
        <Route path='/3/:id' element={<PageNo3 />} />
        <Route path='/3' element={<PageNo3 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
