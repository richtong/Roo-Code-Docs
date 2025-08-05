"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedBackground = AnimatedBackground;
var react_1 = require("react");
function AnimatedBackground() {
    var canvasRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(true), isEnabled = _a[0], setIsEnabled = _a[1];
    var _b = (0, react_1.useState)(false), prefersReducedMotion = _b[0], setPrefersReducedMotion = _b[1];
    (0, react_1.useEffect)(function () {
        // Check for user preference in localStorage
        var savedPreference = localStorage.getItem('animatedBackgroundEnabled');
        if (savedPreference !== null) {
            setIsEnabled(savedPreference === 'true');
        }
        // Check for reduced motion preference
        var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        var handleMotionPreferenceChange = function (e) {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener('change', handleMotionPreferenceChange);
        return function () {
            mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        // Don't render animation if disabled or user prefers reduced motion
        if (!isEnabled || prefersReducedMotion)
            return;
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx)
            return;
        // Grid settings - exact values from roocode.com
        var gridSize = 50;
        var gridOpacity = 0.15;
        // Initialize gradient points for lighting effects - exact colors and positions
        var gradientPoints = [
            {
                x: canvas.width * 0.2,
                y: canvas.height * 0.3,
                radius: canvas.width * 0.4,
                color: "rgba(0, 100, 255, 0.15)",
            },
            {
                x: canvas.width * 0.8,
                y: canvas.height * 0.7,
                radius: canvas.width * 0.5,
                color: "rgba(100, 0, 255, 0.1)",
            },
        ];
        // Particle system - reduced particle count for better performance
        var particles = [];
        var particleCount = Math.min(30, Math.floor(window.innerWidth / 60));
        // Set canvas dimensions
        var resizeCanvas = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Update gradient points when canvas is resized
            gradientPoints = [
                {
                    x: canvas.width * 0.2,
                    y: canvas.height * 0.3,
                    radius: canvas.width * 0.4,
                    color: "rgba(0, 100, 255, 0.15)",
                },
                {
                    x: canvas.width * 0.8,
                    y: canvas.height * 0.7,
                    radius: canvas.width * 0.5,
                    color: "rgba(100, 0, 255, 0.1)",
                },
            ];
        };
        // Initial resize and setup
        resizeCanvas();
        // Add resize listener
        window.addEventListener("resize", resizeCanvas);
        // Ensure canvas is properly initialized
        setTimeout(function () {
            resizeCanvas();
            drawGrid();
        }, 0);
        // Draw grid with perspective effect - exact implementation
        function drawGrid() {
            if (!ctx) {
                throw new Error("Context is null (not initialized?)");
            }
            if (!canvas) {
                throw new Error("Canvas is null (not initialized?)");
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw gradient lighting effects
            gradientPoints.forEach(function (point) {
                var gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius);
                gradient.addColorStop(0, point.color);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
            // Draw grid lines with perspective effect
            ctx.strokeStyle = "rgba(50, 50, 70, ".concat(gridOpacity, ")");
            ctx.lineWidth = 0.5;
            // Horizontal lines with perspective
            var horizonY = canvas.height * 0.7; // Horizon point
            var vanishingPointX = canvas.width * 0.5; // Center vanishing point
            // Vertical lines
            for (var x = 0; x <= canvas.width; x += gridSize) {
                var normalizedX = x / canvas.width - 0.5; // -0.5 to 0.5
                ctx.beginPath();
                ctx.moveTo(x, 0);
                // Calculate curve based on distance from center
                var curveStrength = 50 * Math.abs(normalizedX);
                var controlPointY = horizonY - curveStrength;
                // Create curved line toward vanishing point
                ctx.quadraticCurveTo(x + (vanishingPointX - x) * 0.3, controlPointY, vanishingPointX + (x - vanishingPointX) * 0.2, horizonY);
                ctx.stroke();
            }
            // Horizontal lines
            for (var y = 0; y <= horizonY; y += gridSize) {
                var normalizedY = y / horizonY; // 0 to 1
                var lineWidth = gridSize * (1 + normalizedY * 5); // lines get wider as they get closer
                ctx.beginPath();
                ctx.moveTo(vanishingPointX - lineWidth, y);
                ctx.lineTo(vanishingPointX + lineWidth, y);
                ctx.stroke();
            }
            updateParticles();
        }
        var Particle = /** @class */ (function () {
            function Particle() {
                if (!canvas) {
                    throw new Error("Canvas is null (not initialized?)");
                }
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * (canvas.height * 0.7); // Keep particles above horizon
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.color = "rgba(100, 150, 255, ";
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            Particle.prototype.update = function () {
                if (!canvas) {
                    throw new Error("Canvas is null (not initialized?)");
                }
                this.x += this.speedX;
                this.y += this.speedY;
                // Boundary check
                if (this.x > canvas.width)
                    this.x = 0;
                else if (this.x < 0)
                    this.x = canvas.width;
                if (this.y > canvas.height * 0.7)
                    this.y = 0;
                else if (this.y < 0)
                    this.y = canvas.height * 0.7;
                // Pulsate opacity
                this.opacity += Math.sin(Date.now() * 0.001) * 0.01;
                this.opacity = Math.max(0.1, Math.min(0.7, this.opacity));
            };
            Particle.prototype.draw = function () {
                if (!ctx) {
                    throw new Error("Context is null (not initialized?)");
                }
                ctx.fillStyle = "".concat(this.color).concat(this.opacity, ")");
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            };
            return Particle;
        }());
        // Initialize particles
        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        // Connect particles with lines
        function connectParticles() {
            if (!ctx) {
                throw new Error("Context is null (not initialized?)");
            }
            var maxDistance = 150;
            for (var a = 0; a < particles.length; a++) {
                for (var b = a; b < particles.length; b++) {
                    var dx = particles[a].x - particles[b].x;
                    var dy = particles[a].y - particles[b].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < maxDistance) {
                        var opacity = (1 - distance / maxDistance) * 0.5;
                        ctx.strokeStyle = "rgba(100, 150, 255, ".concat(opacity, ")");
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        function updateParticles() {
            particles.forEach(function (particle) {
                particle.update();
                particle.draw();
            });
            connectParticles();
        }
        // Animation loop
        var animationId;
        var frameCount = 0;
        // Target position for smooth following
        var targetX = canvas.width * 0.2;
        var targetY = canvas.height * 0.3;
        var moveSpeed = 0.05; // Exact speed from roocode.com
        // Move gradient points with mouse - throttled for performance
        var mouseThrottle = false;
        var handleMouseMove = function (e) {
            if (!mouseThrottle) {
                targetX = e.clientX;
                targetY = e.clientY;
                mouseThrottle = true;
                setTimeout(function () { mouseThrottle = false; }, 50); // Throttle to 20fps
            }
        };
        // Update gradient point position in animation loop
        function updateGradientPosition() {
            if (!canvas)
                throw new Error("Canvas is null (not initialized?)");
            // Calculate direction vector
            var dx = targetX - gradientPoints[0].x;
            var dy = targetY - gradientPoints[0].y;
            // Smooth movement using linear interpolation
            gradientPoints[0].x += dx * moveSpeed;
            gradientPoints[0].y += dy * moveSpeed;
            // Adjust radius based on distance to target
            var distanceToTarget = Math.sqrt(dx * dx + dy * dy);
            gradientPoints[0].radius = Math.max(canvas.width * 0.2, Math.min(canvas.width * 0.4, canvas.width * 0.3 + distanceToTarget * 0.1));
        }
        function animate() {
            animationId = requestAnimationFrame(animate);
            frameCount++;
            // Skip every other frame for better performance (30fps instead of 60fps)
            if (frameCount % 2 === 0) {
                updateGradientPosition();
                drawGrid();
            }
        }
        animate();
        window.addEventListener("mousemove", handleMouseMove);
        return function () {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [isEnabled, prefersReducedMotion]);
    // Don't render canvas if animation is disabled
    if (!isEnabled || prefersReducedMotion) {
        return null;
    }
    return <canvas ref={canvasRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            willChange: 'transform' // Hint for GPU optimization
        }}/>;
}
