import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: "#app",
        data: {
            countries : [],
            selectedCountry: null,
            favouriteCountries: [],
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
                this.favouriteCountries.push(this.selectedCountry)
            },
            findBorders: function(){
                const neighbours = [];
                let neighbourCodes = this.selectedCountry.borders

                neighbourCodes.forEach((neighbour) => {
                    this.countries.find((country) => {
                    country.cioc === neighbour
                    neighbours.push(country.name)
                })})
                return neighbours;
            }
        }

    });
});