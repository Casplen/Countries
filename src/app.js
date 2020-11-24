import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: "#app",
        data: {
            countries : [],
            selectedCountry: null,
            favouriteCountries: [],
            borderingCountries: [],
            borderingPopulation: 0
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
                this.borderingPopulation = 0
                this.borderingCountries = [];
                const countryCodes = this.selectedCountry.borders

                this.countries.forEach((country) => {
                    if (countryCodes.includes(country.cioc)) {
                        this.borderingCountries.push(country.name)
                        this.borderingPopulation += country.population
                    }
                 })
                
                 return this.borderingCountries.join(", ")
            }

        }

    });
});