import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: "#app",
        data: {
            countries : [],
            selectedCountry: null,
            favouriteCountries: [],
            neighbours: [],
            neighboursPopulation: 0
        },
        mounted(){
            this.fetchCountries()
        },

        computed: {
            totalPopulation: function(){
                return this.countries.reduce((total, country) => {
                    return total += country.population
                }, 0)
            }
        },

        methods: {
            fetchCountries: function(){
                fetch("https://restcountries.eu/rest/v2/all")
                .then(response => response.json() )
                .then(data => this.countries = data)
            },
          
            saveCountry: function(){
                if(!this.favouriteCountries.includes(this.selectedCountry)){
                    this.favouriteCountries.push(this.selectedCountry)
                }
               
            },

            getNeighbours: function(){
                this.neighboursPopulation = 0
                this.neighbours = [];
                const neighbourCodes = this.selectedCountry.borders

                 for (const country of this.countries){
                    if (neighbourCodes.includes(country.cioc)){
                       this.neighbours.push(country.name)
                       this.neighboursPopulation += country.population
                    }   
                 }
                
                 return this.neighbours.join(", ")
            }

        }

    });
});