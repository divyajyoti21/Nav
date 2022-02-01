import './App.css';
import {useEffect, useState, useCallback} from 'react'
import Sidebar from './components/Sidebar/Sidebar';
import leftMenuData from './navigation.json';
import {RiMenuLine, RiArrowDropDownLine } from 'react-icons/ri';
import {MdOutlineAccountCircle} from 'react-icons/md'
import Dropdown from './components/Dropdown/Dropdown'
import dropdownData from './dropdown';

 function App() {
  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);
    const [showHeaderDropdown, setDropdownStatus] = useState(false);
    const [menuData, setMenuData] = useState([])
    const [dropdown, setdropDown] = useState([])

    useEffect(()=>{
      modifyData(leftMenuData);
      setMenuData(leftMenuData);
      setdropDown(dropdownData);
    },[])

    const handleToggler = useCallback(() => {
        if (isExpanded) {
            setIsExpanded(false);
            localStorage.setItem('sidebar-collapsed', true);
            return;
        }
        setIsExpanded(true);
        localStorage.removeItem('sidebar-collapsed');
    });

    const sideBarOpen = useCallback(() => {
      if(!isExpanded) {
        setIsExpanded(true);
        localStorage.removeItem('sidebar-collapsed');
      }
    })

  const modifyData = useCallback((data) => {
    return data.forEach(element => {
      if(element.children.length > 0) {
        element['isOpen'] = false;
        modifyData(element.children);
      }
    });
  })

  const showDropdown = useCallback(() => {
    showHeaderDropdown ? setDropdownStatus(false) : setDropdownStatus(true);
  })

  return (
    <div className="App">
     <div className="header">
       <span>IMG</span>
       <span data-testid="title">WayFair</span>
       <span><span className = "loginName">Hannah<RiArrowDropDownLine size = {25} onClick={showDropdown} /></span><MdOutlineAccountCircle size = {20} className = "account"/></span>
       </div>
       <Dropdown show = {showHeaderDropdown} data = {dropdownData}/>
     <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"} data-testid="sidebar-toggle">
      <div className="sidebar-header">
          <RiMenuLine className="sidebar-icon" data-testid="sidebar-icon" onClick={handleToggler} />
          <h1 className="sidebar-logo" data-testid="logo">LOGO</h1>
      </div>
      <Sidebar data = {leftMenuData} sideBarClick = {sideBarOpen} />
  </div>
    </div>
  );
}

export default App;
