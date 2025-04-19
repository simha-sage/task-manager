 const form=document.querySelector("form")
 const list=document.querySelector("#list")
 
const show=document.querySelector("#show")

 form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const input=document.querySelector("#text")
    const data=input.value
    await fetch("/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({taskValue:data,state:false})
    })
    input.value=""
    showdata()
 })

const showdata=async ()=>{
    list.innerHTML=""
    const data=await fetch("/show")
    const tasks=await data.json()
    console.log(tasks)
    tasks.forEach(task => {
        const li=document.createElement("li")
        const box=document.createElement("button")
        const checkBox=document.createElement("input")
        checkBox.type="checkbox"
        box.textContent="❌"
        box.style.marginLeft="30px"
        box.onclick=async()=>{
            await fetch(`/delete/${task._id}`,{
                method:"DELETE"
            })
            showdata()
        }
        li.textContent=`${task.taskValue}-${task.state ? "✔" : "✘"}`
        if(task.state){
            li.style.textDecoration = "line-through";
            checkBox.checked=true
        }
        checkBox.onclick=async()=>{
            await fetch(`/update`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({ id: task._id, state: !task.state })

            })
            showdata()
        }
        li.append(checkBox)
        list.appendChild(li).appendChild(box)
    });
}
show.addEventListener("click",showdata)
