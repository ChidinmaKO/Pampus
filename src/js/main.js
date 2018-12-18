const Handlebars = require('handlebars');
const axios = require('axios');

Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
});

module.exports = (async function (){
    let html;
    const url = 'https://static.usabilla.com/recruitment/apidemo.json';
    const source = document.getElementById('row-template').innerHTML;
    const contentLoop = document.getElementById('feedback-loop');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const ratingEntries = document.querySelectorAll('.ratings__button');
    const lengthContainer = document.querySelector('.length');
    
    const template = Handlebars.compile(source);
    
    const getDevice = resolution => {
        let device = 'Mobile';
        if(resolution >= 1024) {
            device = 'Desktop'
        } else if(resolution >= 720) {
            device = 'Tablet'
        }
        return device;
    };
    
    const feedback = await axios.get(url);

    const { data: { items } } = feedback;
    const myItems = items.map(item => {
        item.device = getDevice(item.viewport.width);
        return item;
    })
    const context = {
        items: myItems
    };
    html = template(context);
    contentLoop.innerHTML = html;

    const searchFn = event => {
        event.preventDefault();
        const inputValue = searchInput.value;

        const regEx = new RegExp(inputValue, 'i');

        const filteredItems = myItems.filter(item => {
            return regEx.test(item.comment)
        })
        const context = {
            items: filteredItems
        };
        html = template(context);
        contentLoop.innerHTML = html;
        
        lengthContainer.innerHTML = filteredItems.length;
    }

    searchForm.addEventListener('submit', searchFn);
    searchInput.addEventListener('input', searchFn);

    ratingEntries.forEach(entry => {
        entry.addEventListener('click', event => {
            let ratingsContext;
            const ratingElement = event.target;
            
            ratingElement.classList.toggle('ratings__button--selected');
            const selectedRatingButtonList = document.querySelectorAll('.ratings__button--selected');

            const pickedRatings = Array.from(selectedRatingButtonList).map(element => parseInt(element.getAttribute('data-rating')));

            let filteredItems = [];

            if(pickedRatings.length > 0) {
                filteredItems = myItems.filter(item => {
                    return pickedRatings.includes(item.rating);
                })
            } else {
                filteredItems = myItems;
            }
            ratingsContext = {
                items: filteredItems
            };
            lengthContainer.innerHTML = filteredItems.length;
            
            html = template(ratingsContext);
            contentLoop.innerHTML = html;
            
            
        })
    })

    lengthContainer.innerHTML = items.length;

}());