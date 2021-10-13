import React, { useEffect, useState } from "react";
import styles from "../css/selector.css";
import 'font-awesome/css/font-awesome.min.css';




const data = [
    {id: 0, label: "RU", command: 'ru'},
    {id: 1, label: "EN", command: 'en'},
    {id: 2, label: "ZHO", command: 'zho'}
];
function Dropdown(){
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(0);
  
  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(0) : (setSelectedItem(id), toggleDropdown(), console.log(data.find(item => item.id == id).command) );
  }
  
  return (
    <style>{styles}</style>,
    <div className='dropdown'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {selectedItem >=0 ? items.find(item => item.id == selectedItem).label : "Select language"}
        <i className={`fa fa-chevron-down icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map((n, i) => (
          <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={n.id} key={i}>
            <span className={`dropdown-item-dot ${n.id == selectedItem && 'selected'}`}>• </span>
            {n.label}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Dropdown