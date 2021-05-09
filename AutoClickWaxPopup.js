(async function() {
    console.log('Script Auto Click Popup...')
    let node = document.createElement("span");
    node.style.color = 'red';
    node.style.marginLeft = "1rem";
    node.textContent = 0;
    let count = 0;
    setInterval(_ => {
        if(document.querySelector("div.react-ripples > button")?.disabled == false){
            document.querySelector("div.react-ripples > button").click();
        }
        if(document.querySelector("#root > div > section > div.page-inner-container > div > h1")){
            document.querySelector("#root > div > section > div.page-inner-container > div > h1").append(node);
        }
        node.textContent = count;
        count += 1;
    }, 1000)
    setTimeout(_ => {
        document.querySelector("#root > div > section > div.page-inner-container > div > button").click();
    },90*1000);
})();
