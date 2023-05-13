const app = {};
((app)=>{
    const childUrl = "http://localhost:5000";
    const postEventName = {
        GETLOCALSTORAGE: "_GET_LOCAL_STORAGE"
    };

    app.openChildTab = () => {
        window.open(childUrl);
    }
    
    window.addEventListener("message", (event)=>{
        if(event.origin !== childUrl) return;

        if(event.data === postEventName.GETLOCALSTORAGE ){
            const lsDump = getLocalStorageDump();
            event.source.postMessage(lsDump, childUrl);    
        }
    });
    
    
    function getLocalStorageDump(){
        let ls_dump = {};
        for(let i = 0; i < localStorage.length; ++i){
            const nthKey = localStorage.key(i);
            ls_dump[localStorage.key(i)] = localStorage.getItem(nthKey);
        }
        return ls_dump;
    }
    
    localStorage.setItem("user", "Sandeep");
    localStorage.setItem("password", "Welcome1");
})(app);
