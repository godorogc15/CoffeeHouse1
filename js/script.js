document.addEventListener("DOMContentLoaded",()=>{

const g=id=>document.getElementById(id)
const v=id=>g(id)?.value?.trim()||""

let users=JSON.parse(localStorage.getItem("users"))||[]
const save=()=>localStorage.setItem("users",JSON.stringify(users))

let cart=[]

const protectPages=()=>{

const user=JSON.parse(localStorage.getItem("currentUser"))
const page=location.pathname.split("/").pop()

const allowed=[
"login.html",
"signup.html",
"password.html"
]

if(!user && !allowed.includes(page)){
location="login.html"
}
}

protectPages()

const updateAuthUI=()=>{

const user=JSON.parse(localStorage.getItem("currentUser"))

const login=g("loginLink")
const signup=g("signupLink")
const logout=g("logoutBtn")

if(user){
if(login) login.style.display="none"
if(signup) signup.style.display="none"
if(logout) logout.style.display="inline-block"
}else{
if(login) login.style.display="inline-block"
if(signup) signup.style.display="inline-block"
if(logout) logout.style.display="none"
}
}

window.logout=()=>{

localStorage.removeItem("currentUser")
updateAuthUI()
location="login.html"
}

updateAuthUI()

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

if(!/^(\+373|0)\d{8}$/.test(user.t))
return alert("Numar de telefon invalid")

if(user.pw.length<8)
return alert("Parola minim 8 caractere")

if(user.pw!==cp)
return alert("Parolele nu coincid")

if(users.some(u=>u.e===user.e))
return alert("Email deja existent")

users.push(user)
save()

localStorage.setItem("currentUser",JSON.stringify(user))
updateAuthUI()

location="index.html"
}

window.login=()=>{

let e=v("email")
let pw=v("parola")

let ok=users.find(u=>u.e===e && u.pw===pw)

if(ok){
localStorage.setItem("currentUser",JSON.stringify(ok))
updateAuthUI()
location="index.html"
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
.then(r=>r.json())
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

}

window.delivery=()=>{

let d=g("delivery")
let a=g("addr")

if(!d||!a)return

a.style.display=d.value==="Livrare"?"block":"none"
}

window.toggleCardSection=()=>{

const method=g("paymentMethod")?.value
const cardSection=g("cardSection")

if(!cardSection) return

cardSection.style.display=method==="card"?"block":"none"
}

window.validateCard=()=>{

const number=v("cardNumber")
const name=v("cardName")
const expiry=v("cardExpiry")
const cvv=v("cardCVV")
const error=g("error")

if(!error) return false

error.textContent=""

if(!number||!name||!expiry||!cvv){
error.textContent="Completează toate câmpurile cardului"
return false
}

if(!/^\d{16}$/.test(number)){
error.textContent="Număr card invalid"
return false
}

if(name.length<3){
error.textContent="Nume titular invalid"
return false
}

if(!/^\d{3}$/.test(cvv)){
error.textContent="CVV invalid"
return false
}

if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)){
error.textContent="Dată expirare invalidă"
return false
}

alert("Plata validată")
return true
}

window.send=()=>{

document.querySelector(".container").innerHTML=
"<h2>Comanda trimisă</h2><p>Mulțumim!</p>"
}

})