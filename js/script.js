document.addEventListener("DOMContentLoaded",()=>{

const g=id=>document.getElementById(id)
const v=id=>g(id)?.value?.trim()||""

let users=JSON.parse(localStorage.getItem("users"))||[]

const save=()=>localStorage.setItem("users",JSON.stringify(users))

window.register=()=>{

let user={
n:v("nume"),
p:v("prenume"),
e:v("email"),
t:v("tel"),
pw:v("parola")
}

let cp=v("confirm")

if(!user.n||!user.p||!user.e||!user.t||!user.pw||!cp)
return alert("Completeaza toate campurile")

if(!user.e.includes("@"))
return alert("Email invalid")

if(!/^\d+$/.test(user.t))
return alert("Numar telefon doar cifre")

if(user.pw.length<8)
return alert("Parola minim 8 caractere")

if(user.pw!==cp)
return alert("Parolele nu coincid")

if(users.some(u=>u.e===user.e))
return alert("Email deja existent")

users.push(user)
save()

location="login.html"
}

window.login=()=>{

let e=v("email")
let pw=v("parola")

let ok=users.find(u=>u.e===e && u.pw===pw)

if(ok){
localStorage.setItem("currentUser",JSON.stringify(ok))
location="home.html"
}else{
alert("Date incorecte")
}
}

window.resetPass=()=>{

let e=v("email")
let p1=v("newPass")
let p2=v("confirmPass")

if(!e||!p1||!p2)
return alert("Completeaza toate campurile")

if(p1.length<8)
return alert("Parola prea scurta")

if(p1!==p2)
return alert("Parolele nu coincid")

let found=false

users=users.map(u=>{
if(u.e===e){
u.pw=p1
found=true
}
return u
})

if(!found)
return alert("Email inexistent")

save()

alert("Parola a fost schimbata")
location="login.html"
}

let products=g("products")

if(products){

fetch("../json/products.json")
.then(r=>{
if(!r.ok) throw new Error("JSON nu exista")
return r.json()
})
.then(data=>{

products.innerHTML=""

Object.keys(data).forEach(cat=>{

let card=document.createElement("div")
card.className="card"

card.innerHTML=`
<img src="../assets/background.jpg">
<h3>${cat}</h3>
<p>${data[cat].join("<br>")}</p>
`

products.appendChild(card)

})

})
.catch(err=>{
products.innerHTML="Eroare la incarcare meniu"
console.log(err)
})

}

window.delivery=()=>{

let d=g("delivery")
let a=g("addr")

if(!d||!a)return

a.style.display=d.value==="Livrare"?"block":"none"
}

window.send=()=>{

document.querySelector(".container").innerHTML=
"<h2>Comanda trimisa ☕</h2><p>Multumim!</p>"

}

})