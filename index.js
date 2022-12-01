const btns = document.getElementsByTagName("button");
const inputSize = document.getElementsByClassName("inputSize");
const countwords = document.getElementsByClassName("countwords");
const texteditor = document.getElementsByClassName("localtext");

for(let i = 0; i < btns.length; i++) {
    let button = btns[i];
    
    button.addEventListener('click', (e) =>{setModification(button)});
}

document.addEventListener('selectionchange', () => {

    inputSize[0].value = GetFontSelectionSize().replace("px",""); 
    
});

inputSize[0].addEventListener("change", (e) => {
    document.execCommand("fontSize",false,convertSizeToCommandSize(e.target.value));    
});

function GetFontSelectionSize()
{
    const selection = window.getSelection();
    if (selection) { // make sure it doesn't error if nothing is selected
     const size = window.getComputedStyle(selection.anchorNode.parentElement, null).getPropertyValue('font-size');

          
     return size;
    }

}

function convertSizeToCommandSize(size)
{
    switch(size)
     {
        case "10":
            return 1;
        break;

        case "13":
            return 2;
        break;

        case "16":
            return 3;
        break;

        case "18":
            return 4;
        break;

        case "24":
            return 5;
        break;

        case "32":
            return 6;
        break;

        case "48":
            return 7;
        break;
    }

}



function keydownFunction(e){
    setTimeout(() => {
        countwords[0].innerHTML = document.querySelectorAll('#localtextid')[0].textContent.length;

    }, 500);
};

function setModification(e)
{
    const data = e.dataset.action;
    switch(data){
        case "export-pdf":
            Export2PDF();
            break;
        case "export-word":
            Export2Word();
            break;
        case "forecolor":
            colorChange(e);
            break;
        case "titulo":
            defineTitleStyle();
            break;
        default:
            defaultActions(data);
            break;
    }
}

function defineTitleStyle()
{
    const selection = window.getSelection();
    if (selection) { // make sure it doesn't error if nothing is selected
        defaultActions("justifyCenter");
        document.execCommand("formatBlock",false,"h1");
        const size = selection.anchorNode.parentElement.style.textTransform = "capitalize";

        
     
     //getPropertyValue('text-transform');

    }
}


function colorChange(e)
{
    document.execCommand("foreColor",false,e.value)
 
}

function defaultActions(e)
{
    document.execCommand(e,false);
}



function Export2Word(filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById("localtextid").innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}

function Export2PDF()
{
    const content = document.getElementById("localtextid");
    const title = "meu titulo";
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    mywindow.document.write(`<html><head><title>${title}</title>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(content.innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}
