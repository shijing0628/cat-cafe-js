let cats = [];

let breeds = [];

let breedNumbers = [];

const getBreeds = cats => {
    const breeds = new Set();
    cats.forEach(cat => breeds.add(cat.breed));
    return Array.from(breeds);
}

const getBreedNumbers = (breeds, cats) => {
    let numbers = [];
    numbers = breeds.map( breed => 
        cats.reduce((n, cat) => 
            breed === cat.breed ? n+1 : n
        , 0)
    );
    return numbers;
}

function getCats() {
    return [
        {
          "id": "287e3da1-c4b2-4ec3-ae18-39bdd5903f3a",
          "name": "Tuna",
          "breed": "Siamese"
        },
        {
          "id": "2823c2e1-9cbf-470a-88dc-bc8691f4d65f",
          "name": "Chester",
          "breed": "Tabby"
        },
        {
          "id": "2f6a0a8b-1fd4-4294-b7e5-21857903fa99",
          "name": "Blue",
          "breed": "Naked"
        },
        {
          "id": "76084262-9ee3-40af-ab29-fa1ce6cb99a8",
          "name": "Cindy",
          "breed": "Tabby"
        },
        {
          "id": "305eb915-1c40-4db7-928a-abbf1014ab6d",
          "name": "Sally",
          "breed": "Burmese"
        }
      ];      
}

$('document').ready(function(){
    cats = getCats();
    breeds = getBreeds(cats);
    numbers = getBreedNumbers(breeds, cats);

    const dataSet = {
        labels: breeds,
        datasets:[{
            backgroundColor: '#eeeeee',
            borderColor: '#eeeeee',
            borderWidth: 1,
            data: numbers
        }]
    };

    const ctx = document.getElementById('canvas').getContext('2d');
    const breedBar = new Chart(ctx, {
        type: 'bar',
        data: dataSet,
        options: {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }]
            }
        }
    });
});