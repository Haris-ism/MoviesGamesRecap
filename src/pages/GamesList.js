import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useHistory } from "react-router-dom"
import { Table, Button, Input } from 'antd';
import { PlusCircleTwoTone, EditTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { getDataGames, deleteDataGame } from '../services'
const GamesList = () => {
  const token = localStorage.getItem('token')
  const context = useContext(UserContext)
  const user = context.user
  let history = useHistory();
  const setLoader = context.setLoader
  const [games, setgames] = useState(null)
  const [search, setSearch] = useState("")
  const [fetchTrigger, setFetchTrigger] = useState(true)
  const fetchData = async () => {
    setLoader(true)
    try {
      const result = await getDataGames("_id name genre image_url singlePlayer multiPlayer platform release")
      setgames(
        result.data.data.fetchGames.map(el => {
          return {
            id: el._id,
            genre: el.genre,
            image_url: el.image_url,
            singlePlayer: el.singlePlayer,
            multiPlayer: el.multiPlayer,
            name: el.name,
            platform: el.platform,
            release: el.release,
          }
        })
      )
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
  }
  useEffect(() => {
    fetchData()
  }, [fetchTrigger])

  const Action = ({ itemId }) => {
    const handleDelete = async () => {
      setLoader(true)
      try {
        await deleteDataGame(itemId, token)
        setFetchTrigger((prev) => !prev)
      }
      catch (err) {
        if (err.response?.data?.errors[0]?.message !== 'Please Login') {
          alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
        } else {
          alert("Session Expired, Please Login.")
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          history.push(`/login`)
        }
      }
      setLoader(false)
    }
    const handleEdit = () => {
      history.push(`/game/edit/${itemId}`)
    }
    return (
      <>
        <Button onClick={handleEdit} type="text" icon={<EditTwoTone />}>Edit</Button>
        <br />
        <Button onClick={handleDelete} type="text" icon={<CloseCircleTwoTone />}>Delete</Button>
      </>
    )
  }

  const submitSearch = async (e) => {
    setLoader(true)
    try {
      const result = await getDataGames("_id name genre image_url singlePlayer multiPlayer platform release")
      let resgames = result.data.data.fetchGames.map(el => {
        return {
          _id: el._id,
          genre: el.genre,
          image_url: el.image_url,
          singlePlayer: el.singlePlayer,
          multiPlayer: el.multiPlayer,
          name: el.name,
          platform: el.platform,
          release: el.release,
        }
      })
      let filteredgames = resgames.filter(x => x.name.toLowerCase().indexOf(e.toLowerCase()) !== -1)
      setgames([...filteredgames])
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      render: (x, item, index) => {
        return (
          <div>
            {index + 1}
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
            <img width="100px" src={record.image_url} />
          </div>
        )
      }
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
            <br />
            {record.multiPlayer ? `multiPlayer` : ''}
          </div>
        )
      }
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

  return (
    <>
      {!user ? history.push(`/login`) : null}
      <div style={{ margin: "10px auto 10px auto", width: "50vw", "maxWidth": "600px", "minWidth": "250px" }}>
        <Input.Group >
          <Input.Search allowClear value={search} onChange={handleChangeSearch} onSearch={submitSearch} />
        </Input.Group>
      </div>

      <form style={{ paddingRight: "100px", display: "flex", "justifyContent": "flex-end", float: "right" }}>
        <Button onClick={() => { history.push(`/game/create`) }} type="primary" shape="round" icon={<PlusCircleTwoTone />} >Create</Button>
      </form>
      <br />
      <br />
      <Table columns={columns} dataSource={games} pagination={false} />
    </>
  )
}

export default GamesList
