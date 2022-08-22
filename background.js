chrome.contextMenus.create({
    title: "Invert!",
    contexts:["all","page","selection","link","editable", "frame", "image", "link", "page", "page_action"],
    onclick: function(info, tab){
        chrome.tabs.executeScript(tab.id, {
          code: `(${findImg})(${JSON.stringify(info)})`,
          frameId: info.frameId,
          matchAboutBlank: true,
          runAt: 'document_start',
        }, ([result] = []) => {
          if (chrome.runtime.lastError) {
            console.error('Error: ' + chrome.runtime.lastError.message);
          } else {
            // console.log(result);
          }
        });
      }
});

function findImg({mediaType, srcUrl}){
  const tagID = mediaType === 'image' ? 'img' : mediaType;
  
  for (const ele of document.querySelectorAll(tagID)) {
    if (ele.src === srcUrl) {
      if(ele.style.filter==="invert(100%)"){
        ele.style.filter= "invert(0%)";
      }else{
        ele.style.filter= "invert(100%)";
      }
      ele.style.mixBlendMode = "difference";
      return ele.style.filter;
    }
  }
}