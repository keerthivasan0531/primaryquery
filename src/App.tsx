import '@fortawesome/fontawesome-svg-core/styles.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import QueryPage from './components/QueryPage';
import  CalendarPage  from './components/CalendarPage';
import ContinentTable from './components/Countries';
import TechnicalTable from './components/ContinentTable';
import './components/style.css'
import TextPage from './components/TextPage';
import CategoryBox from './components/Category';


function App() {

  return (
    <>
    <div>
      <QueryPage />
      <CalendarPage />
    <ContinentTable/>
    <TechnicalTable/>
    <TextPage/>
    <CategoryBox/>
    </div>
       </>
  )
}

export default App
