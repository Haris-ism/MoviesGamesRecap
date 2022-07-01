import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {UserContext} from "../context/UserContext"
import { useHistory } from "react-router-dom"
import { Table,Button,Input } from 'antd';
import { PlusCircleTwoTone,EditTwoTone,CloseCircleTwoTone } from '@ant-design/icons';
const GamesList = () => {
  const [user, setUser] = useContext(UserContext)
  const [games, setgames] =  useState(null)
  const [search, setSearch] = useState("")
  const [fetchTrigger, setFetchTrigger] = useState(true)
  let token = user ?  user.token : null

  useEffect(  () => {
    const fetchData = async ()=>{
      const result = await axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/games`)
        .catch(err=>err.message)
      setgames(
        result.data.map(el=>{
          const {
            id,
            genre,
            image_url,
            singlePlayer,
            multiplayer,
            name,
            platform,
            release} = el
          return {id,
            genre,
            image_url,
            singlePlayer,
            multiplayer,
            name,
            platform,
            release}
        })
      )
      setFetchTrigger(false)
    }
    if (fetchTrigger){
      fetchData()
    }
  }, [fetchTrigger])

  const Action = ({itemId}) =>{
    const handleDelete = () => {
      axios.delete(`https://614fdbbda706cd00179b7317.mockapi.io/games/${itemId}`,{headers: {"Authorization" : "Bearer "+ token}})
      .then(res => {
        setFetchTrigger(true)
      })
    }
    const handleEdit = () =>{
      history.push(`/game/edit/${itemId}`)
    }
    return(
      <>
        <Button onClick={handleEdit} type="text" icon={<EditTwoTone />}>Edit</Button>
        <br/>
        <Button onClick={handleDelete} type="text" icon={<CloseCircleTwoTone />}>Delete</Button>
      </>
    )
  }

  function truncateString(str, num) {
    if (str === undefined){
      return ""
    }else{
      if (str === null){
        return ""
      }else{
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    }
  }

  const submitSearch = (e) =>{
    axios.get(`https://614fdbbda706cd00179b7317.mockapi.io/games`)
    .then(res => {
      let resgames = res.data.map(el=>{ return {
        id: el.id,
        genre: el.genre,
        image_url: el.image_url,
        singlePlayer: el.singlePlayer,
        multiplayer: el.multiplayer,
        name: el.name,
        platform: el.platform,
        release: el.release,
        }
      })
      let filteredgames = resgames.filter(x=> x.name.toLowerCase().indexOf(e.toLowerCase()) !== -1)
      setgames([...filteredgames])
    })
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  let history = useHistory();
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      render: (x,item,index)=>{
        return(
          <div>
              {index+1}
          </div>
        )
      }
    },
    {
      title: 'Image',
      dataIndex: 'image_url',
      render: (text, record) => {
         return (
          <div>
          <img width ="100px"src={record.image_url}/>
          </div>
        )}
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.genre.localeCompare(b.genre),
    },
    {
      title: 'Gametype',
      dataIndex: 'gametype',
      render: (text, record) => {
         return (
          <div>
          {record.singlePlayer ? `Singleplayer` : ''}
          <br/>
          {record.multiplayer ? `Multiplayer` : ''}
          </div>
        )}

    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      filters: [
      {
        text: 'iOS',
        value: 'iOS',
      },
      {
        text: 'Android',
        value: 'Android',
      },
      {
        text: 'Nintendo Switch',
        value: 'Nintendo Switch',
      },
      {
        text: 'PlaySation',
        value: 'PlayStation',
      },
      {
        text: 'Xbox',
        value: 'Xbox',
      },
      {
        text: 'Windows',
        value: 'Windows',
      }

    ],
    onFilter: (value, record) => record.platform.includes(value)
    },
    {
      title: 'Release',
      dataIndex: 'release',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.release - b.release,

    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
         return (
          <div>
          <Action itemId={record.id} />
          </div>
        )
      }
    },
  ];

  return(
    <>
    <div style={{ margin:"10px auto 10px auto",width:"50vw","maxWidth":"600px","minWidth":"250px"}}>
      <Input.Group >
        <Input.Search allowClear value={search} onChange={handleChangeSearch} onSearch={submitSearch}/>
      </Input.Group>
    </div>

    <form style={{paddingRight:"100px", display:"flex", "justifyContent": "flex-end",float: "right"}}>
      <Button onClick={()=>{ history.push(`/game/create`)}} type="primary" shape="round" icon={<PlusCircleTwoTone />} >Create</Button>
    </form>
    <br/>
    <br/>
    <Table columns={columns} dataSource={games} pagination= {false}/>
    </>
  )
}

export default GamesList
