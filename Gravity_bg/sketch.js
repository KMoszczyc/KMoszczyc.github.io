const G_CONSTANT = 0.02;
const PLANETS_COUNT = 50;
const ASTEROIDS_COUNT = 200;

let particles = [];
let canvas;
let maxWidth, maxHeight;

/**
 * Setup function called once in a simulation.
 */
function setup() {
    maxHeight = window.innerHeight + 100;
    maxWidth = window.innerHeight;

    canvas = createCanvas(maxWidth, maxHeight);
    window.addEventListener("resize", onCanvasResize, false);

    console.log(window.innerWidth, window.innerHeight);
    for (let i = 0; i < ASTEROIDS_COUNT; i++) {
        particles.push(createParticle(0, 2));
    }

    for (let i = 0; i < PLANETS_COUNT; i++) {
        particles.push(createParticle(4, 12));
    }

    // make simulation faster on phones
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        PLANETS_COUNT = 10;
        ASTEROIDS_COUNT = 20;
        pixelDensity(1);
        console.log("runnin on a phone!");
    }
}

/**
 * Draw function called 60 times a second at max (the more demanding the simulation the less calls)
 */
function draw() {
    // sets a transparent background that gives the particles a nice fading trail effect
    background("rgba(0, 0, 0, 0.05)");

    // update forces
    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
            if (i != j) {
                const dist = p5.Vector.dist(particles[i].pos, particles[j].pos);
                const dir = p5.Vector.sub(particles[j].pos, particles[i].pos).normalize();
                const r_combined = particles[i].radius + particles[j].radius;
                const force = dir.mult((G_CONSTANT * particles[i].mass * particles[j].mass) / (dist * dist + r_combined * 2));

                particles[i].force.add(force);
            }
        }
    }

    // move and show
    for (let i = 0; i < particles.length; i++) {
        particles[i].move();
    }

    noStroke();
    for (let i = 0; i < particles.length; i++) {
        particles[i].show();
    }
}

/**
 * Helper function for canvas resizing, designed to minimize the number of times canvas gets resized. (only when browser's current height or width is bigger than the canvas)
 */
function onCanvasResize() {
    if (window.innerWidth > maxWidth || window.innerHeight > maxHeight) {
        resizeCanvas(window.innerWidth, window.innerHeight);
        maxHeight = window.innerHeight;
        maxWidth = window.innerWidth;
    }
}

/**
 * Creates a particle with a random radius, and mass in relation to it.
 * @returns a new Particle object (Asteroid - small object, low mass, Planet - bigger object, bigger mass)
 */
function createParticle(minRadius, maxRadius) {
    let radius = random(minRadius, maxRadius);
    let mass = calculateMass(radius);
    return new Particle(random(width), random(height), mass, radius);
}

/**
 * Calculates mass based on modified Newtons equation for gravity. m = r*r*r
 * @param {float} radius 
 * @returns 
 */
function calculateMass(radius) {
    return radius * radius * radius;
}
