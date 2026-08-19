class ApiRetryUtil {
static async execute(
apiCall,
retries = 3
){
let error;
for(
let i=1;
i<=retries;
i++
){
try{
return await apiCall();
}catch(ex){
error = ex;
console.log(
`Retry ${i}`
);
}
}
throw error;
}
}
module.exports = ApiRetryUtil;