import CourseCards from './courses_cards';
import SidebarComponent from '../bars/sidebar-container';


export default function Dashboard(){

return(
  <div className='dashboard-container'>
  <SidebarComponent />
  <CourseCards />
  </div>
);}