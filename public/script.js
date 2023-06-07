window.addEventListener('load',()=>{

// Starting to retrive

    fetch('http://localhost:8092/api/retriving',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'User-Agent':'PostmanRuntime/7.30.0'  
        },
        //body:JSON.stringify(data)
    })
    
    .then(res=>res.json())
    .then(data=>{
        const list=document.querySelector('.tasks');
        data.results.forEach(result => {
            const cont = document.createElement('div');
            cont.classList.add('content', 'mt-10');
            
            const inn = document.createElement('input');
            inn.classList.add('input', 'ml-44', 'bg-inherit', 'rounded', 'p-5', 'border-2', 'border-zinc-300', 'w-full', 'lg:w-96');
            inn.type = 'text';
            inn.value = result.val;
            inn.setAttribute('readonly', 'readonly');
            
            const time = document.createElement('p');
            time.classList.add('date', 'mt-5', 'ml-44');
            time.innerHTML = result.time;
            
            cont.appendChild(inn);
            cont.appendChild(time);
            
            const acti = document.createElement('div');
            acti.classList.add('action', 'mt-10');
            
            const edit = document.createElement('button');
            edit.classList.add('btn1', 'p-3', 'rounded', 'border-2', 'mr-3');
            edit.innerHTML = 'Edit';
            
            const delet = document.createElement('button');
            delet.classList.add('btn2', 'p-3', 'rounded', 'border-2');
            delet.innerHTML = 'Delete';
            
            acti.appendChild(edit);
            acti.appendChild(delet);
            
            list.appendChild(cont);
            list.appendChild(acti);


            edit.addEventListener('click',()=>{
                if(edit.innerHTML.toLowerCase()=='edit'){
                    edit.innerHTML="Save";
                    inn.removeAttribute('readonly');
                    inn.focus();
                }
                else{
                    edit.innerHTML="Edit";
                    inn.setAttribute('readonly','readonly');
                }
            })
           /*     list.removeChild(cont);
                list.removeChild(acti);
            })*/


            delet.addEventListener('click', () => {
                const requestData = {
                    val: result.val,
                    time: result.time
                };

                fetch('http://localhost:8092/api/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'PostmanRuntime/7.30.0'
                    },
                    body: JSON.stringify(requestData)
                })
                .then(res => {
                    if (res.ok) {
                        // Data deleted successfully
                        list.removeChild(cont);
                        list.removeChild(acti);
                    } else {
                        // Handle error response
                        console.log('Error deleting data');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            });
        });
    }); /// untill this part is retriving - ended



    //starting to create the todo data dynamically



    const form=document.querySelector('#form');
    //const t=document.querySelector('#action');
    const input=document.querySelector('#task-input');
    const list=document.querySelector('.tasks');

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(input.value==""){
            document.getElementById("error").innerHTML="*enter some task to feed";
            setTimeout(() => {
                document.getElementById("error").innerHTML="";
            }, 3000);
            return;
        }


        //fucntion for getting data and time



        function getCurrentDateTime() {
            var currentDateTime = new Date();
            var dateTimeString = currentDateTime.toLocaleString();
            return dateTimeString;
        }

        const val=input.value;

        const cont=document.createElement('div')
        cont.classList.add('content','mt-10');
        const inn=document.createElement('input');
        inn.classList.add('input','ml-44','bg-inherit','rounded','p-5','border-2','border-zinc-300','w-full','lg:w-96')
        inn.type='text';
        inn.value=val;
        inn.setAttribute('readonly','readonly');

        const time=document.createElement('p');
        time.classList.add('date','mt-5','ml-44');
        time.innerHTML=getCurrentDateTime();
        
        cont.appendChild(inn);
        cont.appendChild(time);

        const acti=document.createElement('div');
        acti.classList.add('action','mt-10');

        const edit=document.createElement('button');
        edit.classList.add('btn1','p-3','rounded','border-2','mr-3');
        edit.innerHTML="Edit";

        const delet=document.createElement('button');
        delet.classList.add('btn2','p-3','rounded','border-2');
        delet.innerHTML="delete";


        acti.appendChild(edit);
        acti.appendChild(delet);

        list.appendChild(cont);
        list.appendChild(acti);



        ///starting to feed



        var formData=new FormData(form);
        var dat=Object.fromEntries(formData);
        dat.time=getCurrentDateTime();
        console.log(dat);
        console.log(formData);
        fetch('http://localhost:8092/api/feeding',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'User-Agent':'PostmanRuntime/7.30.0' 
            },
            body:JSON.stringify(dat)
        })
        .then(res=>res.json())
        .catch(err=>{
            console.log(err);
        })//completed feeding
        input.value = ''; //once the add task button is pressed the value in the input box is disappears



        // this is for buttons edit and delete



        edit.addEventListener('click',()=>{
            if(edit.innerHTML.toLowerCase()=='edit'){
                edit.innerHTML="Save";
                inn.removeAttribute('readonly');
                inn.focus();
            }
            else{
                edit.innerHTML="Edit";
                inn.setAttribute('readonly','readonly');
            }
        })
        delet.addEventListener('click',()=>{
            list.removeChild(cont);
            list.removeChild(acti);
        })
    })
})