const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  console.log(data);
  const phones = data.data;

  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // step 1: container id
  const phoneContainer = document.getElementById("phone-container");
  //clear phone container cards before adding new cards
  phoneContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  } else {
  }

  //console.log(phones);
  //for each marbo karon pottek ta ui te marbo
  phones.forEach((phone) => {
    console.log(phone);

    //Step 2: create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl`;
    //step 3: set innerHtml
    phoneCard.innerHTML = `<figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title justify-center">${phone.phone_name}</h2>
              <p></p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>`;
    //   step 4 : Append Child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

//single phone
const handleShowDetails = async (id) => {
  //console.log("okay", id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  //console.log(data);
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  //console.log(phone);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img  src="${phone.image}" alt="">
  <p><span>brand: ${phone?.brand}</span></p>
  <p><span>Storage: ${phone?.mainFeatures?.storage}</span></p>
  <p><span>displaySize: ${phone?.mainFeatures?.displaySize}</span></p>
  <p><span>chipSet: ${phone?.mainFeatures?.chipSet}</span></p>
  <p><span>memory: ${phone?.mainFeatures?.memory}</span></p>
  <p><span>releaseDate: ${phone?.releaseDate}</span></p>
  <p><span>GPS: ${phone?.others?.GPS|| 'NO GPS'}</span></p>
  `;
  show_details_modal.showModal();
};

// Handle Search Button

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  //console.log('okay')
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const handleSearch2 = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field2");
  const searchText = searchField.value;
  //console.log(searchText);
  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

//handle-show-all
const handleShowAll = () => {
  handleSearch(true);
};
loadPhone();
