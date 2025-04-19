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
        li.style.display="flex"
        li.style.alignItems="center"
        li.style.marginBottom="10px"


        const box=document.createElement("button")
        box.textContent="❌"
        box.style.marginLeft="10px"
        box.style.cursor="pointer"
        box.onclick=async()=>{
            await fetch(`/delete/${task._id}`,{
                method:"DELETE"
            })
            showdata()
        }


        const checkBox=document.createElement("input")
        checkBox.type="checkbox"
        checkBox.style.marginLeft="10px"
        checkBox.checked=task.state
        checkBox.onclick=async()=>{
            await fetch(`/update`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({ id: task._id, state: !task.state })

            })
            showdata()
        }

        const text=document.createElement("span")
        text.textContent=task.taskValue
        if(task.state){
            li.style.textDecoration = "line-through";
        }
        
        
        li.append(checkBox)
        li.append(text)
        li.append(box)
        list.appendChild(li)
    });
}
show.addEventListener("click",showdata)
