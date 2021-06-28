async function main(){
            console.log('Try to access ');
            const url = 'http://192.168.21.14:9000/statusAPI';
            // const url = 'http://www.google.com' 
            const response = await fetch(url);
            if (response.ok) { // if HTTP-status is 200-299
              let text = await response.text();
              alert('response = ' + text.slice(0, 80))
            } else {
              alert("HTTP-Error: " + response.status);
            }
            
}

main();

// {"host":"192.168.21.14:9000","connection":"keep-alive","user-agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36","accept":"*/*","origin":"null","accept-encoding":"gzip, deflate","accept-language":"zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7"}

