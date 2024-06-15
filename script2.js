const containerUserCards = document.getElementById('container-cards');
let loading = false; 
let filteringApplied = false; //флажок для завантаження контенту при скролі
let originalUsers = []; //масив початкових юзерів при завантаженні сторінки і скролі (показується коли скидаються всі фільтри)

initializeFunctions();
Logout();

function initializeFunctions() {
    SortByAge();
    SortByName();
    SortByDateJoined();
    filterByAge();
    filterByCountry();
    filterByGender();
    Reset();
    filterByName();
    document.addEventListener('DOMContentLoaded', () => {
        GenerateRandomUsers(30);
    });
}

class User {
    static allUsers = [];

    constructor(photo, name, age, email, phoneNumber, country, dateJoin, gender) {
        this.photo = photo;
        this.name = name;
        this.age = age;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.dateJoin = new Date(dateJoin);
        this.gender = gender;
        User.allUsers.push(this);
    }

    createUserCard() {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        containerUserCards.appendChild(userCard);

        const userPhoto = document.createElement('img');
        userPhoto.classList.add('photo-usercard');
        userPhoto.src = this.photo;
        userCard.appendChild(userPhoto);

        const userName = document.createElement('span');
        userName.classList.add('text-name-usercard');
        userName.textContent = `${this.name}`;
        userCard.appendChild(userName);

        const userAge = document.createElement('span');
        userAge.classList.add('text-age-usercard');
        userAge.textContent = `I am ${this.age} years old `;
        userCard.appendChild(userAge);

        const userEmail = document.createElement('span');
        userEmail.classList.add('text-email-usercard');
        userEmail.textContent = `${this.email}`;
        userCard.appendChild(userEmail);

        const userPhoneNumber = document.createElement('span');
        userPhoneNumber.classList.add('text-phone-usercard');
        userPhoneNumber.textContent = `${this.phoneNumber}`;
        userCard.appendChild(userPhoneNumber);

        const userCountry = document.createElement('span');
        userCountry.classList.add('text-country-usercard');
        userCountry.textContent = `${this.country}`;
        userCard.appendChild(userCountry);

        const userDateJoin = document.createElement('span');
        userDateJoin.classList.add('text-date-join-usercard');
        userDateJoin.textContent = `Date of joining: ${this.dateJoin.toDateString()}`;
        userCard.appendChild(userDateJoin);

        const textLine = document.createElement('div');
        textLine.classList.add('text-line');
        userCard.appendChild(textLine);

        const userGender = document.createElement('span');
        userGender.classList.add('text-gender-usercard');
        userGender.textContent = `${this.gender}`;
        if (this.gender === 'male') {
            userGender.style.color = 'blue';
        }
        userCard.appendChild(userGender);

        this.element = userCard;
        return userCard;
    }

    static SortUsercardsByAge(order) {
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }
        const sortedUsers = User.allUsers.sort((a, b) => {
            if (order === 'ascending') {
                return a.age - b.age;
            } else if (order === 'descending') {
                return b.age - a.age;
            }
        });

        sortedUsers.forEach(user => user.createUserCard());
    }

    static SortUsercardstByName(order) {
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }
        const sortedUsers = User.allUsers.sort((a, b) => {
            if (order === 'ascending') {
                return a.name.localeCompare(b.name);
            } else if (order === 'descending') {
                return b.name.localeCompare(a.name);
            }
        });

        sortedUsers.forEach(user => user.createUserCard());
    }

    static SortUsercardstByDateJoined(order) {
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }
        const sortedUsers = User.allUsers.sort((a, b) => {
            if (order === 'ascending') {
                return new Date(a.dateJoin) - new Date(b.dateJoin);
            } else if (order === 'descending') {
                return new Date(b.dateJoin) - new Date(a.dateJoin);
            }
        });

        sortedUsers.forEach(user => user.createUserCard());
    }

    static filterUsercardByName(inputName) {
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }
        const filteredUsers = User.allUsers.filter(user => user.name === inputName);
        filteredUsers.forEach(user => user.createUserCard());
    }

    static filterUsercardByAge(inputAge) {
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }
        const filteredUsers = User.allUsers.filter(user => user.age === inputAge);
        filteredUsers.forEach(user => user.createUserCard());
    }

    static filterUsercardByCountry(inputCountry) {
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }
        const filteredUsers = User.allUsers.filter(user => user.country === inputCountry);
        filteredUsers.forEach(user => user.createUserCard());
    }

    static filterUsercardByGender(inputGender) {
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }

        let filteredUsers;

        if (inputGender === 'all') {
            filteredUsers = User.allUsers;
        } else {
            filteredUsers = User.allUsers.filter(user => user.gender === inputGender);
        }

        filteredUsers.forEach(user => user.createUserCard());
    }
}

async function GetRandomUserFromApi(amountUser) {
    try {
        const request = await fetch(`https://randomuser.me/api/?results=${amountUser}`);
        const data = await request.json();
        return data.results;
    } catch (error) {
        console.error('Error during getting data!', error);
        throw error;
    }
}

async function GenerateRandomUsers(amountUser) {
    try {
        loading = true;
        const userInfo = await GetRandomUserFromApi(amountUser);
        userInfo.forEach(user => {
            const newUser = new User(
                user.picture.large,
                `${user.name.first} ${user.name.last}`,
                user.dob.age,
                user.email,
                user.phone,
                user.location.country,
                user.registered.date,
                user.gender
            );
            newUser.createUserCard();
        });
        if (!filteringApplied) {
            originalUsers = [...User.allUsers];
        }
        loading = false;
    } catch (error) {
        console.error('Error during processing data!', error);
        loading = false;
        throw error;
    }
}

window.addEventListener('scroll', () => {
    if (!filteringApplied && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10)&&!loading) {
        console.log('Loading more users...');
        GenerateRandomUsers(6);
     }
});
     
function updateURLSearchParams(params) { //для оновлення url при фільтрах і сортуванні
    const url = new URL(window.location);
    url.search = new URLSearchParams(params).toString();
    window.history.pushState({}, '', url);
}
     
function SortByAge() {
    const buttonSortByAgeAscending = document.querySelector('.ascendAge-button');
    const buttonSortByAgeDescending = document.querySelector('.descendAge-button');
    buttonSortByAgeAscending.addEventListener('click', () => {
        User.SortUsercardsByAge('ascending');
        updateURLSearchParams({ sort: 'age-asc' });
    });
     
    buttonSortByAgeDescending.addEventListener('click', () => {
        User.SortUsercardsByAge('descending');
        updateURLSearchParams({ sort: 'age-desc' });
    });
}
     
function SortByName() {
    const buttonSortByNameAscending = document.querySelector('.ascendName-button');
    const buttonSortByNameDescending = document.querySelector('.descendName-button');
    buttonSortByNameAscending.addEventListener('click', () => {
        User.SortUsercardstByName('ascending');
        updateURLSearchParams({ sort: 'name-asc' });
    });
     
    buttonSortByNameDescending.addEventListener('click', () => {
        User.SortUsercardstByName('descending');
        updateURLSearchParams({ sort: 'name-desc' });
    });
}
     
function SortByDateJoined() {
    const buttonSortByDateJoinedAscending = document.querySelector('.ascendDateJoin-button');
    const buttonSortByDateJoinedDescending = document.querySelector('.descendDateJoin-button');
     
    buttonSortByDateJoinedAscending.addEventListener('click', () => {
        User.SortUsercardstByDateJoined('ascending');
        updateURLSearchParams({ sort: 'date-asc' });
    });
     
    buttonSortByDateJoinedDescending.addEventListener('click', () => {
        User.SortUsercardstByDateJoined('descending');
        updateURLSearchParams({ sort: 'date-desc' });
    });
}
     
function filterByName() {  //функція що миттєво буде шукати (без кнопок) debounce
    const inputName = document.querySelector('.name-text');
    let debounceTimeout;
    inputName.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const inputNameValue = inputName.value.trim();
            if (inputNameValue.length > 0) {
                const filteredUsers = User.allUsers.filter(user => user.name.toLowerCase().includes(inputNameValue.toLowerCase()));
                if (filteredUsers.length === 0) {
                    showModalWindow();
                } else {
                    while (containerUserCards.firstChild) {
                        containerUserCards.removeChild(containerUserCards.firstChild);
                    }
                    filteredUsers.forEach(user => user.createUserCard());
                    updateURLSearchParams({ name: inputNameValue });
                    filteringApplied = true;
                }
            } else {
                updateURLSearchParams({ name: '' });
                filteringApplied = false;
            }
        }, 300);
    });
}
     
function filterByAge() { //звичайна функція з кнопкою
    const filterByAgeButton = document.querySelector('.filter-by-age-button');
    filterByAgeButton.addEventListener('click', () => {
        const inputAge = document.querySelector('.age-number');
        const inputAgeForFilter = parseInt(inputAge.value);
        const filteredUsers = User.allUsers.filter(user => user.age === inputAgeForFilter);
        if (filteredUsers.length === 0) {
            showModalWindow();
        } else {
            User.filterUsercardByAge(inputAgeForFilter);
            updateURLSearchParams({ age: inputAgeForFilter });
            filteringApplied = true;
        }
    });
}
     
function filterByCountry() { //звичайна функція з кнопкою
    const filterByCountryButton = document.querySelector('.filter-by-country-button');
    filterByCountryButton.addEventListener('click', () => {
        const inputCountry = document.querySelector('.country-text');
        const filteredUsers = User.allUsers.filter(user => user.country.toLowerCase() === inputCountry.value.toLowerCase());
        if (filteredUsers.length === 0) {
            showModalWindow();
        } else {
            User.filterUsercardByCountry(inputCountry.value);
            updateURLSearchParams({ country: inputCountry.value });
            filteringApplied = true;
        }
    });
}
     
function filterByGender() {
    const filterByGenderButton = document.querySelector('.filter-by-gender');
    filterByGenderButton.addEventListener('click', () => {
        const inputGenderMale = document.querySelector('.input-male');
        const inputGenderFemale = document.querySelector('.input-female');
        const inputGenderAll = document.querySelector('.input-all');
     
        let selectedGender;
     
        if (inputGenderMale.checked) {
            selectedGender = 'male';
        } else if (inputGenderFemale.checked) {
            selectedGender = 'female';
        } else {
            selectedGender = 'all';
        }
     
        if (selectedGender !== 'all') {
            while (containerUserCards.firstChild) {
                containerUserCards.removeChild(containerUserCards.firstChild);
            }
     
            User.filterUsercardByGender(selectedGender);
            updateURLSearchParams({ gender: selectedGender });
            filteringApplied = true;
        } else {   //коли all то довантаження контенту при скролі буде
            User.filterUsercardByGender(selectedGender);
            updateURLSearchParams({ gender: 'all' });
            filteringApplied = false;
        }
    });
}
     
function Reset() { //очищення та повернутися до початкового масиву
    const resetButton = document.querySelector('.reset-button');
    const inputAge = document.querySelector('.age-number');
    const inputCountry = document.querySelector('.country-text');
    const inputGenderMale = document.querySelector('.input-male');
    const inputGenderFemale = document.querySelector('.input-female');
    const inputGenderAll = document.querySelector('.input-all');
    const inputName = document.querySelector('.name-text');
    resetButton.addEventListener('click', () => {
        inputName.value = "";
        inputAge.value = "";
        inputCountry.value = "";
        inputGenderMale.checked = false;
        inputGenderFemale.checked = false;
        inputGenderAll.checked = true;
     
        while (containerUserCards.firstChild) {
            containerUserCards.removeChild(containerUserCards.firstChild);
        }
        User.allUsers = [...originalUsers];
        User.allUsers.forEach(user => user.createUserCard());
     
        updateURLSearchParams({});
     
        filteringApplied = false;
    });
}
     
function Logout() {
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.addEventListener('click', () => {
        window.location.href = "login-page.html";
        localStorage.clear();
    });
}
     
function showModalWindow() {
    const background = document.querySelector('.overlay');
    const modalWindow = document.getElementById('blockFail');
    modalWindow.style.display = 'block';
    background.style.display = "block";
}

//закрити модальне вікно
document.getElementById('closeWindowFail').addEventListener('click', () => {
    document.getElementById('blockFail').style.display = 'none';
    const background = document.querySelector('.overlay');
    background.style.display = "none";
});
     
     