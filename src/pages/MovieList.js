import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useHistory } from "react-router-dom"
import { Table, Button, Input } from 'antd';
import { PlusCircleTwoTone, EditTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { getDataMovies, deleteDataMovie } from '../services'
const MovieList = () => {
  const [, , , setLoader] = useContext(UserContext)
  const [movies, setmovies] = useState(null)
  const [search, setSearch] = useState("")
  const [fetchTrigger, setFetchTrigger] = useState(true)
  const fetchData = async () => {
    setLoader(true)
    await getDataMovies()
      .then(result => {
        setmovies(
          result.data.map(el => {
            return {
              id: el.id,
              description: el.description,
              duration: el.duration,
              genre: el.genre,
              image_url: el.image_url,
              rating: el.rating,
              review: el.review,
              title: el.title,
              year: el.year
            }
          })
        )
        setFetchTrigger(false)
      })
      .catch(err => console.log(err.message))
    setLoader(false)
  }
  useEffect(() => {
    fetchData()
  }, [fetchTrigger])

  const Action = ({ itemId }) => {
    const handleDelete = () => {
      deleteDataMovie(itemId)
        .then(() => {
          alert("Delete Success")
          setFetchTrigger(true)
        })
        .catch(err => console.log(err.message))
    }
    const handleEdit = () => {
      history.push(`/movie/edit/${itemId}`)
    }
    return (
      <>
        <Button onClick={handleEdit} type="text" icon={<EditTwoTone />}>Edit</Button>
        <br />
        <Button onClick={handleDelete} type="text" icon={<CloseCircleTwoTone />}>Delete</Button>
      </>
    )
  }
  const submitSearch = (e) => {
    getDataMovies()
      .then(res => {
        let resmovies = res.data.map(el => {
          return {
            id: el.id,
            description: el.description,
            duration: el.duration,
            genre: el.genre,
            image_url: el.image_url,
            rating: el.rating,
            review: el.review,
            title: el.title,
            year: el.year
          }
        })
        let filteredmovies = resmovies.filter(x => x.title.toLowerCase().indexOf(e.toLowerCase()) !== -1)
        setmovies([...filteredmovies])
      })
      .catch(err => console.log(err.message))

  }
  let history = useHistory();
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
      },
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
      title: 'Title',
      dataIndex: 'title',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.genre.localeCompare(b.genre),
      filters: [
        {
          text: 'Action',
          value: 'Action',
        },
        {
          text: 'Adventure',
          value: 'Adventure',
        },
        {
          text: 'Romance',
          value: 'Roman',
        },
        {
          text: 'Drama',
          value: 'Drama',
        },
        {
          text: 'Fantasy',
          value: 'Fantas',
        },
        {
          text: 'Comedy',
          value: 'omedy',
        }
      ],
      onFilter: (value, record) => record.genre.includes(value)
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.year - b.year,

    },
    {
      title: 'Review',
      dataIndex: 'review',
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.duration - b.duration
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
      <div style={{ margin: "10px auto 10px auto", width: "50vw", "maxWidth": "600px", "minWidth": "250px" }}>
        <Input.Group >
          <Input.Search allowClear value={search} onChange={handleChangeSearch} onSearch={submitSearch} />
        </Input.Group>
      </div>
      <form style={{ paddingRight: "100px", display: "flex", "justifyContent": "flex-end", float: "right" }}>
        <Button onClick={() => { history.push(`/movie/create`) }} type="primary" shape="round" icon={<PlusCircleTwoTone />} >Create</Button>
      </form>
      <br />
      <br />
      <Table columns={columns} dataSource={movies} pagination={false} />
    </>
  )
}

export default MovieList
