let counterClick = false;

function getData() {
  const url = 'http://127.0.0.1:8000/';
  fetchData(url); 
  
  function renderProducts (data) {
    let listKeys = Object.keys(data)
    let blockRec = '';
    for (let i=0; i<listKeys.length; i++) {
      blockRec += `
      <div id="blockResult"> 
        <div class="currencyTransfer">Валюта
          <div class="blockCurTrf CurRes">${listKeys[i]}</div>
          <div class="blockCurTrf">1</div>
        </div>
        <div class="currencyTransfer">Валюта 
          <div class="blockCurTrf">RUB</div>
          <div class="blockCurTrf res">${data[listKeys[i]]}</div>
        </div>
      </div>`;
      }
      if (counterClick === false){ 
      document.querySelector('.products').innerHTML += blockRec;
      counterClick = true;
    }
  }

    async function fetchData(url) {
      const response = await fetch(url)
      const data = await response.json()
      renderProducts (data);
    }
  }

document.querySelector('#btnAdd').addEventListener('click', () => {
  getData()
})

document.querySelector('#btnDelete').addEventListener('click', () => {
  document.querySelector('.products').innerHTML = "";
  counterClick = false;
})
