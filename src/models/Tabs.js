import React, { useRef, useEffect, useState } from "react";
import styles from "../css/tabs.css";
import Dropdown from "./selector";
import Chat from "./Chat";
import Input from "../models/Input";
var translate = 0;

const scrollItemTabs = function (item, arrow) {
  if (
    !item.current.children[0].style.transform ||
    item.current.children[0].style.transform.indexOf("(0px") > 0
  ) {
    translate -= 100;
    arrow.current.classList.toggle("back");
  } else {
    translate += 100;
  }
  // console.log('translate', );
  [].map.call(item.current.children, (obj) => {
    obj.style.transform = `translate(${translate}px, 0)`;
  });
};

const resizeTabs = (targetRef, tabRef) => {
  const arrow = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const tabsBox = tabRef.current;

  useEffect(() => {
    function handleResize() {
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
          height: targetRef.current.offsetHeight,
        });
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dimensions.width < 550) {
    if (tabRef.current !== undefined)
      tabRef.current.style.maxWidth = `${dimensions.width - 170}px`;
    return (
      <div
        ref={arrow}
        className="some"
        style={{ left: `${dimensions.width - 220}px` }}
        onClick={() => scrollItemTabs(tabRef, arrow)}
      ></div>
    );
  }
};

function Tabs(props) {
  const [showIcon, setShowIcon] = useState(false);
  const [myReload, setMyreload] = useState({});
  
  const minMax = useRef();
  const targetRef = useRef();
  const tabRef = useRef();

  function minimizeSize(item) {
    item.current.style.height = "0px";
    setShowIcon(true);
  }
  function maximizeSize(item) {
    if (!item.current.style.maxWidth && !item.current.style.maxHeight) {
      item.current.style.maxWidth = "100%";
      item.current.style.maxHeight = "100%";
    } else {
      item.current.removeAttribute("style");
    }
    setShowIcon(false);
  }
  function restoreSize(item) {
    item.current.removeAttribute("style");
    setShowIcon(false);
  }

  const IconChat = () => (
    <div className="icon-chat" onClick={() => restoreSize(minMax)}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 60 60"
      >
        <g>
          <path d="M10,25.465h13c0.553,0,1-0.448,1-1s-0.447-1-1-1H10c-0.553,0-1,0.448-1,1S9.447,25.465,10,25.465z" />
          <path d="M36,29.465H10c-0.553,0-1,0.448-1,1s0.447,1,1,1h26c0.553,0,1-0.448,1-1S36.553,29.465,36,29.465z" />
          <path d="M36,35.465H10c-0.553,0-1,0.448-1,1s0.447,1,1,1h26c0.553,0,1-0.448,1-1S36.553,35.465,36,35.465z" />
          <path d="M54.072,2.535L19.93,2.465c-3.27,0-5.93,2.66-5.93,5.93v5.124l-8.07,0.017c-3.27,0-5.93,2.66-5.93,5.93v21.141 c0,3.27,2.66,5.929,5.93,5.929H12v10c0,0.413,0.254,0.784,0.64,0.933c0.117,0.045,0.239,0.067,0.36,0.067 c0.276,0,0.547-0.115,0.74-0.327l9.704-10.675l16.626-0.068c3.27,0,5.93-2.66,5.93-5.929v-0.113l5.26,5.786 c0.193,0.212,0.464,0.327,0.74,0.327c0.121,0,0.243-0.022,0.36-0.067c0.386-0.149,0.64-0.52,0.64-0.933v-10h1.07 c3.27,0,5.93-2.66,5.93-5.929V8.465C60,5.196,57.341,2.536,54.072,2.535z M44,40.536c0,2.167-1.763,3.929-3.934,3.929l-17.07,0.07 c-0.28,0.001-0.548,0.12-0.736,0.327L14,53.949v-8.414c0-0.552-0.447-1-1-1H5.93c-2.167,0-3.93-1.763-3.93-3.929V19.465 c0-2.167,1.763-3.93,3.932-3.93l9.068-0.019c0,0,0,0,0,0c0.001,0,0.001,0,0.002,0l25.068-0.052c2.167,0,3.93,1.763,3.93,3.93 v18.441V40.536z M58,29.606c0,2.167-1.763,3.929-3.93,3.929H52c-0.553,0-1,0.448-1,1v8.414l-5-5.5V19.395 c0-3.27-2.66-5.93-5.932-5.93L16,13.514v-5.12c0-2.167,1.763-3.93,3.928-3.93l34.141,0.07c0.001,0,0.001,0,0.002,0 c2.167,0,3.93,1.763,3.93,3.93V29.606z" />
        </g>
      </svg>
    </div>
  );
  const ChatChannels = chanel => (
    <div className='box'>{chanel} чат</div>
  )
  const tab = [
    { title: "Общий", content: <Chat socket={props.socket} myReload={myReload}/> },
    { title: "Клан", content: ChatChannels("Клан") },
    { title: "Друзья", content: ChatChannels("Друзья") },
    { title: "Новости", content: ChatChannels("Новости") },
  ];
  const [active, setActive] = React.useState(0);
  const openTab = (e) => setActive(+e.target.dataset.index);

  return (
    (<style>{styles}</style>),
    (
      <div className="window-chat" ref={minMax}>
        <div className="box-chat">
          <div ref={targetRef} className="tab">
            <div className="canal-chat" ref={tabRef}>
              {tab.map((n, i) => (
                <div
                  className={`tablinks${i === active ? " active" : ""}`}
                  onClick={openTab}
                  data-index={i}
                  key={i}
                >
                  {n.title}
                </div>
              ))}
            </div>
            {resizeTabs(targetRef, tabRef)}
            <div className="chat-control">
              <Dropdown />

              <div className="button" onClick={() => maximizeSize(minMax)}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 512 512"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#ACACAC"
                    stroke="none"
                  >
                    <path d="M2530 4109 c-121 -48 -136 -220 -26 -288 32 -20 47 -21 496 -21 452 0 464 0 527 -22 76 -26 143 -81 176 -142 22 -40 22 -49 27 -541 6 -558 2 -530 77 -576 51 -32 141 -24 184 17 61 57 59 31 59 772 l0 678 -22 44 c-17 33 -35 51 -68 68 l-44 22 -681 -1 c-427 0 -689 -4 -705 -10z" />
                    <path d="M1105 2640 c-28 -11 -72 -60 -84 -93 -7 -19 -11 -251 -11 -706 l0 -677 23 -44 c16 -33 34 -51 67 -68 l45 -22 692 2 c684 3 692 3 720 24 99 73 98 212 -1 273 -32 20 -47 21 -496 21 -452 0 -464 0 -527 22 -76 26 -143 81 -176 142 -22 40 -22 49 -27 541 -6 556 -2 530 -75 575 -34 21 -112 26 -150 10z" />
                  </g>
                </svg>
              </div>
              <div className="button" onClick={() => minimizeSize(minMax)}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 512 512"
                >
                  <g
                    transform="translate(0,512) scale(0.100000,-0.100000)"
                    fill="#ACACAC"
                    stroke="none"
                  >
                    <path d="M862 2813 c-61 -21 -128 -92 -147 -155 -19 -65 -19 -91 0 -156 11 -35 29 -65 60 -96 83 -83 -66 -77 1790 -74 l1650 3 41 22 c178 95 178 351 0 446 l-41 22 -1655 2 c-1455 1 -1660 0 -1698 -14z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          {tab[active].content}
          <Input socket={props.socket} msgReload={e =>{setMyreload(e)}}/>
        </div>
        {showIcon ? <IconChat /> : ""}
      </div>
    )
  );
}

export default Tabs;

// ReactDOM.render(<Tabs items={items} />, document.getElementById('app'));
