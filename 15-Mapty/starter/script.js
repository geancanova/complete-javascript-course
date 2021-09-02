'use strict';

class Workout {
    date = new Date();
    id = (Math.round(Date.now() * Math.random()) + '').slice(-10);
    clicks = 0;
    markerId;

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // km
        this.duration = duration; // min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
        return this.description;
    }

    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running';

    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

// const run1 = new Running([39, -12], 5.2, 24, 170);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log([run1, cycling1]);

////////////////////////////////////////
// APLICATION ARCHITECTURE

const form = document.querySelector('.form');
const deleteAllBtn = document.querySelector('.sidebar__btn--delete');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputSort = document.querySelector('.sidebar__sort');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #markers = [];
    #workouts = [];
    #workoutEdit;

    constructor() {
        // Get user's position
        this._getPosition();

        // Get data from local storage
        this._getLocalStorage();

        // Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        inputSort.addEventListener('change', this._sortWorkouts.bind(this));
        deleteAllBtn.addEventListener('click', this._deleteAllWorkouts.bind(this));
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
        containerWorkouts.addEventListener('click', this._editOptions);
        containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
        containerWorkouts.addEventListener('click', this._editWorkout.bind(this));

        console.log(this.#workouts);
    }

    _sortWorkouts() {
        let prop = inputSort.value;

        this.#workouts.sort(function (a, b) {
            switch (prop) {
                case 'date':
                    return new Date(a[prop]).getTime() - new Date(b[prop]).getTime();
                case 'type':
                    return a[prop] > b[prop] ? -1 : 1;
                default: 
                    return a[prop] - b[prop];
            }
        });
        [...document.querySelectorAll('.workout')].forEach(e => e.remove());
        this._setLocalStorage();
        this._getLocalStorage();
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert('Could not get your position');
                }
            );
        }
    }

    _loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        
        const openMap = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        const openrailwaymap = new L.TileLayer('http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png').addTo(this.#map);

        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this));

        // Render workouts on load
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        });
    }
    
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    
    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }
    
    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    
    _newWorkout(e) {
        e.preventDefault();

        // Helper function to check valid inputs
        const validInputs = (...inputs) => 
        inputs.every(inp => Number.isFinite(inp));
        // Helper function to check positive inputs
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        // If activity running, create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;

            // Check if data is valid
            if (
                // !Number.isFinite(distance) ||
                // !Number.isFinite(duration) ||
                // !Number.isFinite(cadence)
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence) 
            )
                return alert('Inputs have to be positive numbers!')

            if (!this.#workoutEdit) {
                workout = new Running([lat, lng], distance, duration, cadence);
            }
        }
        
        // If activity cycling, create cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            // Check if data is valid
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration) 
            )
                return alert('Inputs have to be positive numbers!')

            if (!this.#workoutEdit) {
                workout = new Cycling([lat, lng], distance, duration, elevation);
            }
        }

        if (!this.#workoutEdit) {
            // Add new object to workout array
            this.#workouts.push(workout);

        } else {
            workout = this.#workoutEdit;
            workout.date = new Date(workout.date);
            workout.type = type;
            workout.distance = distance;
            workout.duration = duration;
            workout.description = workout._setDescription();
            this._removeWorkoutMarker(workout)
            
            if (type === 'running') {
                Object.setPrototypeOf(workout, Running.prototype);
                workout.cadence = +inputCadence.value;
                workout.pace = workout.calcPace();
                delete workout.elevationGain;
            }
            
            if (type === 'cycling') {
                Object.setPrototypeOf(workout, Cycling.prototype);
                workout.elevationGain = +inputElevation.value;
                workout.speed = workout.calcSpeed();
                delete workout.pace;
            }

            this.#workoutEdit = undefined;
        }

        // Render workout on list
        this._renderWorkout(workout);

        // Render workout on map as marker
        this._renderWorkoutMarker(workout);
   
        // Hide form + Clear input fields
        this._hideForm();

        // set local storage to all workouts
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout) {
        const icon = L.icon({
            iconUrl: 'icon-custom.png',
            shadowUrl: 'icon-custom-shadow.png',
            iconSize:     [30, 51], // size of the icon
            shadowSize:   [44, 28], // size of the shadow
            iconAnchor:   [15, 51], // point of the icon which will correspond to marker's location
            shadowAnchor: [3, 27],  // the same for the shadow
            popupAnchor:  [0, -55] // point from which the popup should open relative to the iconAnchor
        });
        const newMarker = L.marker(
                workout.coords, {
                    icon
                }
            )
            .addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
        
        // Save marker in markers array
        this.#markers.push(newMarker);
        workout.markerId = newMarker._leaflet_id;
    }

    _removeWorkoutMarker(workout) {
        const markerObj = this.#markers.find(
            marker => marker._leaflet_id === workout.markerId
        );
        markerObj.remove();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__edit">
                    <button class="workout__edit-btn" title="workout options">🔧</button>
                    <ul class="workout__options workout__options--hidden">
                        <li class="workout__options-item workout__options-item--edit" title="edit workout">
                            <span class="workout__options-icon">✍</span>
                            <span class="workout__options-text">Edit</span></li>
                        <li class="workout__options-item workout__options-item--delete" title="delete workout">
                            <span class="workout__options-icon">❌</span>
                            <span class="workout__options-text">Delete</span>
                        </li>
                    </ul>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
        `

        if (workout.type === 'running') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            `;
        }

        if (workout.type === 'cycling') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            `;
        }

        form.insertAdjacentHTML('afterend', html);
    }

    _editOptions(e) {
        const editBtn = e.target.closest('.workout__edit-btn');
        const editOptions = [...document.querySelectorAll('.workout__options')];

        // Hide all visible edit options
        editOptions.forEach(e => e.classList.add('workout__options--hidden'));
        
        if (!editBtn) return;

        // Current workout edit options
        editBtn.nextElementSibling.classList.remove('workout__options--hidden');
    }

    _editWorkout(e) {
        const editWork = e.target.closest('.workout__options-item--edit');

        if (!editWork) return; 
        
        const workoutEl = e.target.closest('.workout');
        const workout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );
        const workoutLatLng = {
            latlng: {
                lat: workout.coords[0], 
                lng: workout.coords[1]
            }
        };

        this.#workoutEdit = workout;
        console.log(this.#workoutEdit);

        if (inputType.value !== workout.type)
            this._toggleElevationField();

        this._showForm(workoutLatLng);

        inputType.value = workout.type;
        inputDistance.value = workout.distance;
        inputDuration.value = workout.duration;

        if (workout.type === 'running') {
            inputCadence.value = workout.cadence;
        }
        
        if (workout.type === 'cycling') {
            inputElevation.value = workout.elevationGain;
        }

        workoutEl.remove();
    }

    _deleteWorkout(e) {
        const deleteWork = e.target.closest('.workout__options-item--delete');

        if (!deleteWork) return;
       
        const workoutEl = e.target.closest('.workout');
        const workout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );
        const workoutIndex = this.#workouts.indexOf(workout);
        workoutEl.remove();
        this._removeWorkoutMarker(workout)
        this.#workouts.splice(workoutIndex, 1);
        this._setLocalStorage();
    }

    _deleteAllWorkouts() {
        const workouts = [...document.querySelectorAll('.workout')];
        const confirmDelete = prompt('Do you really want to delete all workouts? (y/n)');
        
        if (confirmDelete.toLowerCase() === 'y' || confirmDelete.toLowerCase() === 'yes') {
            workouts.forEach(workout => workout.remove());
            this.#markers.forEach(marker => marker.remove());
            this.#workouts.length = this.#markers.length = 0;
            this._setLocalStorage();
        }        
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        if (!workoutEl) return;

        const workout = this.#workouts.find(
            work => work.id === workoutEl.dataset.id
        );

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            }
        });

        // using the public interface (API)
        workout.click();

        // update clicks in local storage
        this._setLocalStorage();
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));

        if (!data) return;

        data.forEach(work => {
            if (work.type === 'running')
                Object.setPrototypeOf(work, Running.prototype);

            if (work.type === 'cycling')
                Object.setPrototypeOf(work, Cycling.prototype);

            this._renderWorkout(work);
        });

        this.#workouts = data;
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new(App);