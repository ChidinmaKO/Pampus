import Handlebars from 'handlebars';
import axios from 'axios';

export const getDevice = resolution => {
    let device = 'Mobile';
    if(resolution >= 1024) {
        device = 'Desktop'
    } else if(resolution >= 720) {
        device = 'Tablet'
    }
    return device;
};

(async function (){
    let html;
    const url = 'https://static.usabilla.com/recruitment/apidemo.json';
    const source = document.getElementById('row-template').innerHTML;
    const contentLoop = document.getElementById('content-loop');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const ratingEntries = document.querySelectorAll('[id^="rating"]');

    const template = Handlebars.compile(source);
    
    
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
    }

    searchForm.addEventListener('submit', searchFn);
    searchInput.addEventListener('input', searchFn);

    ratingEntries.forEach(entry => {
        entry.addEventListener('click', event => {
            let context;
            const element = event.target;
            
            element.classList.toggle('selected');
            const selectedElements = document.querySelectorAll('.selected');

            const picked = Array.from(selectedElements).filter(element => {
                return element.classList.contains('selected');
            }).map(element => element.textContent);

            if(element.classList.contains('selected')) {
                const filteredItems = myItems.filter(item => {
                    return picked.includes(item.rating.toString());
                })
                context = {
                    items: filteredItems
                };
            } else {
                context = {
                    items: myItems
                }
            }
            
            html = template(context);
            contentLoop.innerHTML = html;
        })
    })
    // module.exports = { template };
}());


