var code,id,result,op,compilebtn;
            op=document.getElementById("op");
            compilebtn=document.getElementById("compilebtn");
            id=document.getElementById("dropdown").value;
            code=document.getElementById("code");
            if(id==7){
                code.innerHTML="#include<stdio.h>\n\nint main(){\nprintf(\"Hello World C\");\nreturn 0;\n}";
            }
            function language(){
                id=document.getElementById("dropdown").value;
                code=document.getElementById("code");
                if(id==8)
                code.innerHTML="import java.util.*;\n\nclass Main{\npublic static void main(String args[]){\nSystem.out.println(\"Hello World Java\");\n}\n}";
                else if(id==0){
                    code.innerHTML="print(\"Hello World Python\");"
                }
                else if(id==4){
                    code.innerHTML="console.log('Hello World Javascript');"
                }
                else if(id==77){
                    code.innerHTML="#include <iostream>\n\nint main(){\nstd::cout << \"Hello World C++\";\n}";
                }
            }
            
            function fetchUser(){
                compilebtn.disabled=true;
                code=document.getElementById("code").value;
                
                id=document.getElementById("dropdown").value;
                var request = new XMLHttpRequest();
                request.open("POST","https://codequotient.com/api/executeCode");
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                
                request.send(JSON.stringify({code :code, langId:id}));
                request.addEventListener("load", function (event){
                    result=JSON.parse(event.target.responseText);
                    
                    response(result.codeId);
                })
            }


            function response(codeId){
                setTimeout(function(){
                var request1= new XMLHttpRequest();
                request1.open("GET","https://codequotient.com/api/codeResult/"+codeId);
                request1.send();

                request1.addEventListener("load", function(event){
                    var result1=JSON.parse(JSON.parse(event.target.responseText).data);
                    console.log(result1);

                    compilebtn.disabled=false;
                    if(result1.output=="")
                    op.innerHTML="Error: "+result1.errors;
                    else
                    op.innerHTML=result1.output;
                    
                });
            },5000);
            }