import baseUrl from "./Baseurl";
import commonApi from "./commomApi";


export const userRegister=async(data)=>{
    return await commonApi(`${baseUrl}/reg`,"POST","",data)
}

export const loginApi=async(data)=>{
    return await commonApi(`${baseUrl}/log`,"POST","",data)
}

export const addStudentApi=async(data,header)=>{
    return await commonApi(`${baseUrl}/addstudent`,"POST",header,data)

}

export const getStudentApi=async(header,search)=>{
    return await commonApi(`${baseUrl}/getstudents?search=${search}`,"GET",header,"")
}

export const dltStudentApi= async(id,header)=>{
    return await commonApi(`${baseUrl}/dltstudent/${id}`,"DELETE",header,{})
}

export const editStudentApi = async(id,header,data) =>{
    return await commonApi(`${baseUrl}/editstudent/${id}`,"PUT",header,data)
} 