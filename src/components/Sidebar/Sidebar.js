import React, {useState} from "react";
import "./Sidebar.css";
import {RiArrowDropDownLine, RiArrowDropUpLine} from 'react-icons/ri';
import {BsFillBagFill, BsDownload} from 'react-icons/bs'
import {MdLibraryBooks, MdInventory, MdOutlineProductionQuantityLimits, MdWork, MdArticle, MdFiberManualRecord, MdLaptopMac} from 'react-icons/md'
import {AiFillHome} from 'react-icons/ai'
import {BiSupport} from 'react-icons/bi'

function Sidebar(props) {

const [menu, setMenu] = useState(props.data);

const showHideChild = (evt) => {
    let temp = JSON.parse(JSON.stringify(menu));
    updateData(temp,evt.target.id);
    setMenu(temp);
}

const sideBarClick = () => {
    props.sideBarClick();
}

const updateData = (data, id) => {
    data.forEach(element => {
        if(element.id == id) {
            if(element.isOpen) element.isOpen = false;
            else element.isOpen = true;
        }
        if(element.children) {
            updateData(element.children, id);
        }
    });
}
return(
<div className="sidebar-items">
    {
    menu.map((elem, index) => (
    <React.Fragment>
        <div key = {index} className="item" onClick = {sideBarClick}>
            {
            (() => {
                switch (elem.icon) {
                    case 'reporting':
                        return <MdLibraryBooks className="sidebar-icon"/>
                    case 'tickets':
                        return <MdArticle className="sidebar-icon"/>
                    case 'orders':
                        return <BsFillBagFill className="sidebar-icon"/>
                    case 'castleGate':
                        return <AiFillHome className="sidebar-icon" />
                    case 'inventory':
                        return <MdInventory className="sidebar-icon" />
                    case 'products':
                        return <MdOutlineProductionQuantityLimits className="sidebar-icon"/>
                    case 'premiumShelf':
                        return <MdLaptopMac className="sidebar-icon" />
                    case 'wf-placeholder':
                        return <MdWork className="sidebar-icon" />
                    case 'downloadCenter':
                        return <BsDownload className="sidebar-icon" />
                    case 'helpAndSupport':
                        return <BiSupport className="sidebar-icon" />
                    default:
                        return <MdFiberManualRecord className="sidebar-icon" />
                    }
                })()
                }
                <span className="sidebar-text">{elem.title}</span>
                {
                elem.isOpen ? <RiArrowDropUpLine size= {30} className={elem.children.length > 0 ? "show-button" : "hide-button"} onClick = {showHideChild} id = {elem.id}/> : <RiArrowDropDownLine size= {30} className={elem.children.length > 0 ? "show-button" : "hide-button"} onClick = {showHideChild} id = {elem.id}/>
                }  
                </div>
                <div className={elem.isOpen ? "show-child" : "hide-child"}>
                    {
                    elem.children && <Sidebar data = {elem.children} />
                    }
                </div>
                </React.Fragment>
                ))
                }
                </div>
                );
            }

export default Sidebar;
