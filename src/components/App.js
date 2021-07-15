import React from 'react'
import anime from 'animejs'

function App() {

  function createBlocks() {
    let container = [];
    for(let i = 1; i <= 100; i++) {
       const block = <div key={i} className="block"></div>;
       container.push(block);
    }
    return container;
  }

  function animate() {
    anime({
      targets: '.block',
      backgroundColor: () => {
        return '#' + anime.random(0, 256).toString(16) + anime.random(0, 256).toString(16) + anime.random(0, 256).toString(16);
      },
      left: () => {
        return anime.random(0, 100) + 'vw';
      },
      top: () => {
        return anime.random(0, 100) + 'vh';
      },
      width: () => {
        return anime.random(0.5, 15) + '%';
      },
      height: () => {
        return anime.random(0.5, 25) + '%';
      },
      borderRadius: () => {
        return anime.random(0, 100) + '%';
      }
    })
  }

  function handleMouseDown(e) {
    const heading = document.querySelector('.content')
    heading.style.position = 'absolute'
    heading.style.zIndex = 100;

    let shiftX = e.clientX - heading.getBoundingClientRect().left;
    let shiftY = e.clientY - heading.getBoundingClientRect().top;

    moveAt(e.pageX, e.pageY, heading);
    document.addEventListener('mousemove', onMouseMove);

    function moveAt(x, y) {
      heading.style.left = x - shiftX + 'px';
      heading.style.top = y - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    heading.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.querySelector('.content').onmouseup = null;
    }
  }

  React.useEffect(() => {
    
  }, [])

  return (
    <div className="app">
      <div className="container">
        {createBlocks()}
      </div>
      <div onMouseDown={handleMouseDown} className="content">
        <h1 className="heading">Click to generate masterpiece of art</h1>
      </div>
      <button className="button" onClick={animate}>It's a Button</button>
    </div>
  );
}

export default App;
