const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad= true;

//unsplash API
let count = 5;
const apiKey = '-FcLcO50n3dNN7ditX7W4nOrXnta-q3bIikSM6WJnX0';   
let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++ 
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }
}

//Helper function to set Attributes on DOM Elements
function setAttribute(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}



//Create Element For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to Unsplash
        const item = document.createElement('a')
        setAttribute(item, {
            href: photo.links.html,
            'target': '_blank',
        })

        //create <img> for photos
        const img = document.createElement('img')
        setAttribute(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

        //Event Listener, check when each img is finished loading
        img.addEventListener('load', imageLoaded);
        // //put <img> inside <a> then put both inside image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);        
    });
}

//Get photos from Unsplash API
async function getPhotos (){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        console.log(error)
    }
}

//Check to see if scrolling near bottom of page, Load More Photos 

window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000 && ready ){
        ready = false
        getPhotos();
    }
});

getPhotos() 


//"https://images.unsplash.com/photo-1714138667818-b545353d768a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjA3OTd8MXwxfGFsbHwxfHx8fHx8Mnx8MTcxNzk1MjkzN3w&ixlib=rb-4.0.3&q=80&w=1080"