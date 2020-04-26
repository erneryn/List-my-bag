import axios from 'axios'

export const FetchProject = (allProject) => ({
    type: 'ALL_PROJECT',
    payload: {
        allProject
    }
})

export const AddProject = (newProject)=> ({
    type: 'ADD_PROJECT',
    payload: {
        newProject,
    }
})

export const DeleteProjecct = (willDeleted)=> ({
    type: 'DELETE_PROJECT',
    payload:{
        willDeleted
    }
}) 



export const fecthApi = () => {
    return (dispatch) =>{
        axios.get('http://192.168.1.17:3000/trip')
        
        .then(({data})=>{
            console.log(data)
            dispatch(FetchProject(data))
        })
        .catch(err=>{
            console.log(err)
        })
    }
}