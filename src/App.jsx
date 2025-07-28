import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [cameraOn, setCameraOn] = useState(false);
  const [classification, setClassification] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);  // Store media stream here

  const toggleCamera = async () => {
    if (!cameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;      // Save stream to ref
        setCameraOn(true);               // Render video element
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    } else {
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setCameraOn(false);
    }
  };

  useEffect(() => {
    if (cameraOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(e => {
        console.error("Error playing video:", e);
      });
    } else if (!cameraOn && videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [cameraOn]);

  const captureImage = async () => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "capture.png");

      try {
        const res = await fetch("http://localhost:8000/predict", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("Prediction:", data);

        setClassification(`${data.label} (${Math.round(data.confidence * 100)}%)`);
      } catch (error) {
        console.error("Error sending image to API:", error);
      }
    }, "image/png");
  };

  return (
    <>
      <div className="mainContainer">
        <div className="content">
          <div className="appName">
            <h1>SMART BIN</h1>

            <div className="oceanWaves">
              <svg
                className="editorial"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
              >
                <defs>
                  <path
                    id="gentle-wave"
                    d="M-160 44c30 0 
                      58-18 88-18s
                      58 18 88 18 
                      58-18 88-18 
                      58 18 88 18
                      v44h-352z"
                  />
                </defs>
                <g className="parallax">
                  <use xlinkHref="#gentle-wave" x="50" y="0" fill="#4579e2" />
                  <use xlinkHref="#gentle-wave" x="50" y="3" fill="#3461c1" />
                  <use xlinkHref="#gentle-wave" x="50" y="6" fill="#2d55aa" />
                </g>
              </svg>
            </div>
          </div>
          
          <div className="appInfo">
            <h3>next gen trashing <br /></h3>
            <h3>smarter and sustainable</h3>
            <div className="forest">
              <div className="tree tree-one">
                <div className="top-one"></div>
                <div className="trunk-one"></div>
                <div className="trunk-one-bottom"></div>
                <div className="branch-one-right">
                  <div className="branch-one-r"></div>
                  <div className="branch-one-r branch-2r"></div>
                </div>
                <div className="branch-one-left">
                  <div className="branch-one-l"></div>
                  <div className="branch-one-l branch-2l"></div>
                </div>
              </div>
              <div className="tree tree-two">
                <div className="top-two"></div>
                <div className="trunk-two"></div>
                <div className="trunk-two-bottom"></div>
                <div className="branch-two-right">
                  <div className="branch-two-r branch-rf"></div>
                  <div className="branch-two-r branch-rs"></div>
                  <div className="branch-two-r branch-rt"></div>
                </div>
                <div className="branch-two-left">
                  <div className="branch-two-l branch-lf"></div>
                  <div className="branch-two-l branch-ls"></div>
                  <div className="branch-two-l branch-lt"></div>
                </div>
              </div>
              <div className="tree tree-three">
                <div className="top-three"></div>
                <div className="trunk-three"></div>
                <div className="trunk-three-bottom"></div>
                <div className="branch-three-right">
                  <div className="branch-three-r"></div>
                  <div className="branch-three-r branch-three-rs"></div>
                </div>
                <div className="branch-three-left">
                  <div className="branch-three-l"></div>
                  <div className="branch-three-l branch-three-ls"></div>
                </div>
              </div>
              <div className="tree tree-four">
                <div className="top-four"></div>
                <div className="trunk-four"></div>
                <div className="trunk-four-bottom"></div>
              </div>
              <div className="tree tree-five">
                <div className="top-five"></div>
                <div className="trunk-five"></div>
                <div className="trunk-five-bottom"></div>
                <div className="branch-five-right">
                  <div className="branch-five-r"></div>
                  <div className="branch-five-r branch-five-rs"></div>
                </div>
                <div className="branch-five-left">
                  <div className="branch-five-l"></div>
                  <div className="branch-five-l branch-five-ls"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainProd">
            <h5>Capture Object -&rarr; Classify trash -&rarr; Throw in the right bin!</h5>
            <div className="picture">
              {cameraOn && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: "300px", border: "2px solid white", borderRadius: "8px" }}
                />
              )}
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
            <div className="controls">
              <button className="cameraOp" onClick={toggleCamera}>
                {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
              </button>
              <button className="captureOp" onClick={captureImage}>
                Capture
              </button>
            </div>
          </div>
          <div className="classification">
            <h3>Classification: {classification} </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
