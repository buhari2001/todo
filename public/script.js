window.addEventListener('load',()=>{
    const form=document.querySelector('#form');
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
        //for time
        function getCurrentDateTime() {
            var currentDateTime = new Date();
            var dateTimeString = currentDateTime.toLocaleString();
            return dateTimeString;
        }


        //
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
        input.value = '';
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