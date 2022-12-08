import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { useHistory } from "react-router-dom"
import { Table, Button, Input } from 'antd';
import { PlusCircleTwoTone, EditTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { getDataMovies, deleteDataMovie } from '../services'
const MovieList = () => {
  const token = localStorage.getItem('token')
  const context = useContext(UserContext)
  const user = context.user
  const setLoader = context.setLoader
  const [movies, setmovies] = useState(null)
  const [search, setSearch] = useState("")
  const [fetchTrigger, setFetchTrigger] = useState(true)
  const fetchData = async () => {
    setLoader(true)
    try {
      const result = await getDataMovies("title genre _id description duration image_url rating review year")
      setmovies(
        result.data.data.fetchMovies.map(el => {
          return {
            _id: el._id,
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
        await deleteDataMovie(itemId, token)
        alert("Delete Success")
        setFetchTrigger(prev => !prev)
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
  const submitSearch = async (e) => {
    setLoader(true)
    try {
      const result = await getDataMovies("_id description duration genre image_url rating review title year")
      let resmovies = result.data.data.fetchMovies.map(el => {
        return {
          _id: el._id,
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
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoader(false)
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
            <Action itemId={record._id} />
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
        <Button onClick={() => { history.push(`/movie/create`) }} type="primary" shape="round" icon={<PlusCircleTwoTone />} >Create</Button>
      </form>
      <br />
      <br />
      <Table columns={columns} dataSource={movies} pagination={false} />
    </>
  )
}

export default MovieList
