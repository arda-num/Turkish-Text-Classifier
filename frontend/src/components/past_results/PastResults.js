import * as React from 'react';
import "./pastResults.css"
import { styled } from '@mui/material/styles';
import axios from 'axios';
import ListOfResults from "./List"

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  


export default function PastResults() {

    const [ResultList, setResultList] = React.useState(null);

    React.useEffect(() => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/past_results",
            // headers: { "Content-Type": "multipart/form-data" },
        }).then(function (response) {
    
            const data = response.data
            setResultList(data);
            console.log(data);
            
    
            }).catch(function (response) {
            alert("An error occured!");
            console.log(response);
            });
    }, []); // https://www.youtube.com/watch?v=jQc_bTFZ5_I&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=15&ab_channel=TheNetNinja


    function handleDelete (id) {
        console.log(id);
        const client = axios.create({
            baseURL: "http://127.0.0.1:8000/delete_result" 
        });

        
        client.delete(`?id=${id}`);
        setResultList(
            ResultList.filter((ResultList) => {
                return ResultList.id !== id;
             })
        )
        // axios({
        //   method: "delete",
        //   url: "http://127.0.0.1:8000/delete_result",
        //   params: {id: props.id},
        // //   headers: { "Content-Type": "applications/json" },
        // }).then(function (response) {
    
        //   console.log("deleted")
        
        //   }).catch(function (response) {
        //     alert("An error occured!")
        //     console.log(response);
        //   });
    
        
    };
    function handleDeleteAll () {
        const client = axios.create({
            baseURL: "http://127.0.0.1:8000/delete_all" 
        });
    
    
        client.delete();
        setResultList(
            []
        )
    };
    
    return (
        <div className='past-results-page'>

        {ResultList && <ListOfResults ResultList={ResultList} 
                                    handleDelete={handleDelete}
                                    handleDeleteAll={handleDeleteAll} />}
        </div>
    );
}