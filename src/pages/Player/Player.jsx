import './Player.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function Player() {

  const {id} = useParams()
  const navigate = useNavigate()

  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof: ""

  })
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MmY5MDdjYzI3YjRjMzRhMWQ5ZWZmOGFmMjAzNjdkZCIsIm5iZiI6MTc0MjM2ODUzNS45Njg5OTk5LCJzdWIiOiI2N2RhNmYxN2IwNWM4YTM4MGZhMWVlMTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._FW_BbTHRfP-qD0eFzLPRMjcLMtDhSpXXPr9Dym1_jw'
    }
  };

  useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0])) //we need data from first object
    .catch(err => console.error(err));
  },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-2)}} />
      <iframe width= '90%' height='90%'
       src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer' frameBorder='0' allowFullScreen >
      </iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p> 
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
