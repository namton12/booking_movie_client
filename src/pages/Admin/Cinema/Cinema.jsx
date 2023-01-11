import { Button, Input, Modal, Select } from 'antd';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import swal from 'sweetalert';
import "../Users/ListUser/ListUser.css"
const { Option } = Select;
const ListCinema = (props) => {
    const [idCinema, setIdCinema]= useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const [data, setData]= useState([])
    useEffect(()=> {
      (async()=> {
        const res= await axios({
            url: "http://localhost:8080/cinema/",
            method: "get",
        })
        const result= await res.data
        return setData(result)
      })()
    }, [])
    // eslint-disable-next-line
    const columns = [
        {
          title: 'Tên rạp',
        },
        {
          title: 'Địa chỉ',
        },
        {
          title: 'Hình ảnh',
        },
        {
          title: 'Cụm rạp',
         
        }
      ];
  const deleteCinema= async (id)=> {
    const res= await axios({
      url: "http://localhost:8080/cinema/delete/"+ id,
      method: "delete"
    })
    const result= await res.data
    setData(data?.filter(item=> parseInt(item.id) !== parseInt(id)))
    swal("Congratulations", "You have successfully deleted a cinema", "success")
    .then(()=> window.location.reload())
    return console.log(result)
  }
  return (
    <>
      <div style={{display: "flex", justifyContent:" center", alignItems: "center"}}>
        {/* <Input placeholder={"Tìm kiếm người dùng"} />
        <div style={{width: 32, height: 32, display: "flex", justifyContent: "center", alignItems: "center", background: "#fff", cursor: "pointer"}}>
            <AiOutlineSearch style={{width: 20, height: 20}} />
        </div> */}
      </div>
      <br />
      <table style={{width: '100%', background: "#fff"}}>
      <thead>
        <tr>
          <td>
Theater name</td>
          <td>
Address</td>
          <td>Picture</td>
          <td>Cluster of theaters</td>
          <td style={{textAlign: "center"}}>Action</td>
        </tr>
      </thead>
      <tbody className={"dkdjksjklasafdasd"}>
        {
          data?.map((item, key)=> <tr className={"fzjldjlksjakaas"} key={key}>
            <td className={"fgjflsjfkljskdale"}>{item.cinemaName}</td>
            <td className={"fgjflsjfkljskdale"}>{item.address}</td>
            <td className={"fgjflsjfkljskdale"}>{item.img}</td>
            <td className={"fgjflsjfkljskdale"}>{item.ClusterName}</td>
            <td className={"fgjflsjfkljskdale"}>
              <div style={{display: "flex", justifyContent:" center", alignItems: "center", gap: 20}}>
                <Button onClick={()=> {
                  showModal()
                  setIdCinema(item.id)
                }}>Edit</Button>
                <Button onClick={()=> {
                  deleteCinema(item.id);
                  swal("Congratulations", "You have successfully deleted this theater", "success")
                }}>Delete</Button>
              </div>
            </td>
          </tr>)
        }
        {
          data?.length <=0 && <tr>
            <td colSpan={5} style={{textAlign: "center", padding: 10}}>There are no records yet</td>
          </tr>
        }
      </tbody>
    </table>
    {
      isModalOpen=== true && 
      <InfoDetailUser idCinema={idCinema} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    } 
    </>
  )
}

const InfoDetailUser= (props)=> {
  const [data, setData]= useState()
  const [cluster, setCluster]= useState()
  const [newResult, setNewResult]= useState()

  useEffect(()=> {
    (async()=> {
      const res= await axios({
        url: "http://localhost:8080/cinema/detail/cinema/"+ props?.idCinema,
        method: "get",
      })
      const result= await res.data
      const {Cluster, ...newResult}= result
      setNewResult(newResult)
      return setData(result)
    })()
  }, [props?.idCinema])
  useEffect(()=> {
    (async()=> {
      const res= await axios({
        url: "http://localhost:8080/cluster",
        method: "get"
      })
      const result= await res.data
      return setCluster(result)
    })()
  }, [])
  const updateCinema= async()=> {
    const res= await axios({
      url: "http://localhost:8080/cinema/update/"+  props?.idCinema,
      method: "patch",
      data: {
        ...newResult
      }
    })
    const result= await res.data
    swal("Congratulations", "You have successfully updateed a cinema", "success")
    .then(()=> window.location.reload())
    return console.log(result)
  }
  return (
    <Modal title="
    Edit cinama information" open={props?.isModalOpen} onOk={()=> {
      props?.handleOk()
      updateCinema()
    }} onCancel={props?.handleCancel}>
      <div className={"label-item"} style={{marginBottom: 8}}>Theater name</div>
      <Input value={newResult?.cinemaName} onChange={(e)=> setNewResult(prev=> ({...prev, cinemaName: e.target.value}))} />
      <div className={"label-item"} style={{marginBottom: 8}}>
Address</div>
      <Input value={newResult?.address} onChange={(e)=> setNewResult(prev=> ({...prev, address: e.target.value}))} />
      <div className={"label-item"} style={{marginBottom: 8}}>Picture</div>
      <Input value={newResult?.img} onChange={(e)=> setNewResult(prev=> ({...prev, img: e.target.value}))} />
      <div className={"label-item"} style={{marginBottom: 8}}>Cluster of theaters</div>
      <Select style={{width: "100%"}} value={data?.Cluster?.ClusterName} onChange={(e)=> setNewResult(prev=> ({...prev, cluserId: e}))}>
        {
          cluster?.map((item, key)=> <Option key={key} value={item.id}>{item.ClusterName}</Option>)
        }
      </Select>     
    </Modal>
  )
}

export default ListCinema
