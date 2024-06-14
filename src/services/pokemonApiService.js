export async function getGroupOfPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                console.error('Error fetching data for group of Pokemon: ', error);
                alert('An error occurred whilst fetching the data for a group of Pokemon')
            })
    })
}

export async function getPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                console.error('Error fetching data for specific Pokemon: ', error);
                alert('An error occurred whilst fetching the data for a Pokemon')
            })
    })
}