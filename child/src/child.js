const app = {};
((app)=>{
    const parentUrl = "http://localhost:3000";
    const postEventName = {
        GETLOCALSTORAGE: "_GET_LOCAL_STORAGE"
    };

    app.onGetLocalStorageDataClick = async ()=>{
        try{
            const parentLocalStorage = await getLocalStorageFromParent();
            document.getElementById("ls-data").innerHTML = JSON.stringify(parentLocalStorage);    
        }catch(err){
            document.getElementById("ls-data").innerHTML = "Failed to get parent localStorage"
        }
    }
    
    
    function getLocalStorageFromParent(){
        return new Promise((resolve, reject)=>{
            function messageEvtHandler(event){
                if(event.origin !== parentUrl) return;

                window.removeEventListener("message", messageEvtHandler);
                resolve(event.data);
            }
            window.addEventListener("message", messageEvtHandler);
            window.opener.postMessage(postEventName.GETLOCALSTORAGE, parentUrl);
        });
    }
})(app);


