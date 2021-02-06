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

async function getCats() {
    const request = await fetch('http://localhost:3500/cats');
    return request.json();      
}

const renderCats = cats => {
    cats.forEach(cat => {
        const element = document.createElement('li')
        element.innerText = cat.name;
        document.querySelector(".cats > ul").append(element);
    });
}

const listenForNew = () => {
    let inputs = document.querySelectorAll('input');
    inputs.forEach(
        input => input.addEventListener('keypress', async function (e) {
            if (e.key === 'Enter' && inputs[0].value && inputs[1].value) {
                const cat = {
                    name: inputs[0].value,
                    breed: inputs[1].value 
                }
                inputs[0].value = "";
                inputs[1].value = "";
                await fetch('http://localhost:3500/cats', { method:'post', body: JSON.stringify(cat), headers: { "Content-Type": 'application/json'}});
                location.reload();
            }
        })
    )
}

$('document').ready(async function(){
    cats = await getCats();
    breeds = getBreeds(cats);
    numbers = getBreedNumbers(breeds, cats);

    renderCats(cats);
    listenForNew();

    const dataSet = {
        labels: breeds,
        datasets:[{
            backgroundColor: 'purple',
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
                        fontFamily: 'Palatino',
                        fontSize: 15,
                        fontColor: 'purple',
                        beginAtZero: true,
                        precision: 0
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontFamily: 'Palatino',
                        fontSize: 15,
                        fontColor: 'purple'
                    }
                }]
            }
        }
    });
});