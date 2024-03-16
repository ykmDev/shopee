window.onload = function () {
  // adjustMainMargin();
  paginateList();
};

function adjustMainMargin() {
  var headerHeight = document.querySelector('.header').offsetHeight;
  document.querySelector('.sec-mv').style.marginTop = headerHeight + 'px';
}

function paginateList() {
  var items = document.querySelectorAll('.product-list .item');
  var itemsPerPage = getItemsPerPage(); // Call the function to determine items per page
  var numPages = Math.ceil(items.length / itemsPerPage);

  var paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  var prevButton = document.createElement('a');
  prevButton.href = '#';
  prevButton.textContent = 'Previous';
  prevButton.addEventListener('click', function (event) {
    event.preventDefault();
    showPrevPage(items, itemsPerPage);
  });

  var nextButton = document.createElement('a');
  nextButton.href = '#';
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', function (event) {
    event.preventDefault();
    showNextPage(items, itemsPerPage);
  });

  paginationContainer.appendChild(prevButton);

  for (var i = 1; i <= numPages; i++) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = i;
    link.dataset.page = i;
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var page = parseInt(this.dataset.page, 10);
      showPage(page, items, itemsPerPage);
    });
    paginationContainer.appendChild(link);
  }

  paginationContainer.appendChild(nextButton);

  // Show the first page by default
  showPage(1, items, itemsPerPage);
}

function showPage(page, items, itemsPerPage) {
  var startIndex = (page - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;

  for (var i = 0; i < items.length; i++) {
    if (i >= startIndex && i < endIndex) {
      items[i].style.display = 'block';
    } else {
      items[i].style.display = 'none';
    }
  }

  var paginationLinks = document.querySelectorAll('#pagination a');
  paginationLinks.forEach(function (link) {
    link.classList.remove('active');
    if (parseInt(link.textContent) === page) {
      link.classList.add('active');
    }
  });

  var prevButton = document.querySelector('#pagination a:first-child');
  var nextButton = document.querySelector('#pagination a:last-child');
  if (page === 1) {
    prevButton.style.display = 'none';
  } else {
    prevButton.style.display = 'inline-block';
  }
  if (page === Math.ceil(items.length / itemsPerPage)) {
    nextButton.style.display = 'none';
  } else {
    nextButton.style.display = 'inline-block';
  }
}

function showPrevPage(items, itemsPerPage) {
  var currentPage = getCurrentPage();
  if (currentPage > 1) {
    showPage(currentPage - 1, items, itemsPerPage);
  }
}

function showNextPage(items, itemsPerPage) {
  var currentPage = getCurrentPage();
  var numPages = Math.ceil(items.length / itemsPerPage);
  if (currentPage < numPages) {
    showPage(currentPage + 1, items, itemsPerPage);
  }
}

function getCurrentPage() {
  var activeLink = document.querySelector('#pagination a.active');
  return parseInt(activeLink.textContent, 10);
}

// Function to determine items per page based on screen size
function getItemsPerPage() {
  if (window.innerWidth <= 767) {
    return 10; // Set items per page to 10 for screen width <= 767px
  } else {
    return 5; // Default items per page
  }
}

// Recalculate margin if window is resized
window.onresize = function () {
  // adjustMainMargin();
  paginateList(); // Recalculate pagination on window resize
};

//user dropdown
$(document).ready(function () {
  $('.ico').click(function (event) {
    event.preventDefault();
    $('.user-dropdown').toggleClass('active');
  });

  //menu
  $('.menu-toggle').on('click', function () {
    $(this).toggleClass('active');
    $('.nav').toggleClass('is-show');
  });


  //slider
  $('.multi-slide').slick({
    dots: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1
});
});