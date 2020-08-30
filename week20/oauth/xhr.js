let code = "7131ada9c47621287f7c";
let state = "abc123";
let client_id = "Iv1.6e8c06ad13f8e69b";
let client_secret = "2bb380c85d263520f28969770529f2c58c30ecc5";
let redirect_uri = "http%3A%2F%2Flocalhost";
let post_url = "https://github.com/login/oauth/access_token";

let params = `code=${code}&state=${state}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`;

// get accese_token request 
let xhr = new XMLHttpRequest();

xhr.open("POST",`${post_url}?${params}`, true);
xhr.send(null);

xhr.addEventListener("readystatechange", function(event) {
  if(xhr.readyState === 4) {
    debugger
    console.log(xhr.responseText);
  }
})

// get user request 
let access_token = "aeca30d6d92e570ce2217f1a48c4360ed5e76952";
let getUserUrl = "https://api.github.com/user";
let xhr = new XMLHttpRequest();

xhr.open("GET",`${getUserUrl}`, true);
xhr.setRequestHeader("Authorization", `token ${access_token}`);
xhr.send(null);

xhr.addEventListener("readystatechange", function(event) {
  if(xhr.readyState === 4) {
    debugger
    console.log(xhr.responseText);
  }
})

// fetch post API
{
  let code = "f22cd57c4d458ae996f3";
  let state = "abc123";
  let client_id = "Iv1.6e8c06ad13f8e69b";
  let client_secret = "2bb380c85d263520f28969770529f2c58c30ecc5";
  let redirect_uri = "http://localhost";
  let post_url = "https://github.com/login/oauth/access_token";
  
  let data = {
    client_id: client_id,
    client_secret: client_secret,
    code: code,
    redirect_uri: redirect_uri,
    state: state
  }

  fetch(post_url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  let accese_token = "5a1830eb39a0054dbe86a3b5064ec1b08870c462";
  let getUserUrl = "https://api.github.com/user";

  fetch(getUserUrl, {
    method: 'GET',
    headers: {
      "Authorization": "token " + accese_token
    }
  }).then(response => response.json())
    .then(data => {
    console.log('success: ', data);
  }).catch((error) => {
    console.error('Error:', error);
  })

}
