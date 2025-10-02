import React, { useEffect, useRef } from 'react';
import redirectTo from '../services/redirectTo.js';
const LandingPage = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update() {
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 150;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Return to base position
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }

        // Constant movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce back if too far from base
        const distFromBase = Math.sqrt(
          Math.pow(this.x - this.baseX, 2) + Math.pow(this.y - this.baseY, 2)
        );
        if (distFromBase > 50) {
          const angle = Math.atan2(this.baseY - this.y, this.baseX - this.x);
          this.x += Math.cos(angle) * 0.5;
          this.y += Math.sin(angle) * 0.5;
        }
      }

      draw() {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const spacing = 100;
      const cols = Math.ceil(canvas.width / spacing) + 2;
      const rows = Math.ceil(canvas.height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing - spacing + (Math.random() - 0.5) * 40;
          const y = j * spacing - spacing + (Math.random() - 0.5) * 40;
          particles.push(new Particle(x, y));
        }
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 150})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-4 py-8 md:py-12">
        {/* Header/Logo Area */}
        <div className="w-full max-w-6xl flex justify-center md:justify-start pt-4">
          <div className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-lg md:text-xl shadow-lg">
            PingPal
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl px-4">
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Connect Instantly,
              <br />
              <span className="text-blue-500">Chat Seamlessly</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto">
              Join the future of real-time communication. Where conversations flow and connections grow.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="bg-blue-50 border-2 border-blue-500 text-blue-700 px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold">
              Real-time Messaging
            </div>
            <div className="bg-blue-50 border-2 border-blue-500 text-blue-700 px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold">
              Secure & Private
            </div>
            <div className="bg-blue-50 border-2 border-blue-500 text-blue-700 px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-semibold">
              Lightning Fast
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="w-full max-w-md pb-8">
          <button className="w-full bg-black hover:bg-blue-600 text-white font-semibold py-4 md:py-5 px-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/50 flex items-center justify-center gap-3 md:gap-4 text-base md:text-lg group" onClick={() => redirectTo(import.meta.env.VITE_BACKEND_URL+"/auth/google")}>
            <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="group-hover:tracking-wide transition-all duration-300">
              Continue with Google
            </span>
          </button>
          
          <p className="text-center text-gray-500 text-xs md:text-sm mt-4">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;