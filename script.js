 const form=document.querySelector("form")
 form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const input=document.querySelector("#text").value
    console.log(input)
    await fetch("/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({taskValue:input,state:false})
    })

    alert("task added")
 })
const showdata=()=>{
    
}