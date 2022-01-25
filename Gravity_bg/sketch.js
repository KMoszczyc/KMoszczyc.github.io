let PLANETS_COUNT = 50;
let ASTEROIDS_COUNT = 200;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    PLANETS_COUNT = 10;
    ASTEROIDS_COUNT = 20;
    console.log('runnin on a phone!')
}


let PARTICLE_COUNT = PLANETS_COUNT + ASTEROIDS_COUNT;

let particles = [];
let particlesPivotIndex = ASTEROIDS_COUNT;

const G_CONSTANT = 0.02;
let ASTEROID_MASS_PER_PX = 1;
let PLANET_MASS_PER_PX = 100;
let canvas

const asteroidsSlider = document.getElementById("asteroids-slider");
const asteroidsSliderValue = document.getElementById("asteroids-value");

const planetsSlider = document.getElementById("planets-slider");
const planetsSliderValue = document.getElementById("planets-value");

const asteroidGravitySlider = document.getElementById("asteroid-gravity-slider");
const asteroidGravitySliderValue = document.getElementById("asteroid-gravity-value");

const planetGravitySlider = document.getElementById("planet-gravity-slider");
const planetGravitySliderValue = document.getElementById("planet-gravity-value");


// asteroidsSliderValue.innerHTML = ASTEROIDS_COUNT;
// asteroidsSlider.value = ASTEROIDS_COUNT;

// planetsSliderValue.innerHTML = PLANETS_COUNT;
// planetsSlider.value = PLANETS_COUNT;

// asteroidGravitySliderValue.innerHTML = ASTEROID_MASS_PER_PX;
// asteroidGravitySlider.value = ASTEROID_MASS_PER_PX;

// planetGravitySliderValue.innerHTML = PLANET_MASS_PER_PX;
// planetGravitySlider.value = PLANET_MASS_PER_PX;

// asteroidsSlider.oninput = function () {
//     asteroidsSliderValue.innerHTML = this.value;
//     ASTEROIDS_COUNT = parseInt(this.value);
//     PARTICLE_COUNT = ASTEROIDS_COUNT + PLANETS_COUNT;
//     updateAsteroidCount();
// };

// planetsSlider.oninput = function () {
//     planetsSliderValue.innerHTML = this.value;
//     PLANETS_COUNT = parseInt(this.value);
//     PARTICLE_COUNT = ASTEROIDS_COUNT + PLANETS_COUNT;
//     updatePlanetCount();
// };


function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", () => resizeCanvas(window.innerWidth, window.innerHeight), false);

    console.log(window.innerWidth, window.innerHeight)
    for (let i = 0; i < ASTEROIDS_COUNT; i++) {
        particles.push(createAsteroid());
    }

    for (let i = 0; i < PLANETS_COUNT; i++) {
        particles.push(createPlanet());
    }

    console.log(ASTEROIDS_COUNT, PLANETS_COUNT, PARTICLE_COUNT);

    // a = [1,2,3,4,5]
    // for(let i=2;i<7; i++){
    //     a = insert(1000,i,a)
    // }
    // // a = insert(1000,3,a)
    // blendMode(DODGE ) ;

    console.log(ASTEROID_MASS_PER_PX, PLANET_MASS_PER_PX)
}

function draw() {
    // background(0, 0, 0, 10);
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

    // console.log(frameRate());
}

function updateAsteroidsMass() {
    for (let i = 0; i < ASTEROIDS_COUNT; i++) {
        particles[i].mass = calculateMass(particles[i].radius)
    }
}

function updatePlanetsMass() {
    for (let i = ASTEROIDS_COUNT; i < particles.length; i++) {
        particles[i].mass = calculateMass(particles[i].radius)
    }
}

function updateAsteroidCount() {
    if (PARTICLE_COUNT > particles.length) {
        for (let i = 0; i < PARTICLE_COUNT - particles.length; i++) {
            if (particles.length == 0) particles.push(createAsteroid());
            else particles = insert(createAsteroid(), i, particles);
        }
    } else if (PARTICLE_COUNT < particles.length) {
        for (let i = particles.length - 1 - PLANETS_COUNT; i >= ASTEROIDS_COUNT; i--) {
            particles.splice(0, 1);
        }
    }
}

function updatePlanetCount() {
    if (PARTICLE_COUNT > particles.length) {
        for (let i = 0; i < PARTICLE_COUNT - particles.length; i++) {
            particles.push(createPlanet());
        }
    } else if (PARTICLE_COUNT < particles.length) {
        for (let i = particles.length - 1; i >= PARTICLE_COUNT; i--) {
            particles.pop();
        }
    }
}

function createAsteroid() {
    let radius = random(0, 2);
    let mass = calculateMass(radius)
    return new Particle(random(width), random(height), mass, radius);
}

function createPlanet() {
    let radius = random(4, 12);
    let mass = calculateMass(radius)
    return new Particle(random(width), random(height), mass, radius);
}

function insert(element, index, arr) {
    return arr.reduce((s, a, j) => (j - index ? s.push(a) : s.push(element, a), s), []);
}

function calculateMass(radius) {
    return radius * radius * radius * ASTEROID_MASS_PER_PX;
}