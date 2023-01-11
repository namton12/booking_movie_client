import axios from 'axios'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const InfoTicket = () => {
    const {idBook}= useParams()
    const [data, setData]= useState()
    const {userLogin} = useSelector(state=>state.UserManageReducer)
    useEffect(()=> {
      (async()=> {
          const res= await axios({
              url: "http://localhost:8080/book/ticket/detail",
              method: "get",
              params: {
                id_book: idBook
              }
          })
          const result= await res.data
          return setData(result)
      })()
    }, [idBook])
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  return (
    <div
      className={"dfjskldjsklfjkldssa"}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 10,
      }}
    >
        <div
        className={"fjlkdjklgjkfldssdasas"}
        style={{
          width: "calc(100% / 3 * 2)",
          padding: 10,
          background: "#fff",
          borderRadius: 5,
        }}
      >
        <div className={"zjfjsdksljdkasafsd"} style={{textAlign: "center", fontWeight: 600, fontSize: 20}}>
            Congrats, you booked ticket successfully
        </div>
        <br />
        <br />
        <div className="i-film" style={{width: '100%', display: "flex", justifyContent: "center", gap: 20}}>
          <img src={data?.img} style={{width: 200, aspectRatio: 2 / 3}} alt="" />
          <div>
            <div style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>{data?.movieName}</div>
            <div className={"film-c-desc"}>
              {data?.desc}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className={"zjfjsdksljdkasafsd"} style={{textAlign: "center", fontWeight: 600, fontSize: 16}}>
            {data?.cinemaName}
        </div>
        <br />
        <div className={"zjfjsdksljdkasafsd"} style={{textAlign: "center", fontWeight: 600, fontSize: 16}}>
            {data?.address}
        </div>
        <div style={{width: "100%", fontSize: 15, fontWeight: 600}}>
          <div>Ticket infomation is sent to email: </div>
          <div>Email: {userLogin?.email}</div>
          <div>Phone number: {userLogin?.phoneNumber}</div>
        </div>
      </div>
      <div
        className={"table"}
        style={{ width: "calc(100% / 3)" }}
      >
        <div
          className={"card-discription"}
          style={{
            width: "100%",
            padding: 10,
            background: "#fff",
            borderRadius: 5,
          }}
        >
            <div style={{fontSize: 16, fontWeight: 600, marginBottom: 12}}>Film: {data?.movieName}</div>
            <div style={{fontSize: 16, fontWeight: 600, marginBottom: 12}}>Cinema: {data?.cinemaName}</div>
            <div style={{fontSize: 16, marginBottom: 12}}>
                Set: <strong>{moment(data?.timeStart).format("HH:mm")}</strong> - {moment(data?.timeStart).format("dddd")}, <strong>{moment(data?.timeStart)?.format("DD/MM")}</strong>
            </div>
            <div style={{fontSize: 16, marginBottom: 12}}>
                Room: <strong>{data?.RoomName}</strong> - Seat: {data?.seat?.map((item, key)=> <strong key={key}>{item.seatIndex}{parseInt(key) === data?.seat.length - 1 ? "" : ","}</strong>)}
            </div>

        </div>
        <br />
        <div
          className={"card-discription"}
          style={{
            width: "100%",
            padding: 10,
            background: "#fff",
            borderRadius: 5,
          }}
        >
            <div style={{fontSize: 16, marginBottom: 12}}>Total grand</div>
            <div style={{fontSize: 16, marginBottom: 12, fontWeight: 600}}>
                {numberWithCommas(parseInt(parseInt(data?.price) * data?.seat?.length) + 5000)}đ (Included VAT)
            </div>
        </div>
      </div>    
    </div>
  )
}

export default memo(InfoTicket)
