// document.getElementById('navbar').innerHTML=`
// <ul>
//     <h4>Windoor Store</h4>
//     <li><a href="/">Home</a></li>
//     <li><a href="/collection">Collection</a></li>
//     <li><a href="/about">About</a></li>
//     <li><a href="/contact">Contact</a></li>
// </ul>
// `

document.getElementById('navbar').setAttribute('class', 'navbar navbar-expand-lg ')
document.getElementById('navbar').innerHTML = `
  <div class="container-fluid">
    <a class="navbar-brand text-light" href="/">Product Park</a>
    <button class="navbar-toggler text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon text-light" style="color: white;"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item py-2 px-2">
          <a class="nav-link active text-light" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item py-2 px-2">
          <a class="nav-link active text-light" aria-current="page" href="/collection">Collection</a>
        </li>
        <li class="nav-item py-2 px-2">
          <a class="nav-link active text-light" aria-current="page" href="/about">About</a>
        </li>
        <li class="nav-item py-2 px-2">
          <a class="nav-link active text-light" aria-current="page" href="/contact">Contact</a>
        </li>
        
        </ul>
        
          <a class="nav-link active text-light  position-relative mx-4" aria-current="page" href="/cart">
            <i style='font-size:1.3rem;' class="bi bi-cart2">
            </i>
            Cart 
            <span id='badge' class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-light">
              0
            </span>
          </a>
        
      <form class="d-flex" role="search" id="searchForm" method="post" >
        <input class="form-control me-2" type="search"  name="query" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-light text-orange" type="submit">Search</button>
      </form>
    </div>
  </div>
`
// Get a reference to the form
const searchForm = document.getElementById('searchForm');

// Add a submit event listener to the form
searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the value of the 'query' input field
  const query = searchForm.querySelector('[name="query"]').value;

  // Redirect to the /search page with the query parameter in the URL
  window.location.href = `/collection?query=${encodeURIComponent(query)}`;
});



let countitem = JSON.parse(localStorage.getItem('buyProducts')) || [];
document.getElementById('badge').innerText=countitem.length
