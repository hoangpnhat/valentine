import React, { useState, useEffect, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { Music, PauseCircle, PlayCircle, RotateCw } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const Valentine3DGraph = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const audioRef = useRef(null);
  const fgRef = useRef(null);


  const memories = [
    { id: 0, quote: "Every moment with you feels like magic ✨", image: "/photo/0.jpg" },
    { id: 1, quote: "You make my heart smile 💝", image: "/photo/1.jpg" },
    { id: 2, quote: "Forever isn't long enough with you 💕", image: "/photo/2.jpg" },
    { id: 3, quote: "You are my today and all of my tomorrows. 💖", image: "/photo/3.jpg" },
    { id: 4, quote: "Loving you is the best decision I ever made. 💘", image: "/photo/4.jpg" },
    { id: 5, quote: "You are the melody to my heart’s song. 🎶💕", image: "/photo/5.jpg" },
    { id: 6, quote: "Every love story is beautiful, but ours is my favorite. 💞", image: "/photo/6.jpg" },
    { id: 7, quote: "I found my forever in you. 💍❤️", image: "/photo/7.jpg" },
    { id: 8, quote: "You make my world brighter just by being in it. ☀️💖", image: "/photo/8.jpg" },
    { id: 9, quote: "Holding your hand is my favorite adventure. 🌍💕", image: "/photo/9.jpg" },
    { id: 10, quote: "You are the missing piece that completes my heart. 🧩❤️", image: "/photo/10.jpg" },
    { id: 11, quote: "Every time I see you, I fall in love all over again. 😍", image: "/photo/11.jpg" },
    { id: 12, quote: "I’d choose you in every lifetime. 💑💞", image: "/photo/12.jpg" },
    { id: 13, quote: "Your love is the greatest gift I have ever received. 🎁❤️", image: "/photo/13.jpg" },
    { id: 14, quote: "You are my dream come true. ✨💖", image: "/photo/14.jpg" },
    { id: 15, quote: "Loving you is as easy as breathing. ❤️", image: "/photo/15.jpg" },
    { id: 16, quote: "You're my favorite hello and my hardest goodbye. 💋", image: "/photo/16.jpg" },
    { id: 17, quote: "In your arms, I have found my safe place. 🤗💖", image: "/photo/17.jpg" },
    { id: 18, quote: "I love you more than yesterday, but less than tomorrow. 💕", image: "/photo/18.jpg" },
    { id: 19, quote: "My heart is and always will be yours. ❤️🔐", image: "/photo/19.jpg" },
    { id: 20, quote: "You make even ordinary moments extraordinary. 🌟", image: "/photo/20.jpg" },
    { id: 21, quote: "I love you, not just for who you are but for who I am with you. 💑", image: "/photo/21.jpg" },
    { id: 22, quote: "With you, I’ve found my forever home. 🏡❤️", image: "/photo/22.jpg" },
    { id: 23, quote: "You’re the best thing that ever happened to me. 💖", image: "/photo/23.jpg" },
    { id: 24, quote: "You are the reason I believe in love. 💘", image: "/photo/24.jpg" },
    { id: 25, quote: "My love for you grows stronger every day. 🌱💕", image: "/photo/25.jpg" },
    { id: 26, quote: "No words can describe how much you mean to me. 💓", image: "/photo/26.jpg" },
    { id: 27, quote: "You make my heart race in the best way. 💓💨", image: "/photo/27.jpg" },
    { id: 28, quote: "I never knew love could feel this way until I met you. 💖", image: "/photo/28.jpg" },
    { id: 29, quote: "You are my best friend, my soulmate, my everything. 💞", image: "/photo/29.jpg" },
    { id: 30, quote: "Every moment with you is a precious memory. 📸❤️", image: "/photo/30.jpg" },
    { id: 31, quote: "You’re not just my love, you’re my life. 💕", image: "/photo/31.jpg" },
    { id: 32, quote: "I’d rather spend one lifetime with you than face all the ages alone. 🌹", image: "/photo/32.jpg" },
    { id: 33, quote: "You’re the sunshine that lights up my darkest days. ☀️💕", image: "/photo/33.jpg" },
    { id: 34, quote: "Your love is the sweetest thing I’ve ever known. 🍬❤️", image: "/photo/34.jpg" },
    { id: 35, quote: "When I’m with you, time stops and the world fades away. ⏳💖", image: "/photo/35.jpg" },
    { id: 36, quote: "My heart beats just for you. 💓", image: "/photo/36.jpg" },
    { id: 37, quote: "I love you more than words can express. 📝❤️", image: "/photo/37.jpg" },
    { id: 38, quote: "You are the most beautiful part of my life. 🌸💖", image: "/photo/38.jpg" },
    { id: 39, quote: "With you, love is effortless and perfect. 💞", image: "/photo/39.jpg" },
    { id: 40, quote: "My love for you is endless, like the stars in the sky. ✨❤️", image: "/photo/40.jpg" },
    { id: 41, quote: "You are my Valentine today and always. 💘", image: "/photo/41.jpg" }
  ];
  

  const createHeartShape = (t: number, scale = 10) => {
    // Parametric equations for a heart shape
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const z = 5; // Keep z=0 for 2D heart, or add small random offset for 3D effect
    
    return {
      x: x * scale,
      y: y * scale,
      z: z + (Math.random() - 0.5) * 10 // Small random Z offset for 3D effect
    };
  };

  useEffect(() => {
    // Create nodes positioned in a heart shape
    const nodes = memories.map((memory, index) => {
      const t = (index / memories.length) * 2 * Math.PI;
      const position = createHeartShape(t);
      
      return {
        ...position, // Spread x, y, z coordinates
        id: memory.id,
        memory: memory,
        color: `hsl(${300 + index * 15}, 100%, ${40 + index * 1}%)`,
        size: 15 + Math.random() * 10
      };
    });

    // Create links between nearby nodes
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // Calculate distance between nodes
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        // Only create links between nearby nodes
        if (distance < 30) {
          links.push({
            source: nodes[i].id,
            target: nodes[j].id,
            color: `hsla(${330 + i * 15}, 100%, 75%, 0.3)`,
            value: Math.random()
          });
        }
      }
    }

    setGraphData({ nodes, links });

    // Initial camera position for better view of the heart
    if (fgRef.current) {
      const distance = 2000;
      fgRef.current.cameraPosition({ x: 0, y: 0, z: distance });
    }
  }, []);

  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (fgRef.current && isRotating) {
        const graph = fgRef.current;
        const angle = Date.now() * 0.001;
        const distance = 1000;
        graph.cameraPosition({
          x: distance * Math.sin(angle),
          y: 0,
          z: distance * Math.cos(angle)
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    if (isRotating) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRotating]);

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="absolute top-4 left-4 z-10 space-y-4">
        <h1 className="text-3xl font-bold text-pink-600 animate-pulse">
          Happy Valentine's Day! 💝
        </h1>
        <div className="flex space-x-2">
          <Button 
            onClick={toggleMusic}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            {isPlaying ? <PauseCircle className="inline-block mr-2" /> : <Music className="inline-block mr-2" />}
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </Button>
          <Button 
            onClick={toggleRotation}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <RotateCw className="inline-block mr-2" />
            {isRotating ? 'Stop Rotation' : 'Start Rotation'}
          </Button>
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        src="https://cf-media.sndcdn.com/IemaKgBfTw86.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vSWVtYUtnQmZUdzg2LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzM5NDk0NDk0fX19XX0_&Signature=f08HxAbLRxro6-iF7uyjFdm7MKkeCebTkBgyshtz973rRZ0Mc~M~vkD7-Y1n9ueb0NW7yjIIz2CfLLV5VynsI1FOMxFbhZBbexVNQoQFOYbiDY9fsncjPFbJ3YeiiZ7wUS-sFJS5reh7xaZPAvwyTL6~hUn-8xnR0s6qdW7yUXHrHjM8E-Ol7jbbsO2LyiN3L0XYyhXbF9kgNHh~bBCyRxj63tVCr-1Zpqkf7Mt-Npy4aMRkpiBfrh9jZ-f9njnwJWGipN7KslQI8AG8mtqB7EK9BUJITLcy3JoI6LrUSE7HAqarGkHYmJ25tNCad4vhQBuoVZols8G~bd~CEkaQWQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ"
      />
      
      {graphData.nodes.length > 0 && (
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          nodeLabel={node => node.memory?.date || ''}
          nodeColor="color"
          linkColor="color"
          linkWidth={link => link.value * 2}
          nodeRelSize={6}
          nodeResolution={8}
          nodeOpacity={0.9}
          linkOpacity={0.4}
          onNodeClick={handleNodeClick}
          backgroundColor="rgba(0,0,0,0)"
          showNavInfo={false}
          enableNodeDrag={false}
          enableNavigationControls={!isRotating}
          forceEngine="d3"
        />
      )}

      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="bg-white/95 backdrop-blur rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-pink-600">
              {selectedNode?.memory?.date} ❤️
            </DialogTitle>
          </DialogHeader>
          {selectedNode?.memory && (
            <div className="space-y-4">
              <img 
                src={selectedNode.memory.image}
                alt="Memory"
                className="w-full h-auto max-h-screen object-cover rounded-lg shadow-lg transform transition-transform hover:scale-105"
              />
              <p className="text-lg text-gray-700 italic text-center">
                "{selectedNode.memory.quote}"
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Valentine3DGraph;