const count=30;
const apyKey='6OKWzRv-z-iWwCzOYlkFMoHtbJ1MAsOoCGU7LKg4gxU';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apyKey}&count=${count}`;

let ready=false;
let imagesLoaded=0;
let totalImages=0;
const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let photosArray=[];

function imageLoaded(){
    //console.log('loaded');
    //console.log('height',window.innerHeight);
    //console.log('scroll',window.scrollY);
    //console.log('body offsetheight',document.body.offsetHeight);
    imagesLoaded++;
    //console.log('loaded images '+imagesLoaded);
    if ( imagesLoaded===totalImages ) {
        ready=true;
        loader.hidden=true;
        //console.log('ready=',ready);
    }

}

function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    //console.log('total images: ',totalImages);
    
    photosArray.forEach( (photo) => {
        
        //console.log(photo);

        // create a link to unsplash
        const item=document.createElement('a');
                
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');

        //create img tag for photo
        const img=document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        
        img.addEventListener('load',imageLoaded);

        // Put image inside our a element
        item.appendChild(img);
        //console.log(imageContainer);
        imageContainer.appendChild(item);


    });

    
    

}

async function get_photos(){

    try {

        const response=await fetch(apiUrl);
        photosArray=await response.json();        
        displayPhotos();
        
    } catch (error) {
        
    }

}

window.addEventListener('scroll', (evt) => {
    //console.log('height',window.innerHeight);
    //console.log('scroll',window.scrollY);
    //console.log('body height',document.body.offsetHeight);

    if ( window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready ) {
        //console.log('starting to load...');
        ready=false;    
       get_photos();

    }

});




get_photos();