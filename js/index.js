const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
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
  if(!isShowAll){
    phones = phones.slice(0, 12);
  }else{

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
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>`;
    //   step 4 : Append Child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
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
const handleShowAll = () =>{
  handleSearch(true);

}
//loadPhone();
