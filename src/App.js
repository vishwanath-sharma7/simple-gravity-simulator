import { useEffect, useRef, useState } from "react";

function App() {


  const [isRunning, setIsRunning] = useState(false)
  const [gravity, setGravity] = useState(0)
  const [drag, setDrag] = useState(1)






  const updateGravity = (e) => {
    setGravity(e.target.value)

  }

  const updateDrag = (e) => {
    setDrag(e.target.value)

  }





  const toggleIsRunning = () => {
    setIsRunning(prev => !prev)
  }

  const canvasRef = useRef(null);





  function Star({ position = { x: 100, y: 100 }, velocity = { x: 0, y: 0 } }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 10;

    this.draw = (c) => {
      c.fillStyle = `rgba(255,0,0 , 0.7)`;
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      c.fill();
    }

    this.update = (c, canvas) => {

      this.draw(c)
      //velocities
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      //gravity 

      // if(this.position.y + this.velocity.y + this.radius >= canvas.height)

      this.velocity.y += (gravity / 100)
      //bounce 

      if (this.position.y + this.velocity.y + this.radius >= canvas.height) {
        this.velocity.y = -(this.velocity.y - (drag / 10))
      }


      if (this.position.y + this.velocity.y + this.radius >= canvas.height) {
        this.velocity.y = 0
      }

    }


  }

  let stars = []

  for (let i = 1; i < 10; i++) {
    stars.push(new Star(
      {
        position: { x: (i * 50) + 100, y: (i * 50) },

      }
    ))
  }





  useEffect(() => {

    const canvas = canvasRef.current;

    const c = canvas.getContext('2d');

    canvas.width = 720
    canvas.height = 480

    let animationFrameId;

    //animation loop

    const animate = () => {

      animationFrameId = requestAnimationFrame(animate)

      c.fillStyle = "black"
      c.fillRect(0, 0, canvas.width, canvas.height)

      if (isRunning) {
        stars.forEach(star => {
          star.update(c, canvas)
        })
      }

    }

    animate()


    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  })


  return (
    <div className="bg-slate-500 h-screen w-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-5">
        Simple Gravity Simulator
      </h1>
      <div>
        <div className="text-white absolute z-50 p-4 flex flex-col">
          <h1>Adjust Parameters</h1>
          <h1 className="my-2">Gravity: {gravity}</h1>
          <input type="range" min="0" step="1" max="10" value={gravity} onChange={(e) => updateGravity(e)} className="h-10 " />
          <h1>Drag: {drag} </h1>
          <input type="range" min="0" step="1" max="10" value={drag} onChange={(e) => updateDrag(e)} />
        </div>
        <div className=" h-[480px] w-[720px] absolute z-10 flex items-start justify-end p-10">
          <button className="text-white p-4 cursor-pointer shadow-md shadow-rose-800 hover:scale-105" onClick={toggleIsRunning}>{isRunning ? "Reset" : "Start"}</button>
        </div>
        <canvas ref={canvasRef} className="relative rounded-xl drop-shadow-xl"></canvas>
      </div>
    </div >

  );
}

export default App;
